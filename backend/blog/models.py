from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['id']


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['id']


class Post(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()

    class Meta:
        ordering = ['id']
