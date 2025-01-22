from rest_framework.routers import DefaultRouter
from .views import (
    MovieViewSet, GenreViewSet, UserViewSet, ContactViewSet, RegisterView
)
from django.urls import path, include
from . import views
from .views import RegisterView

# Initialize the router
router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'users', UserViewSet, basename='user')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'moviegenres', MovieViewSet, basename='moviegenre')

# Add the register API path
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),  # Add your custom endpoint
    path('login/', views.LoginView.as_view(), name='login'),
    path('', include(router.urls)),  # Include DRF routes under the root of /api/
    path('movies/<int:pk>/get-movie-by-id/', MovieViewSet.as_view({'get': 'get_movie_by_id'}), name='get-movie-by-id'),
]

# Combine router URLs with additional paths
urlpatterns += router.urls
