import os
import uuid
from django.db import models
from django.utils.deconstruct import deconstructible

@deconstructible
class UniqueImageName:
    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        new_filename = f"{uuid.uuid4().hex}.{ext}"
        return os.path.join('uploads/images', new_filename)

class Movie(models.Model):
    image1 = models.ImageField(upload_to=UniqueImageName(), null=True, blank=True)
    image2 = models.ImageField(upload_to=UniqueImageName(), null=True, blank=True)
    image3 = models.ImageField(upload_to=UniqueImageName(), null=True, blank=True)
    title = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField()
    category = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False)

    def __str__(self):
        return self.name
