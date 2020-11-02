from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import PerfilUser

def agregarClaseFormControl(elementos):
    for campo in elementos:
            campo.field.widget.attrs['class'] = 'form-control'

class FormCreacionUsuario(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(FormCreacionUsuario, self).__init__(*args, **kwargs)
        agregarClaseFormControl(self.visible_fields())
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'password1',
            'password2'
        )


class FormCreacionPerfil(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(FormCreacionPerfil, self).__init__(*args, **kwargs)
        agregarClaseFormControl(self.visible_fields())

    class Meta:
        model = PerfilUser
        fields = ('genero',)

class FormIniciarSesion(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(FormIniciarSesion, self).__init__(*args, **kwargs)
        agregarClaseFormControl(self.visible_fields())