from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, CategoryViewSet,UserViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'categories',CategoryViewSet, basename='category')
router.register(r'users',UserViewSet, basename='user')

urlpatterns = router.urls