from django.db import models


class Movie(models.Model):
    image1 = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    image2 = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    image3 = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    title = models.CharField(max_length=150,null=False,blank=False)
    description = models.TextField()
    category = models.CharField(max_length=50,null=True,blank=True)

    def __str__(self):
        return self.name
