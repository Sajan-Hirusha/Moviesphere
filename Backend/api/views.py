from rest_framework import viewsets, status
from rest_framework.response import Response
from api.models import Movie
from api.serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # Custom response
        return Response(
            {"success": True, "message": "Movie created successfully!", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )
