from django.urls import path
from .views import salir, login, registroUsuario

urlpatterns = [
    path('registro/', registroUsuario, name='registro'),
    path('', login, name='login'),
    path('salir/', salir, name='salir'),
]
