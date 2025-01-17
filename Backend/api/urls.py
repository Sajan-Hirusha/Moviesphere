from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, CategoryViewSet,UserViewSet,ContactViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'categories',CategoryViewSet, basename='category')
router.register(r'users',UserViewSet, basename='user')
router.register(r'contacts',ContactViewSet, basename='contact')
urlpatterns = [
    path('', include(router.urls)),  # Include DRF routes under the root of /api/
 path('movies/<int:pk>/get-movie-by-id/', MovieViewSet.as_view({'get': 'get_movie_by_id'}), name='get-movie-by-id'),
 
 ]