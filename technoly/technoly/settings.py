from pathlib import Path
from os.path import join

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 't(6)pngcgl@gkc1=qzdsp84i02=r#c$3o@^jv2y9_$=w-c%3ax'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'producto.apps.ProductoConfig',
    'autenticacion',
    'rest_framework',
    'social_django',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'technoly.urls'

AUTHENTICATION_BACKENDS = [
    'social_core.backends.facebook.FacebookOAuth2',
    'social_core.backends.github.GithubOAuth2',
    'social_core.backends.instagram.InstagramOAuth2',
    'social_core.backends.spotify.SpotifyOAuth2',
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend'
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            join(BASE_DIR,'templates')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends', #obtener si inicio sesión desde una red social
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'technoly.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'solotodo',
        'USER': 'root',
        'PASSWORD': '1234',
        'HOST': 'localhost',
        'ROOT': 3306
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

LANGUAGE_CODE = 'es-cl'

TIME_ZONE = 'America/Santiago'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = join(BASE_DIR, 'static', 'static_root')
STATICFILES_DIRS = [join(BASE_DIR, 'static')]

#media files
MEDIA_URL = '/media/'
MEDIA_ROOT = join(BASE_DIR, 'media')

<<<<<<< HEAD
# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'jona.castro.millananco@gmail.com'
EMAIL_HOST_PASSWORD = '*****'
EMAIL_USE_TLS = True

#Variables para controlar el ingreso y la salida (rutas)
LOGIN_URL = 'login' #login
LOGIN_REDIRECT_URL = 'home'
LOGOUT_URL = 'salir'
LOGOUT_REDIRECT_URL = 'login'

#Configuración para conectarse a la api de facebook
SOCIAL_AUTH_FACEBOOK_KEY = '983626372048043'
SOCIAL_AUTH_FACEBOOK_SECRET = 'c45394647de094023566017244184845'
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email', 'user_link']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'fields': 'id, name, email, picture, link'
}
SOCIAL_AUTH_FACEBOOK_EXTRA_DATA = [
    ('name','name'),
    ('picture','picture')
]

SOCIAL_AUTH_GITHUB_KEY = '1d99d73155ad4f130a44'
SOCIAL_AUTH_GITHUB_SECRET = '30a8aa13c3de05adff99ec9f54fc088adf0e7077'

SOCIAL_AUTH_SPOTIFY_KEY = 'c57237cb02e94e6c8c52ddfa2adeffd9'
SOCIAL_AUTH_SPOTIFY_SECRET = 'ec0d7513a41041ca93f0319ae05ab171'
=======
STATIC_ROOT = join(BASE_DIR, 'static', 'static_root')

STATICFILES_DIRS = [join(BASE_DIR, 'static')]
>>>>>>> 745cf24f036f7d8c3c448b210f8100727d309997

