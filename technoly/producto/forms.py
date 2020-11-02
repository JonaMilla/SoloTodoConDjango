from django import forms
from .models  import Project

def agregarClaseFormControl(elementos):
    for campo in elementos:
            campo.field.widget.attrs['class'] = 'form-control'
class FormProject(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(FormProject, self).__init__(*args, **kwargs)
        agregarClaseFormControl(self.visible_fields())
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
