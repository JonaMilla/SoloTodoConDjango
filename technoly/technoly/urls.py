"""technoly URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from producto import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', views.home, name='home'),
    path('agregar/', views.agregarProducto, name='agregarProducto'),  
    path('', include('autenticacion.urls')),
    path('producto/<int:id_producto>',views.producto, name='producto'), 
    path('agregarProductoCarro/<int:id_producto>/', views.agregarProductoCarro, name='agregarProductoCarro'),
    path('eliminarProductoCarro/<int:id_producto>/', views.eliminarProductoCarro, name='eliminarProductoCarro'),
    path('decrementarProductoCarro/<int:id_producto>/', views.decrementarProductoCarro, name='decrementarProductoCarro'),
    path('limpiarProductoCarro/', views.limpiarProductoCarro, name='limpiarProductoCarro'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
