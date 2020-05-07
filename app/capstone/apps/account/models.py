from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
# Create your models here.

# User model custom.
class User(AbstractUser):
    _id=models.CharField(max_length=200, primary_key=True)
    #email = models.EmailField(_('이메일 주소'), unique=True) #배포용
    email = models.EmailField(_('이메일 주소')) #테스트용
    username = models.CharField(_('닉네임'), max_length=50, unique=True)
    is_mail_authenticated = models.BooleanField(default=False, blank=True) # 메일 인증 수행 시 True로 변환됨. 기본값 False
    phone_num = models.CharField(_('전화 번호(선택)'), max_length=20, default="", blank=True) #선택사항
    password = models.CharField(_('비밀번호'), max_length=100)
    social_auth=models.CharField(max_length=20, default="None", blank=True)
    #password_val = models.CharField(_('비밀번호 확인'), max_length=15) #프론트엔드 쪽에서 처리

class File(models.Model):
    file=models.FileField(upload_to='testStorage')