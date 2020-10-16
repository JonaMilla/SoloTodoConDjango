window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'BGH B3218K4IC',
            precio: 94.999,
            imagen: 'https://publicapi.solotodo.com/products/61642/picture/?width=300&height=300'
        }, {
            id: 2,
            nombre: 'BGH B3218K4IC',
            precio: 94.999,
            imagen: 'https://publicapi.solotodo.com/products/75522/picture/?width=300&height=300'
        }, {
            id: 3,
            nombre: 'LG 24MT49S-PS',
            precio: 124.999,
            imagen: 'https://publicapi.solotodo.com/products/73493/picture/?width=300&height=300'
        }, {
            id: 4,
            nombre: 'SAMSUNG UN43NU7090',
            precio: 269.999,
            imagen: 'https://publicapi.solotodo.com/products/80497/picture/?width=300&height=300'
        }, {
            id: 5,
            nombre: 'PHILIPS 50PUD6654',
            precio: 309.999,
            imagen: 'https://publicapi.solotodo.com/products/77968/picture/?width=300&height=300'
        }, {
            id: 6,
            nombre: 'SAMSUNG UN43TU7100',
            precio: 319.999,
            imagen: 'https://publicapi.solotodo.com/products/83850/picture/?width=300&height=300'
        }, {
            id: 7,
            nombre: 'SAMSUNG UN49RU7300',
            precio: 369.999,
            imagen: 'https://publicapi.solotodo.com/products/63536/picture/?width=300&height=300'
        }, {
            id: 8,
            nombre: 'MASTER-G MGU7530X',
            precio: 599.999,
            imagen: 'https://publicapi.solotodo.com/products/59826/picture/?width=300&height=300'
        }, {
            id: 9,
            nombre: 'SONY XBR-65X805G',
            precio: 619.999,
            imagen: 'https://publicapi.solotodo.com/products/62058/picture/?width=300&height=300'
        }, {
            id: 10,
            nombre: 'TCL 75C2US',
            precio: 999.999,
            imagen: 'https://publicapi.solotodo.com/products/45789/picture/?width=300&height=300'
        }, {
            id: 11,
            nombre: 'LG 32LM630BPSB',
            precio: 179.999,
            imagen: 'https://publicapi.solotodo.com/products/70606/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'TCL 75C2US',
            precio: 999.999,
            imagen: 'https://publicapi.solotodo.com/products/62380/picture/?width=270&height=270'
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