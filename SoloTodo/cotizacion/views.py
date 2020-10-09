from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def principal(request):
    context = {
        "titulo":"Cotiza y compara los precios de todas las tiendas - SoloTodo"
    }
    return render(
        request,
        'paginaPrincipal/principal.html',
        context
    )

def vistaAcer(request):
    context = {
        "titulo":"Acer Nitro 5 AN515-43-R9M4-1"
    }
    return render(
        request,
        'paginaPrincipal/acer.html',
        context
    )