from django.contrib import admin
from api.models import Movie,Genre,MovieGenre

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(MovieGenre)