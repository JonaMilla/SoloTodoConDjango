from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=100, null=False, blank= False, verbose_name="Nombre")
    description = models.TextField(verbose_name="Descripción")
    precio = models.PositiveIntegerField(verbose_name="Precio")
    imagen = models.ImageField(verbose_name="Imagen", upload_to = "projects")
    created = models.DateTimeField(auto_now_add=True,verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True,verbose_name="Fecha de edición")

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['created']

    def __str__(self):
        return self.name
