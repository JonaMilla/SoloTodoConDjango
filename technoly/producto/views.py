from django.shortcuts import render
#from .models import Project
# Create your views here.
def producto(request):
    # projects = Project.objects.all()
    return render(
        request,
        "aoc.html",
        #{'projects':projects}
    )
