import os
import uuid
from django.db import models
from django.utils.deconstruct import deconstructible

# Custom function to generate unique filenames
@deconstructible
class UniqueImageName:
    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]  # Get file extension
        new_filename = f"{uuid.uuid4().hex}.{ext}"  # Generate unique filename using UUID
        return os.path.join('uploads/images', new_filename)  # Save it under 'uploads/images' folder

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
        # If needed, you can further customize the save method here
        super().save(*args, **kwargs)

class Category(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False)

    def __str__(self):
        return self.name
