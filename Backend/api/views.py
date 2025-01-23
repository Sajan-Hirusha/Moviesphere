from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from api.models import Movie, Category,User,Contact
from api.serializers import MovieSerializer, CategorySerializer,UserSerializer,ContactSerializer
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password

class MoviePagination(PageNumberPagination):
    page_size = 10

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    pagination_class = MoviePagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "Movie Saved successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    def partial_update(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        return Response(
            {"success": True, "message": "Movie updated successfully!", "data": serializer.data},
            status=status.HTTP_200_OK
        )
<<<<<<< Updated upstream
    
    @action(detail=False, methods=['get'], url_path='get_movies')
    def get_movies(self, request):
=======



    @action(detail=False, methods=['get'], url_path='get_movies')
    def get_movies(self, request):
        movies = self.queryset.prefetch_related(
            Prefetch(
                'genres',
                queryset=MovieGenre.objects.select_related('genre')
            )
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
            else:
                movie_data["genres"] = []  # Ensure genres is always present
        return serialized_movies



    @action(detail=False, methods=['get'], url_path='get_popular')
    def get_most_popular_movies(self, request):
        movies = self.queryset.filter(category="Most Popular")
>>>>>>> Stashed changes

        movies = self.queryset 
        page = self.paginate_queryset(movies)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

<<<<<<< Updated upstream
        # If no pagination, return all movies
=======
>>>>>>> Stashed changes
        serializer = self.get_serializer(movies, many=True)
        return Response(
            {"success": True, "data": serializer.data},
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

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "Category created successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['delete'], url_path='delete-category/(?P<name>[^/]+)')
    def delete_by_name(self, request, name=None):

        if not name:
            return Response(
                {"success": False, "message": "Category name is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            category = Category.objects.get(name=name)
            category.delete()
            return Response(
                {"success": True, "message": f"Category '{name}' deleted successfully."},
                status=status.HTTP_200_OK
            )
        except Category.DoesNotExist:
            return Response(
                {"success": False, "message": f"Category '{name}' does not exist."},
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
            {"success": True, "message": "Your contact inquiry has been submitted successfully!", "data": serializer.data},
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