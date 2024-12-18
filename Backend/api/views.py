from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from api.models import Movie, Category,User
from api.serializers import MovieSerializer, CategorySerializer,UserSerializer
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
        data = request.data

        if 'password' in data:
            data['password'] = make_password(data['password'])

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"success": True, "message": "User created successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['delete'], url_path='delete-user/(?P<email>[^/]+)')
    def delete_by_email(self, request, email=None):
        """Delete a user by their email address."""
        if not email:
            return Response(
                {"success": False, "message": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            user.delete()
            return Response(
                {"success": True, "message": f"User with email '{email}' deleted successfully."},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": f"User with email '{email}' does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

    def partial_update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            data = request.data.copy()

            # Check if the password needs updating and hash it
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