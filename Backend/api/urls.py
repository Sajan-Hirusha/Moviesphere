from rest_framework.routers import DefaultRouter
from .views import (
    MovieViewSet, GenreViewSet, CategoryViewSet, UserViewSet, ContactViewSet, RegisterView
)
from django.urls import path, include
from . import views
from .views import RegisterView

# Initialize the router
router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'users', UserViewSet, basename='user')
router.register(r'contacts', ContactViewSet, basename='contact')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'moviegenres', MovieViewSet, basename='moviegenre')

# Add the register API path
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),  # Add your custom endpoint
   
]

# Combine router URLs with additional paths
urlpatterns += router.urls
