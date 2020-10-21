from django.urls import path
from .views import vistaRegistro, salir, login

urlpatterns = [
    path('registro/', vistaRegistro.as_view(), name='registro'),
    path('login/', login, name='login'),
    path('salir/', salir, name='salir'),
]
