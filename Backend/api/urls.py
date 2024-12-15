from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'categories',CategoryViewSet, basename='category')

urlpatterns = router.urls