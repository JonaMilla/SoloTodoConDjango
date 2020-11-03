"""
def carro_total_cantidad(request):
    total = 0.0
    if request.user.is_authenticated:
        for key, value in request.session['carro'].items():
            total = total + (float(value['precio']) * value['cantidad'])
    return {'carro_total_cantidad': total}

"""