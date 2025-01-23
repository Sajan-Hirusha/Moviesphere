from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from api.models import Movie, Genre, MovieGenre, User, Contact
from api.serializers import MovieSerializer, GenreSerializer, UserSerializer, ContactSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from api.models import User
from api.serializers import UserSerializer
from rest_framework.exceptions import NotFound
from django.db.models import Prefetch

class RegisterView(APIView):
    def post(self, request):
        try:
            data = request.data
            user = User(
                fName=data['fName'],
                lName=data['lName'],
                email=data['email'],
                phone_number=data['phone_number'],
                password=make_password(data['password'])
            )
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate token for the user if authentication is successful
        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {"message": "Login successful", "token": token.key},
            status=status.HTTP_200_OK
        )


class MoviePagination(PageNumberPagination):
    page_size = 10


from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework import viewsets


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    pagination_class = MoviePagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        movie_instance = serializer.instance
        genre_ids = request.data.get("categoryId")
        if genre_ids:
            if isinstance(genre_ids, str):
                genre_ids = genre_ids.split(",")
            for genre_id in genre_ids:
                MovieGenre.objects.create(movie=movie_instance, genre_id=genre_id.strip())

        return Response(
            {
                "success": True,
                "message": "Movie Saved successfully!",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        genre_ids = request.data.get("categoryId")
        if genre_ids is not None:
            MovieGenre.objects.filter(movie=instance).delete()


            if isinstance(genre_ids, str):
                genre_ids = genre_ids.split(",")
            for genre_id in genre_ids:
                MovieGenre.objects.create(movie=instance, genre_id=genre_id.strip())

        return Response(
            {"success": True, "message": "Movie updated successfully!", "data": serializer.data},
            status=status.HTTP_200_OK
        )




    @action(detail=False, methods=['get'], url_path='get_movies')
    def get_movies(self, request):

        movies = self.queryset.prefetch_related(
            Prefetch('genres', queryset=MovieGenre.objects.select_related('genre'))
        )
        page = self.paginate_queryset(movies)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            serialized_data = self._add_genre_names(serializer.data, page)
            return self.get_paginated_response(serialized_data)


        serializer = self.get_serializer(movies, many=True)
        serialized_data = self._add_genre_names(serializer.data, movies)
        return Response(
            {"success": True, "data": serialized_data},
            status=status.HTTP_200_OK
        )

    def _add_genre_names(self, serialized_movies, movie_objects):

        movie_map = {movie.id: movie for movie in movie_objects}
        for movie_data in serialized_movies:
            movie_id = movie_data["id"]
            movie_instance = movie_map.get(movie_id)
            if movie_instance:
                genre_names = [mg.genre.name for mg in movie_instance.genres.all()]
                movie_data["genres"] = genre_names
        return serialized_movies


    @action(detail=False, methods=['get'], url_path='get_popular')
    def get_most_popular_movies(self, request):
        movies = self.queryset.filter(category="Most Popular")

        page = self.paginate_queryset(movies)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(movies, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK
        )


    @action(detail=False, methods=['get'], url_path='count')
    def get_movie_count(self, request):
        total_movies = Movie.objects.count()  # Get total count of movies
        return Response(
            {"success": True, "total_movies": total_movies},
            status=status.HTTP_200_OK
        )
    @action(detail=False, methods=['get'], url_path='search/(?P<identifier>.+)')
    def search_movie(self, request, identifier=None):
        if identifier.isdigit():
            queryset = self.queryset.filter(id=identifier)
        else:
            queryset = self.queryset.filter(title__iexact=identifier)

        if not queryset.exists():
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='count')
    def get_movie_count(self, request):
        total_movies = Movie.objects.count()  # Get total count of movies
        return Response(
            {"success": True, "total_movies": total_movies},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['get'], url_path='get-movie-by-id')
    def get_movie_by_id(self, request, pk=None):
        try:
            movie = self.get_object()  # Fetch the movie by pk
        except Movie.DoesNotExist:
            raise NotFound(detail="Movie not found.")

        serializer = self.get_serializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GenrePagination(PageNumberPagination):
    page_size = 10


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    pagination_class = GenrePagination

    @action(detail=False, methods=['get'], url_path='get_genres')
    def get_genres(self, request):

        genres = self.queryset
        page = self.paginate_queryset(genres)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # If no pagination, return all movies
        serializer = self.get_serializer(genres, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], url_path='(?P<genre_id>[^/.]+)/grouped-by-genre')
    def grouped_by_genre(self, request, genre_id):
        try:
            genre = Genre.objects.get(id=genre_id)
        except Genre.DoesNotExist:
            return Response({"success": False, "message": "Genre not found"}, status=404)

        # Filter movies by the selected genre
        movies = Movie.objects.filter(genres__genre=genre)

        # Pass the context with the request to the serializer
        serializer = MovieSerializer(movies, many=True, context={"request": request})

        return Response({"success": True, "data": serializer.data}, status=200)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "Genre created successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['delete'], url_path='delete-genres/(?P<name>[^/]+)')
    def delete_by_name(self, request, name=None):

        if not name:
            return Response(
                {"success": False, "message": "genres name is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            genres = Genre.objects.get(name=name)
            genres.delete()
            return Response(
                {"success": True, "message": f"genres '{name}' deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Genre.DoesNotExist:
            return Response(
                {"success": False, "message": f"genres '{name}' does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "User created successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    def partial_update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = request.data.copy()

            if 'password' in data:
                data['password'] = make_password(data['password'])

            serializer = self.get_serializer(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            return Response(
                {"success": True, "message": "User updated successfully!", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'], url_path='count')
    def get_user_count(self, request):
        total_users = User.objects.count()
        return Response(
            {"success": True, "total_users": total_users},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], url_path='search-by-email/(?P<email>.+)')
    def search_user_by_email(self, request, email=None):
        queryset = self.queryset.filter(email__iexact=email)

        if not queryset.exists():
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='search-by-name/(?P<name>.+)')
    def search_user_by_name(self, request, name=None):
        queryset = self.queryset.filter(fName__iexact=name) | self.queryset.filter(lName__iexact=name)

        if not queryset.exists():
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "Your contact inquiry has been submitted successfully!",
             "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'], url_path='count')
    def get_contact_count(self, request):
        total_contacts = Contact.objects.count()
        return Response(
            {"success": True, "total_contacts": total_contacts},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=['get'], url_path='search-by-email/(?P<email>.+)')
    def search_contact_by_email(self, request, email=None):
        queryset = self.queryset.filter(email__iexact=email)

        if not queryset.exists():
            return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='search-by-name/(?P<name>.+)')
    def search_contact_by_name(self, request, name=None):

        queryset = self.queryset.filter(first_name__iexact=name) | self.queryset.filter(last_name__iexact=name)

        if not queryset.exists():
            return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
