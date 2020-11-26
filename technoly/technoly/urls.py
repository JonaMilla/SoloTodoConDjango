from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from producto import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pwa.urls')),
    path('home/', views.home, name='home'),
    path('agregar/', views.agregarProducto, name='agregarProducto'),  
    path('productoOferta/', views.productoOferta, name='productoOferta'),  
    path('', include('autenticacion.urls')),
    path('producto/<int:id_producto>',views.producto, name='producto'), 
    path('agregarProductoCarro/<int:id_producto>/', views.agregarProductoCarro, name='agregarProductoCarro'),
    path('eliminarProductoCarro/<int:id_producto>/', views.eliminarProductoCarro, name='eliminarProductoCarro'),
    path('decrementarProductoCarro/<int:id_producto>/', views.decrementarProductoCarro, name='decrementarProductoCarro'),
    path('limpiarProductoCarro/', views.limpiarProductoCarro, name='limpiarProductoCarro'),
    path('api/',include('comentario.urls'),name = 'api'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
