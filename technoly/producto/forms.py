from django import forms
from .models  import Project

class FormProject(forms.ModelForm):
    class Meta:
        model = Project
        fields = (
            'name',
            'description',
            'precio',
            'imagen',
        )
# class FormProductoCaracteristicas(forms.ModelForm):
#     class Meta:
#         model = ProductoCaracteristicas
#         fields = (
#             'tipo',
#             'tamanio',
#             'resolucion',
#             'Tiempo_respuesta',
#             'tasa_refresco',
#             'curvatura',
#             'soporta_fresync',
#             'soporta_gsync',
#         )
