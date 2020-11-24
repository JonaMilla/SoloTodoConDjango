from django.urls import path
from .views import saludar,buscarEliminarActualizar,listarAgregarBorrarTodo

urlpatterns = [
    path('saludar/',saludar,name="saludar"),
    path('comentario/',listarAgregarBorrarTodo),
    path('comentario/<int:id>/',buscarEliminarActualizar)
]