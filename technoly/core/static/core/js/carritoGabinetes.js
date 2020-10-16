window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'Clio S603 Plus',
            precio: 24.998,
            imagen: 'https://publicapi.solotodo.com/products/33245/picture/?width=270&height=270'
        }, {
            id: 2,
            nombre: 'Multimarca S605',
            precio: 27.998,
            imagen: 'https://publicapi.solotodo.com/products/5719/picture/?width=270&height=270'
        }, {
            id: 3,
            nombre: 'Spektra One',
            precio: 29.999,
            imagen: 'https://publicapi.solotodo.com/products/60878/picture/?width=270&height=270'
        }, {
            id: 4,
            nombre: 'Thermaltake Versa C22 RGB (CA-1G9-00M1WN-00)',
            precio: 78.998,
            imagen: 'https://publicapi.solotodo.com/products/36714/picture/?width=270&height=270'
        }, {
            id: 5,
            nombre: 'NZXT H200 - White (CA-H200B-W1)',
            precio: 79.999,
            imagen: 'https://publicapi.solotodo.com/products/49962/picture/?width=270&height=270'
        }, {
            id: 6,
            nombre: 'NZXT H200 - Black / Blue (CA-H200B-BL)',
            precio: 79.999,
            imagen: 'https://publicapi.solotodo.com/products/49141/picture/?width=270&height=270'
        }, {
            id: 7,
            nombre: 'Corsair Crystal Series 280X RGB - White (CC-9011137-WW)',
            precio: 183.999,
            imagen: 'https://publicapi.solotodo.com/products/53383/picture/?width=270&height=270'
        }, {
            id: 8,
            nombre: 'ASUS TUF Gaming GT501 (90DC0012-B40000)',
            precio: 189.999,
            imagen: 'https://publicapi.solotodo.com/products/60955/picture/?width=270&height=270'
        }, {
            id: 9,
            nombre: 'In Win 805 - Gold',
            precio: 229.999,
            imagen: 'https://publicapi.solotodo.com/products/29765/picture/?width=270&height=270'
        }, {
            id: 10,
            nombre: 'Gamemax Hot Wheels',
            precio: 249.998,
            imagen: 'https://publicapi.solotodo.com/products/60677/picture/?width=270&height=270'
        }, {
            id: 11,
            nombre: 'be quiet! Define 7 XL Light Tempered Glass (FD-C-DEF7X-02)',
            precio: 499.998,
            imagen: 'https://publicapi.solotodo.com/products/86018/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'In Win 101 - TUF Gaming (IW-101TUFGAMING)',
            precio: 149.998,
            imagen: 'https://publicapi.solotodo.com/products/49110/picture/?width=270&height=270'
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