from django.shortcuts import render
from .models import Project
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='/cuenta/login')
def home(request):
    projects = Project.objects.all()
    return render(
        request,
        "secundario/principal.html",
        {'projects':projects}
    )

