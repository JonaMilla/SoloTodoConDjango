from django.urls import path

from .views import home, producto

urlpatterns = [
    path('', home, name='home'),
    path('producto/',producto, name='productoAOC')
]