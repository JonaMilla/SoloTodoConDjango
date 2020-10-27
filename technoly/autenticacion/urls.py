from django.urls import path
from .views import salir, login, registroUsuario

urlpatterns = [
    path('registro/', registroUsuario, name='registroUsuario'),
    path('login/', login, name='login'),
    path('salir/', salir, name='salir'),
]
