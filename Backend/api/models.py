import os
import uuid
from django.db import models
from django.utils.deconstruct import deconstructible
from django.db import models
from django.contrib.auth.hashers import make_password, check_password


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

class User(models.Model):
    fName = models.CharField(max_length=150, null=False, blank=False)
    lName = models.CharField(max_length=150, null=False, blank=False)
    email = models.EmailField(max_length=150, unique=True, null=False, blank=False)
    phone_number = models.CharField(max_length=15, null=False, blank=False)
    password = models.CharField(max_length=128, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return f"{self.fName} {self.lName} ({self.email})"

