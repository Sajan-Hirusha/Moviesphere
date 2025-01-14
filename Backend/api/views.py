from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from api.models import Movie,Genre,MovieGenre,Category,User,Contact
from api.serializers import MovieSerializer,GenreSerializer,CategorySerializer,UserSerializer,ContactSerializer
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
    
    @action(detail=False, methods=['get'], url_path='get_movies')
    def get_movies(self, request):

        movies = self.queryset 
        page = self.paginate_queryset(movies)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # If no pagination, return all movies
        serializer = self.get_serializer(movies, many=True)
        return Response(
            {"success": True, "data": serializer.data},
           status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'], url_path='get_popular')
    def get_most_popular_movies(self, request):
        movies = self.queryset.filter(category="Most Popular")
        
        page = self.paginate_queryset(movies)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        # If no pagination, return all filtered movies
        serializer = self.get_serializer(movies, many=True)
        return Response(
            {"success": True, "data": serializer.data},
            status=status.HTTP_200_OK
        )


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