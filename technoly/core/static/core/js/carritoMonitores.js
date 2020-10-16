window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'HP V194 (V5E94AA)',
            precio: 54.998,
            imagen: 'https://publicapi.solotodo.com/products/28509/picture/?width=270&height=270'
        }, {
            id: 2,
            nombre: 'AOC E1670SWU',
            precio: 59.998,
            imagen: 'https://publicapi.solotodo.com/products/26038/picture/?width=270&height=270'
        }, {
            id: 3,
            nombre: 'Viewsonic VA1903h',
            precio: 61.999,
            imagen: 'https://publicapi.solotodo.com/products/62759/picture/?width=270&height=270'
        }, {
            id: 4,
            nombre: 'AOC E2270SWHN',
            precio: 77.298,
            imagen: 'https://publicapi.solotodo.com/products/39112/picture/?width=270&height=270'
        }, {
            id: 5,
            nombre: 'HP V203p (T3U90AA)',
            precio: 77.999,
            imagen: 'https://publicapi.solotodo.com/products/37727/picture/?width=270&height=270'
        }, {
            id: 6,
            nombre: 'Viewsonic VA2261h-2',
            precio: 78.999,
            imagen: 'https://publicapi.solotodo.com/products/62760/picture/?width=270&height=270'
        }, {
            id: 7,
            nombre: 'Viewsonic VA2261-2',
            precio: 90.999,
            imagen: 'https://publicapi.solotodo.com/products/22432/picture/?width=270&height=270'
        }, {
            id: 8,
            nombre: 'HP N223 (3ML60AA)',
            precio: 91.999,
            imagen: 'https://publicapi.solotodo.com/products/55592/picture/?width=270&height=270'
        }, {
            id: 9,
            nombre: 'HP P224 (5QG34A8)',
            precio: 92.999,
            imagen: 'https://publicapi.solotodo.com/products/83505/picture/?width=270&height=270'
        }, {
            id: 10,
            nombre: 'LG 24MD4KL-B',
            precio: 599.998,
            imagen: 'https://publicapi.solotodo.com/products/68038/picture/?width=270&height=270'
        }, {
            id: 11,
            nombre: 'Dell UltraSharp U2721DE',
            precio: 603.998,
            imagen: 'https://publicapi.solotodo.com/products/80456/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'Dell UltraSharp U2720Q',
            precio: 605.998,
            imagen: 'https://publicapi.solotodo.com/products/74134/picture/?width=270&height=270'
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