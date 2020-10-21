from django.shortcuts import render
from core.models import Project
#from .models import Project
# Create your views here.
def producto(request, id_producto):
    producto = Project.objects.get(pk=id_producto)
    return render(
        request,
        "aoc.html",
        {'id_producto': id_producto,
        'producto': producto},              
    )
