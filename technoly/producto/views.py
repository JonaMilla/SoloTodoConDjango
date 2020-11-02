from django.http import request
from django.shortcuts import redirect, render
from .models import Project
from .forms import FormProject
from django.contrib.auth.decorators import login_required

#@login_required(login_url='/cuenta/login')
def home(request):
    projects = Project.objects.all()
    return render(
        request,
        "principal.html",
        {'projects':projects}
    )

def producto(request, id_producto):
    producto = Project.objects.get(pk=id_producto)
    return render(
        request,
        "producto.html",
        {'id_producto': id_producto,
        'producto': producto},              
    )

def agregarProducto(request):
    formulario = FormProject()
    if request.method == 'POST':
        formulario = FormProject(request.POST, request.FILES)
        if formulario.is_valid():
            nuevoFormulario = formulario.save(commit=False)
            nuevoFormulario.usuario = request.user
            nuevoFormulario.save()
            return redirect('principal.html')
    context = {
        'formulario': formulario
    }
    return render(
        request,
        'agregarProducto.html',
        context
    )

