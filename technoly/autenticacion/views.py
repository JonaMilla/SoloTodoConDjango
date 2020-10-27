from django.shortcuts import render, redirect
# from django.views.generic import View
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth import login as auth_login, logout, authenticate
from .forms import FormCreacionUsuario, FormCreacionPerfil
from .models import Genero, PerfilUser
from django.contrib.auth.models import User 


def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            nombre_usuario = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            usuario = authenticate(username=nombre_usuario, password=password)
            if usuario is not None:
                auth_login(request, usuario)
                #messages.success(request, F"Bienvenido(a) nuevamente {nombre_usuario}")
                return redirect("home")
            else:
                messages.error(request, "Los datos son incorrectos")
        else:
            messages.error(request, "Los datos son incorrectos")

    form = AuthenticationForm() 
    return render(request, "login.html", {"form": form})

#class vistaRegistro(View):

    def get(self, request):
        form = UserCreationForm()
        return render(
            request,
            'registro.html',
            {
                'form':form
            }
        )

    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            usuario_registrado = form.save()
            nombre_usuario = form.cleaned_data.get("username")
            messages.success(request, F"Bienvenido(a) al Supermercado online 🧀🍋🍊🍬{nombre_usuario}")
            auth_login(request, usuario_registrado)
            return redirect("home")
        else:
            for msg in form.error_messages:
                messages.error(request, form.error_messages[msg])
            
            return render(
                request, 
                "registro.html", 
                {
                    "form": form
                })

def registroUsuario(request):
    formulario = FormCreacionUsuario()
    formulario2 = FormCreacionPerfil()
    if request.method == 'POST':
        formulario = FormCreacionUsuario(request.POST)
        formulario2 = FormCreacionPerfil(request.POST)
        if formulario.is_valid() and formulario2.is_valid():
            usuario = formulario.save()
            perfil = formulario2.save(commit=False)
            perfil.usuario = usuario
            perfil.save()
            messages.add_message(request,
                messages.INFO,
                'Registrado exitosamente')
            return redirect('home')
    context = {
        'formulario': formulario,
        'formulario2': formulario2
    }
    return render(
        request, 
        'registro.html',
        context
    )

def salir(request):
    logout(request)
    messages.success(request, F"La sesión se ha cerrado correctamente")
    return redirect("login")
