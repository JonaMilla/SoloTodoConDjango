from django.shortcuts import redirect, render
from .models import Project, ProductoOferta
from .forms import FormProject, FormProducto
from django.contrib.auth.decorators import login_required
from .carrito import Carro

@login_required
def home(request):
    carro = Carro(request)
    projects = Project.objects.all()
    return render(
        request,
        "principal.html",
        {'projects':projects},
    )

@login_required(login_url='/')
def producto(request, id_producto):
    producto = Project.objects.get(pk=id_producto)
    return render(
        request,
        "producto.html",
        {'id_producto': id_producto,
        'producto': producto},              
    )

@login_required(login_url='/')
def agregarProducto(request):
    formulario = FormProject()
    if request.method == 'POST':
        formulario = FormProject(request.POST, request.FILES)
        if formulario.is_valid():
            nuevoFormulario = formulario.save(commit=False)
            nuevoFormulario.usuario = request.user
            nuevoFormulario.save()
            return redirect('/home/')
    context = {
        'formulario': formulario
    }
    return render(
        request,
        'agregarProducto.html',
        context
    )

@login_required(login_url='/')
def productoOferta(request):
    formulario = FormProducto()
    if request.method == 'POST':
        formulario = FormProducto(request.POST, request.FILES)
        if formulario.is_valid():
            nuevoFormulario = formulario.save(commit=False)
            nuevoFormulario.usuario = request.user
            nuevoFormulario.save()
            return redirect('/home/')
    context = {
        'formulario': formulario
    }
    return render(
        request,
        'ProductoOferta.html',
        context
    )
#carrito
@login_required(login_url='/')
def agregarProductoCarro(request, id_producto):
    carro = Carro(request)
    project = Project.objects.get(id=id_producto)
    carro.agregar(project=project)
    return redirect('/home/')


@login_required(login_url='/')
def eliminarProductoCarro(request, id_producto):
    carro = Carro(request)
    project = Project.objects.get(id=id_producto)
    carro.eliminar(project)
    return redirect('/home/')


@login_required(login_url='/')
def decrementarProductoCarro(request, id_producto):
    carro = Carro(request)
    project = Project.objects.get(id=id_producto)
    carro.decrementar(project=project)
    return redirect('/home/')


@login_required(login_url='/')
def limpiarProductoCarro(request):
    carro = Carro(request)
    carro.limpiarCarro()
    return redirect('/home/')

# def celular(request):
#     return redirect('galeria_carro/celulares.html')
