from django.db import models

class Comentario(models.Model):
    nombre_usuario = models.CharField(max_length= 45, blank=False)
    comentario = models.TextField(blank=False)
    fecha = models.DateTimeField(auto_now = True)

