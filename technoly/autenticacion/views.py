from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as auth_login, logout, authenticate
from .forms import FormCreacionUsuario, FormCreacionPerfil, FormIniciarSesion


def login(request):
    form = FormIniciarSesion()
    if request.method == "POST":
        form = FormIniciarSesion(data=request.POST)
        if form.is_valid():
            nombre_usuario = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            usuario = authenticate(username=nombre_usuario, password=password)
            if usuario is not None:
                messages.add_message(request,
                    messages.SUCCESS,
                    'Bienvenido(a) nuevamente {}'.format(usuario.get_username())
                )
                auth_login(request, usuario)
                return redirect("home")
    context = {
        "form": form
    }
    return render(
        request,
        "login.html", 
        context
    )


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
