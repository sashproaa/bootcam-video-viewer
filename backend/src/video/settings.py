"""
Django settings for video project.

Generated by 'django-admin startproject' using Django 3.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.


BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '5c!+nw__jh7!=^o6!%fz^gq=mh%(24of&@lbaqrt3swv5(^)ry'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'drf_yasg',
    'multiselectfield',
    'phonenumber_field',

    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'easyviewer',
    #'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    #'allauth.socialaccount.providers.google',

]

SITE_ID = 1



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'video.urls'

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
            ],
        },
    },
]

WSGI_APPLICATION = 'video.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        #'ENGINE': 'django.db.backends.postgresql_psycopg2',
        #'NAME': BASE_DIR / 'db.postgres',
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'uk'

TIME_ZONE = 'Europe/Kiev'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

LOGIN_URL = 'rest_framework:login'
LOGOUT_URL = 'rest_framework:logout'

AUTH_USER_MODEL = 'easyviewer.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',

    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 3
}

AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend',
    #'django.contrib.auth.backends.ModelBackend',
]

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True





# ACCOUNT_UNIQUE_EMAIL = True
# ACCOUNT_EMAIL_VERIFICATION = 'none'
# ACCOUNT_USER_MODEL_EMAIL_FIELD = 'email'


ACCOUNT_LOGOUT_ON_PASSWORD_CHANGE = True # після зміни пароля автоматично розлогиниться
# ето для активации через електронку
#ACCOUNT_CONFIRM_EMAIL_ON_GET = True
#LOGIN_URL = 'http://localhost:8000/users/login'

REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'easyviewer.serializers.CustomLoginSerializer',
    'USER_DETAILS_SERIALIZER': 'easyviewer.serializers.CustomRegisterSerializer',
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'easyviewer.serializers.CustomRegisterSerializer',
}

# DJOSER = {
#     'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
#     'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
#     'ACTIVATION_URL': '#/activate/{uid}/{token}',
#     'SEND_ACTIVATION_EMAIL': False,
#     'SERIALIZERS': {},
# }
# # Пошта видумана і тому SEND_ACTIVATION_EMAIL == False отже активація через пошту вимкнена
# EMAIL_USER_TLS = True
# EMAIL_HOST = 'smtp.ukr.net'
# EMAIL_USER_HOST = 'easyviewer@ukr.net'
# EMAIL_HOST_PASSWORD = '123456'
# EMAIL_PORT = 465

ACCOUNT_EMAIL_VERIFICATION = None

# Provider specific settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        'APP': {
            'client_id': '123',
            'secret': '456',
            'key': ''
        }
    },
    'facebook': {
        'METHOD': 'oauth2',
        'SDK_URL': '//connect.facebook.net/{locale}/sdk.js',
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'INIT_PARAMS': {'cookie': True},
        'FIELDS': [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'name',
            'name_format',
            'picture',
            'short_name'
        ],
        'EXCHANGE_TOKEN': True,
        'LOCALE_FUNC': 'path.to.callable',
        'VERIFIED_EMAIL': False,
        'VERSION': 'v7.0',
    }
}