window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'MSI N210-MD1G/D3',
            precio: 32.998,
            imagen: 'https://publicapi.solotodo.com/products/2543/picture/?width=270&height=270'
        }, {
            id: 2,
            nombre: 'MSI GT 710 1GD3H LP',
            precio: 48.998,
            imagen: 'https://publicapi.solotodo.com/products/26136/picture/?width=270&height=270'
        }, {
            id: 3,
            nombre: 'ASUS GT710-SL-1GD5-BRK',
            precio: 50.999,
            imagen: 'https://publicapi.solotodo.com/products/72394/picture/?width=270&height=270'
        }, {
            id: 4,
            nombre: 'PNY Quadro P400 V2 [VCQP400V2-PB]',
            precio: 139.998,
            imagen: 'https://publicapi.solotodo.com/products/82308/picture/?width=270&height=270'
        }, {
            id: 5,
            nombre: 'AMD Radeon Pro WX 2100 [100-506001]',
            precio: 163.999,
            imagen: 'https://publicapi.solotodo.com/products/72745/picture/?width=270&height=270'
        }, {
            id: 6,
            nombre: 'ASUS PH-GTX1050TI-4G',
            precio: 169.999,
            imagen: 'https://publicapi.solotodo.com/products/32987/picture/?width=270&height=270'
        }, {
            id: 7,
            nombre: 'MSI GeForce GTX 1650 4GT LP OC',
            precio: 200.999,
            imagen: 'https://publicapi.solotodo.com/products/80164/picture/?width=270&height=270'
        }, {
            id: 8,
            nombre: 'MSI GeForce GTX 1650 D6 VENTUS XS OC',
            precio: 204.999,
            imagen: 'https://publicapi.solotodo.com/products/83911/picture/?width=270&height=270'
        }, {
            id: 9,
            nombre: 'Gigabyte GeForce GTX 1650 D6 WINDFORCE OC 4G [GV-',
            precio: 212.999,
            imagen: 'https://publicapi.solotodo.com/products/81560/picture/?width=270&height=270'
        }, {
            id: 10,
            nombre: 'ASUS DUAL-RX5500XT-O8G-EVO [90YV0DV1-M0AA00]',
            precio: 239.998,
            imagen: 'https://publicapi.solotodo.com/products/75657/picture/?width=270&height=270'
        }, {
            id: 11,
            nombre: 'ASRock Phantom Gaming D Radeon RX580 8G OC [PG D',
            precio: 239.998,
            imagen: 'https://publicapi.solotodo.com/products/57024/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'EVGA GeForce GTX 1650 SUPER SC ULTRA GAMING [04G-P4-1357-',
            precio: 239.998,
            imagen: 'https://publicapi.solotodo.com/products/70308/picture/?width=270&height=270'
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