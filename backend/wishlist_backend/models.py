import uuid

from django.contrib.auth import get_user_model
from django.db import models


class VerificationToken(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    token = models.CharField(max_length=32)
    is_valid = models.BooleanField(default=True, blank=True, null=False)


class Wish(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    image = models.CharField(max_length=1024)
    name = models.CharField(max_length=1024)
    description = models.TextField(max_length=1024)


class UserKey(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    key = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
