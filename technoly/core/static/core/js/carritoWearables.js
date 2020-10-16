// Con el evento ONLOAD !! podemos ejecutar acciones justo cuando se han 
// terminado de cargar todos los elementos de la página

// WINDOW Hace referencia a la ventana actual

window.onload = function() {
    // Variables
    let baseDeDatos = [{
        id: 1,
        nombre: 'Microlab Kids Watch 7901 - Azul',
        precio: 4.999,
        imagen: 'https://publicapi.solotodo.com/products/56103/picture/?width=300&height=300'
    }, {
        id: 2,
        nombre: 'Disney Activity Action Tracker - Celeste',
        precio: 7.999,
        imagen: 'https://publicapi.solotodo.com/products/60586/picture/?width=300&height=300'
    }, {
        id: 3,
        nombre: 'Lhotse SM33 - Morado',
        precio: 13.999,
        imagen: 'https://publicapi.solotodo.com/products/56345/picture/?width=300&height=300'
    }, {
        id: 4,
        nombre: 'Masterlife Ri06 - Negro/Verde',
        precio: 19.999,
        imagen: 'https://publicapi.solotodo.com/products/60368/picture/?width=270&height=270'
    }, {
        id: 5,
        nombre: 'Masterlife Ri06 - Negro/Azul',
        precio: 19.999,
        imagen: 'https://publicapi.solotodo.com/products/60369/picture/?width=270&height=270'
    }, {
        id: 6,
        nombre: 'Jarv Jarv RunFit Fitness Tracker - Blanco',
        precio: 19.999,
        imagen: 'https://publicapi.solotodo.com/products/69702/picture/?width=270&height=270'
    }, {
        id: 7,
        nombre: 'Lhotse SM36 - Rojo',
        precio: 32.999,
        imagen: 'https://publicapi.solotodo.com/products/56312/picture/?width=270&height=270'
    }, {
        id: 8,
        nombre: 'Huawei Band 4 - Graphite Black',
        precio: 34.999,
        imagen: 'https://publicapi.solotodo.com/products/70672/picture/?width=270&height=270'
    }, {
        id: 9,
        nombre: 'Genérico QW16 - Negro',
        precio: 35.999,
        imagen: 'https://publicapi.solotodo.com/products/66371/picture/?width=270&height=270'
    }, {
        id: 10,
        nombre: 'Garmin Fenix 6S Sapphire - Rose Gold/Gray (010-02159-20)',
        precio: 649.999,
        imagen: 'https://publicapi.solotodo.com/products/79084/picture/?width=270&height=270'
    }, {
        id: 11,
        nombre: 'Garmin Fenix 6S Sapphire - Carbon Gray (010-02159-24)',
        precio: 649.999,
        imagen: 'https://publicapi.solotodo.com/products/79079/picture/?width=270&height=270'
    }, {
        id: 12,
        nombre: 'Garmin Fenix 6 Pro - Black (010-02158-02)',
        precio: 699.999,
        imagen: 'https://publicapi.solotodo.com/products/70773/picture/?width=270&height=270'
    }]

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');
    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Agregar';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito() {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
            // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function(item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function(total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.style.background = '#315e85';
            miBoton.style.border = 'none';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        console.log()
            // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function(carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(3);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
}