"""
Django settings for Capstone project.
Generated by 'django-admin startproject' using Django 3.0.5.
For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
from datetime import timedelta

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f@q01oyamaq4lh+*y5448h_+ur_7v@dph8fhe055p252i4$_&s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework', # rest framework

    #소셜 로그인용
    'rest_framework.authtoken',
    'rest_auth',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',

    # react 연동
    'corsheaders',

    # SSL 지원
    'sslserver',

    # 내부 앱
    'capstone.apps.account.apps.AccountConfig',
    #'Account_static.apps.AccountStaticConfig', # 웹 페이지 테스트용
]

REST_KNOX = {
    'TOKEN_TTL' : timedelta(minutes=30), # 로그인 토큰의 유효시간 조정
    'AUTO_REFRESH' : True, # 토큰 만료시 자동으로 토큰 재발급
}

#JWT 토큰 테스트용
REST_USE_JWT=True
ACCOUNT_EMAIL_REQUIRED=False
ACCOUNT_EMAIL_VERIFICATION=None
ACCOUNT_LOGOUT_ON_GET=True
import datetime
JWT_AUTH = {
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_ALLOW_REFRESH': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(minutes=30),
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=28),
    #'JWT_AUTH_COOKIE' : 'Test', JWT 토큰을 쿠키 저장 방식으로 저장할 때 사용.
}

REST_FRAMEWORK={
    "DEFAULT_AUTHENTICATION_CLASSES": ('rest_framework_jwt.authentication.JSONWebTokenAuthentication',),
}



SITE_ID=1

'''REST_FRAMEWORK={
    "DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",),
                                       #"oauth2_provider.contrib.rest_framework.OAuth2Authentication",
                                       #"rest_framework_social_oauth2.authentication.SocialAuthentication",),
}'''



AUTH_USER_MODEL='capstone_account.User' # custom user model 설정

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # react 연동
    'django.middleware.common.CommonMiddleware', # react 연동
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_WHITELIST=[ #react 연동
    'http://localhost:3000',
]

ROOT_URLCONF = 'capstone.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                'django.template.context_processors.request', #django allauth에 필요함.
            ],
        },
    },
]

WSGI_APPLICATION = 'capstone.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

'''DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'exampledb',
    }
}'''

DATABASES = { # docker에서 사용할 때 mongoDB 컨테이너와 연결하기 위해 사용한다.
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'exampledb',
        'CLIENT' : {
            'host' : 'db',
            'port' : 27017,
        }
    }
}

'''DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}'''

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

# html 테스트용
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

#이메일 인증
f=open('googleAccount.txt', 'r')
account_info=f.read().split()
EMAIL_HOST = 'smtp.gmail.com' # 메일을 호스트하는 서버
EMAIL_PORT = '587' # gmail과 통신하는 포트
EMAIL_HOST_USER = account_info[0] # 발신할 이메일
EMAIL_HOST_PASSWORD = account_info[1] # 발신할 메일의 비밀번호
EMAIL_USE_TLS = True # TLS 보안 방법
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER # 사이트와 관련된 자동응답을 받을 이메일 주소


SOCIAL_AUTH_URL_NAMESPACE='social'
SOCIAL_AUTH_GOOGLE_PLUS_KEY = account_info[2] # 구글 OAuth2 클라이언트 ID
SOCIAL_AUTH_GOOGLE_PLUS_SECRET = account_info[3] # 구글 OAuth2 secret key

AUTHENTICATION_BACKENDS={
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
}

SOCIAL_AUTH_PIPELINE = (
    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    'social_core.pipeline.social_auth.social_details',
    #'google_app.views.social_details',

    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    'social_core.pipeline.social_auth.social_uid',
    #'google_app.views.social_uid',

    # Verifies that the current auth process is valid within the current
    # project, this is where emails and domains whitelists are applied (if defined).
    #'social_core.pipeline.social_auth.auth_allowed',
    'google_app.views.auth_allowed',

    # Checks if the current social-account is already associated in the site.
    #'social_core.pipeline.social_auth.social_user',
    'google_app.views.social_user',

    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    'social_core.pipeline.social_auth.associate_by_email',

    # Send a validation email to the user to verify its email address.
    # Disabled by default.
    # 'social_core.pipeline.mail.mail_validation',
    # Associates the current social details with another user account with
    # a similar email address. Disabled by default.
    # 'social_core.pipeline.social_auth.associate_by_email',
    # Create a user account if we haven't found one yet.
    'social_core.pipeline.user.create_user',

    # Create the record that associates the social account with the user.
    'social_core.pipeline.social_auth.associate_user',

    # Populate the extra_data field in the social record with the values
    'social_core.pipeline.social_auth.load_extra_data',

    # Update the user record with any changed info from the auth service.
    'social_core.pipeline.user.user_details',
)

LOGIN_REDIRECT_URL = '/'

#페이스북 로그인용
SOCIALACCOUNT_PROVIDERS = {
    'facebook': {
        'METHOD': 'oauth2',
        'SCOPE': ['email', 'public_profile', 'user_friends'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'INIT_PARAMS': {'cookie': True},
        'FIELDS': [
            'id',
            'email',
            'name',
            'verified',
        ],
        'EXCHANGE_TOKEN': True,
        'LOCALE_FUNC': 'path.to.callable',
        'VERIFIED_EMAIL': False,
        'VERSION': 'v2.9',
    }
}

#네이버 로그인용
NAVER_CLIENT_ID = account_info[4]
NAVER_SECRET_KEY = account_info[5]
