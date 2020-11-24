from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view

from .serializers import ComentarioSerializer
from .models import Comentario

@api_view(['GET'])
def saludar(request):
    return JsonResponse({
        'mensaje':'Hola mundo!!'
    },status=status.HTTP_200_OK)

@api_view(['POST','GET','DELETE'])
def listarAgregarBorrarTodo(request):
    if request.method == 'POST':
        datos_comentario = JSONParser().parse(request)
        formulario = ComentarioSerializer(data=datos_comentario)
        if formulario.is_valid():
            formulario.save()
            return JsonResponse(
                formulario.data,
                status = status.HTTP_201_CREATED
            )
        return JsonResponse(
            formulario.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    elif request.method == 'GET':
        comentarios = Comentario.objects.all()
        comentarios_procesados = ComentarioSerializer(comentarios,many=True)
        return JsonResponse(
            comentarios_procesados.data,
            safe=False,
            status=status.HTTP_200_OK
        )
    elif request.method == 'DELETE':
        Comentario.objects.all().delete()
        return JsonResponse(
            {
                'mensaje':'borrados'
            },
            status=status.HTTP_200_OK
        )

@api_view(['GET','PUT','DELETE'])
def buscarEliminarActualizar(request,id):
    try:
        comentario = Comentario.objects.get(pk=id)
    except ObjectDoesNotExist:
        return JsonResponse(
            {
                "mensaje":"Comentario no encontrado"
            },
            status=status.HTTP_404_NOT_FOUND
        )
    if request.method == 'GET':
        comentario_procesado = ComentarioSerializer(comentario)
        return JsonResponse(
            comentario_procesado.data,
            status=status.HTTP_200_OK
        )

    return JsonResponse({
        'metodo':request.method,
        'id':id
    },status=status.HTTP_200_OK)
