from django.urls import path

from .views import principal, vistaAcer

urlpatterns = [
    path('principal/', principal),
    path('vistaAcer/', vistaAcer)
]