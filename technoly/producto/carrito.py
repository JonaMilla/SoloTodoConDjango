class Carro:

    def __init__(self, request):
        self.request = request
        self.session = request.session
        carro = self.session.get("carro")
        if not carro:
            carro = self.session["carro"] = {}
        self.carro = carro

    def agregar(self, project):
        if str(project.id) not in self.carro.keys():
            self.carro[project.id] = {
                "id_producto": project.id,
                "nombre": project.name,
                "cantidad": 1,
                "descripcion": project.description,
                "precio": str(project.precio),
            }
        else:
            for Key, value in self.carro.items():
                if Key == str(project.id):
                    value["cantidad"] = value["cantidad"] + 1
                    break
        self.guardar()
    
    def guardar(self):
        self.session["carro"] = self.carro
        self.session.modified = True

    def eliminar(self, project):
        id_producto = str(project.id)
        if id_producto in self.carro:
            del self.carro[id_producto]

    def decrementar(self, project):
        for Key, value in self.carro.items():
                if Key == str(project.id):
                    value["cantidad"] = value["cantidad"] - 1
                    if value["cantidad"] < 1:
                        self.eliminar(project)
                    else:
                        self.guardar()
                    break
                else:
                    print("El producto no está en el carrito :C")

    def limpiarCarro(self):
        self.session["carro"] = {}
        self.session.modified = True