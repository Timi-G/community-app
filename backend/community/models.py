from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass

class Group(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_groups")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    content = models.TextField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="posts")
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.creator.username} in {self.group.name}"
