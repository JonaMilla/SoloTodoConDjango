window.onload = function() {
    // Variables
    let baseDeDatos = [{

            id: 1,
            nombre: 'NEX CR-52',
            precio: 63.999,
            imagen: 'https://publicapi.solotodo.com/products/13849/picture/?width=300&height=300'
        }, {
            id: 2,
            nombre: 'MAIGAS HS-87L',
            precio: 79.999,
            imagen: 'https://publicapi.solotodo.com/products/65339/picture/?width=300&height=300'
        }, {
            id: 3,
            nombre: 'MADEMSA MMB 71B (1P 66 MB FD)',
            precio: 114.999,
            imagen: 'https://publicapi.solotodo.com/products/21869/picture/?width=300&height=300'
        }, {
            id: 4,
            nombre: 'WINIA DAEWOO FR-125BG',
            precio: 169.999,
            imagen: 'https://publicapi.solotodo.com/products/11897/picture/?width=300&height=300'
        }, {
            id: 5,
            nombre: 'IRT I005FB136LT',
            precio: 203.799,
            imagen: 'https://publicapi.solotodo.com/products/80573/picture/?width=300&height=300'
        }, {
            id: 6,
            nombre: 'MIDEA MBC-960N125SEN',
            precio: 219.999,
            imagen: 'https://publicapi.solotodo.com/products/85837/picture/?width=300&height=300'
        }, {
            id: 7,
            nombre: 'VENTUS LG-290LED',
            precio: 249.999,
            imagen: 'https://publicapi.solotodo.com/products/64635/picture/?width=300&height=300'
        }, {
            id: 8,
            nombre: 'WINIA DAEWOO RFD-344H',
            precio: 259.999,
            imagen: 'https://publicapi.solotodo.com/products/86740/picture/?width=300&height=300'
        }, {
            id: 9,
            nombre: 'MABE RMA250HUG',
            precio: 299.999,
            imagen: 'https://publicapi.solotodo.com/products/66396/picture/?width=300&height=300'
        }, {
            id: 10,
            nombre: 'WINIA DAEWOO FRS-K6500BXA',
            precio: 529.999,
            imagen: 'https://publicapi.solotodo.com/products/40529/picture/?width=300&height=300'
        }, {
            id: 11,
            nombre: 'Midea MRFS-2100R273FN',
            precio: 189.999,
            imagen: 'https://publicapi.solotodo.com/products/23308/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'Nex FC2-32INOX',
            precio: 229.999,
            imagen: 'https://publicapi.solotodo.com/products/42632/picture/?width=270&height=270'
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