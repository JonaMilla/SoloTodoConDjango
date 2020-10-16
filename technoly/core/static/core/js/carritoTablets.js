window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'Microlab MB4 (Negro)',
            precio: 49.998,
            imagen: 'https://publicapi.solotodo.com/products/26789/picture/?width=300&height=300'
        }, {
            id: 2,
            nombre: 'Amazon Fire 7 (2019 / 16 GB / Twilight Blue)',
            precio: 58.998,
            imagen: 'https://publicapi.solotodo.com/products/68081/picture/?width=300&height=300'
        }, {
            id: 3,
            nombre: 'Alcatel A3 Kids (8067 / Azul)',
            precio: 59.999,
            imagen: 'https://publicapi.solotodo.com/products/76728/picture/?width=300&height=300'
        }, {
            id: 4,
            nombre: 'Amazon Kindle Fire HD (7 pulgadas / 16 GB)',
            precio: 79.998,
            imagen: 'https://publicapi.solotodo.com/products/11797/picture/?width=300&height=300'
        }, {
            id: 5,
            nombre: 'SoyMomo Lite (Blue)',
            precio: 79.999,
            imagen: 'https://publicapi.solotodo.com/products/71373/picture/?width=300&height=300'
        }, {
            id: 6,
            nombre: 'Microlab MBX (8717 / Black)',
            precio: 89.999,
            imagen: 'https://publicapi.solotodo.com/products/69717/picture/?width=300&height=300'
        }, {
            id: 7,
            nombre: 'Huawei MediaPad T3 10',
            precio: 124.999,
            imagen: 'https://publicapi.solotodo.com/products/47686/picture/?width=300&height=300'
        }, {
            id: 8,
            nombre: 'Lenovo Tab M8 (16 GB / Platinum Gray) [ZA5H0070CL]',
            precio: 129.999,
            imagen: 'https://publicapi.solotodo.com/products/76010/picture/?width=300&height=300'
        }, {
            id: 9,
            nombre: 'Samsung Galaxy Tab A 8.0 2019 LTE (T295 / Silver Gray) [SM-',
            precio: 139.999,
            imagen: 'https://publicapi.solotodo.com/products/65095/picture/?width=300&height=300'
        }, {
            id: 10,
            nombre: 'Apple iPad 10.2 2019 (Wi-Fi / 32 GB / Silver) [MW752CI/A]',
            precio: 339.998,
            imagen: 'https://publicapi.solotodo.com/products/67917/picture/?width=270&height=270'
        }, {
            id: 11,
            nombre: 'Samsung Galaxy Tab S6 Lite (P610 / Angora Blue) [SM-P610NZBUCHO]',
            precio: 349.998,
            imagen: 'https://publicapi.solotodo.com/products/80806/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'Samsung Galaxy Tab Active 2 LTE (SM-T395 / Negro) [SM-',
            precio: 359.998,
            imagen: 'https://publicapi.solotodo.com/products/43402/picture/?width=270&height=270'
        }


    ]
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