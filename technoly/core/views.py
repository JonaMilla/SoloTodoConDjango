from django.shortcuts import render

# Create your views here.

def home(request):
    return render(
        request,
        "secundario/principal.html"
    )

def producto(request):
    return render(
        request,
        "secundario/aoc.html"
    )