from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    name = models.CharField(max_length=100, null=False, blank= False, verbose_name="Nombre")
    description = models.TextField(null=True, blank=True, verbose_name="Descripción")
    precio = models.CharField(max_length=15, verbose_name="Precio")
    imagen = models.ImageField(verbose_name="Imagen", upload_to = "projects")
    created = models.DateTimeField(auto_now_add=True,verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True,verbose_name="Fecha de edición")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, default=None)

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['created']

    def __str__(self):
        return self.name


class ProductoOferta(models.Model):
    name = models.CharField(max_length=100, null=False, blank= False, verbose_name="Nombre")
    description = models.TextField(null=True, blank=True, verbose_name="Descripción")
    precio = models.CharField(max_length=15, verbose_name="Precio")
    imagen = models.ImageField(verbose_name="Imagen", upload_to = "projects")
    created = models.DateTimeField(auto_now_add=True,verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True,verbose_name="Fecha de edición")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, default=None)

    class Meta:
        verbose_name = 'Producto Oferta'
        verbose_name_plural = 'Productos Ofertas'
        ordering = ['created']

    def __str__(self):
        return self.name

