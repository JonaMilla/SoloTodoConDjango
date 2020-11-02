from django.db import models
from django.contrib.auth.models import User

class Genero(models.Model):
    detalleNombre = models.CharField(max_length=45, blank=False)

    def __str__(self):
        return self.detalleNombre
class PerfilUser(models.Model):
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)