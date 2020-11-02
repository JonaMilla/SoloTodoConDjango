window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'AtGames Atari Flashback 8 (con 105 Juegos Retro)',
            precio: 34.998,
            imagen: 'https://publicapi.solotodo.com/products/42025/picture/?width=300&height=300'
        }, {
            id: 2,
            nombre: 'SEGA Genesis Mini + 40 Juegos Retro',
            precio: 69.998,
            imagen: 'https://publicapi.solotodo.com/products/68290/picture/?width=300&height=300'
        }, {
            id: 3,
            nombre: 'Sony PS Classic (con 20 Juegos Clasicos)',
            precio: 89.999,
            imagen: 'https://publicapi.solotodo.com/products/54534/picture/?width=300&height=300'
        }, {
            id: 4,
            nombre: 'Nintendo Switch Lite Turquoise',
            precio: 189.998,
            imagen: 'https://publicapi.solotodo.com/products/63763/picture/?width=300&height=300'
        }, {
            id: 5,
            nombre: 'Nintendo Switch Lite Yellow',
            precio: 229.999,
            imagen: 'https://publicapi.solotodo.com/products/63761/picture/?width=300&height=300'
        }, {
            id: 6,
            nombre: 'Nintendo Switch Lite Gray + Estuche Mario Kart',
            precio: 229.999,
            imagen: 'https://publicapi.solotodo.com/products/83187/picture/?width=300&height=300'
        }, {
            id: 7,
            nombre: 'Microsoft Xbox One S 1 TB',
            precio: 279.999,
            imagen: 'https://publicapi.solotodo.com/products/58596/picture/?width=300&height=300'
        }, {
            id: 8,
            nombre: 'Nintendo Switch Lite Turquoise + Super Mario Maker 2',
            precio: 279.999,
            imagen: 'https://publicapi.solotodo.com/products/74935/picture/?width=300&height=300'
        }, {
            id: 9,
            nombre: 'Nintendo Switch Lite Turquoise + Yoshis Crafted World',
            precio: 279.999,
            imagen: 'https://publicapi.solotodo.com/products/82821/picture/?width=300&height=300'
        }, {
            id: 10,
            nombre: 'Nintendo Switch Joy-Con Color Animal Crossing Edition',
            precio: 499.998,
            imagen: 'https://publicapi.solotodo.com/products/73759/picture/?width=300&height=300'
        }, {
            id: 11,
            nombre: 'Sony PS4 Pro 1 TB (Negra)',
            precio: 499.998,
            imagen: 'https://publicapi.solotodo.com/products/31276/picture/?width=300&height=300'
        }, {
            id: 12,
            nombre: 'Nintendo Switch Refresh Gray + Mario Kart 8 Deluxe',
            precio: 499.998,
            imagen: 'https://publicapi.solotodo.com/products/81068/picture/?width=300&height=300'
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