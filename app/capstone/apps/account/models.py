import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# User model custom.
class User(AbstractUser):
    _id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    #_id = models.AutoField(primary_key=True)
    nickname=models.CharField(max_length=15)

    email = models.EmailField(unique=True) #배포용

    #email = models.EmailField(_('이메일 주소')) #테스트용

    username = models.CharField(
        max_length=30,
        unique=True)

    is_mail_authenticated = models.BooleanField(
        default=False) # 메일 인증 수행 시 True로 변환됨. 기본값 False

    phone_num = models.CharField(
        max_length=20,
        default="",
        blank=True) #선택사항

    password = models.CharField(
        max_length=100)

    social_auth=models.CharField(
        max_length=20,
        default="None",
        blank=True)