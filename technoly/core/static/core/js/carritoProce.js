window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'Intel Celeron G1820 [BX80646G1820]',
            precio: 19.998,
            imagen: 'https://publicapi.solotodo.com/products/16307/picture/?width=270&height=270'
        }, {
            id: 2,
            nombre: 'Intel Celeron G3900 [BX80662G3900]',
            precio: 39.998,
            imagen: 'https://publicapi.solotodo.com/products/26733/picture/?width=270&height=270'
        }, {
            id: 3,
            nombre: 'Intel Celeron G4900 [BX80684G4900]',
            precio: 41.999,
            imagen: 'https://publicapi.solotodo.com/products/53374/picture/?width=270&height=270'
        }, {
            id: 4,
            nombre: 'Intel Core i3-9100F [BX80684I39100F]',
            precio: 82.998,
            imagen: 'https://publicapi.solotodo.com/products/61292/picture/?width=270&height=270'
        }, {
            id: 5,
            nombre: 'Intel Pentium G4500 [BX80662G4500]',
            precio: 84.999,
            imagen: 'https://publicapi.solotodo.com/products/22502/picture/?width=270&height=270'
        }, {
            id: 6,
            nombre: 'Intel Core i3-9100 [BX80684I39100]',
            precio: 113.999,
            imagen: 'https://publicapi.solotodo.com/products/63828/picture/?width=270&height=270'
        }, {
            id: 7,
            nombre: 'Intel Core i5-9400F [BX80684I59400F]',
            precio: 151.999,
            imagen: 'https://publicapi.solotodo.com/products/56956/picture/?width=270&height=270'
        }, {
            id: 8,
            nombre: 'AMD Ryzen 5 2600 [YD2600BBAFBOX]',
            precio: 154.999,
            imagen: 'https://publicapi.solotodo.com/products/43659/picture/?width=270&height=270'
        }, {
            id: 9,
            nombre: 'AMD Ryzen 5 3400G [YD3400C5FHBOX]',
            precio: 168.999,
            imagen: 'https://publicapi.solotodo.com/products/63488/picture/?width=270&height=270'
        }, {
            id: 10,
            nombre: 'Intel Core i7-8700 [BX80684I78700]',
            precio: 302.998,
            imagen: 'https://publicapi.solotodo.com/products/40542/picture/?width=270&height=270'
        }, {
            id: 11,
            nombre: 'Intel Core i7-9700 [BX80684I79700]',
            precio: 306.998,
            imagen: 'https://publicapi.solotodo.com/products/63925/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'Intel Core i5-10600K [BX8070110600KA]',
            precio: 311.998,
            imagen: 'https://publicapi.solotodo.com/products/85919/picture/?width=270&height=270'
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