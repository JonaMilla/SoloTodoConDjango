from django.urls import path, include
from .views import salir, login, registroUsuario

urlpatterns = [
    path('registro/', registroUsuario, name='registro'),
    path('', login, name='login'),
    path('salir/', salir, name='salir'),
    path('social/', include('social_django.urls', namespace='social')),# social:url}
    path('accounts/', include('allauth.urls')),
]
