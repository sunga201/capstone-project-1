from .base import *

DEBUG=True

CORS_ALLOW_CREDENTIALS = True

'''DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}'''

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'exampledb',
    }
}