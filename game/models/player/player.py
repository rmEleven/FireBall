from django.db import models
from django.contrib.auth.models import User


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # 删除User会删除对应的Player
    photo = models.URLField(max_length=512, blank=True)
    openid = models.CharField(default="", max_length=50, blank=True, null=True)

    def __str__(self):
        return str(self.user)