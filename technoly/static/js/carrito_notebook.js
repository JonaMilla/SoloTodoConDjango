window.onload = function() {
    // Variables
    let baseDeDatos = [{
            id: 1,
            nombre: 'HP Stream 14-DS0002LA [1B5D2LA]',
            precio: 259.999,
            imagen: 'https://publicapi.solotodo.com/products/85662/picture/?width=300&height=300'
        }, {
            id: 2,
            nombre: 'HP 14-CM0002LA [3PX42LA]',
            precio: 289.990,
            imagen: 'https://publicapi.solotodo.com/products/62168/picture/?width=300&height=300'
        }, {
            id: 3,
            nombre: 'HP 245 G6 [6NY94LT]',
            precio: 289.999,
            imagen: 'https://publicapi.solotodo.com/products/61383/picture/?width=300&height=300'
        }, {
            id: 4,
            nombre: 'ASUS X543MA-GQ728T',
            precio: 299.998,
            imagen: 'https://publicapi.solotodo.com/products/85338/picture/?width=300&height=300'
        }, {
            id: 5,
            nombre: 'Lenovo IdeaPad Slim 1-14AST-05 [81VS000KCL]',
            precio: 299.999,
            imagen: 'https://publicapi.solotodo.com/products/74850/picture/?width=300&height=300'
        }, {
            id: 6,
            nombre: 'Lenovo IdeaPad 3 15ADA05 [81W1001JCL])',
            precio: 309.999,
            imagen: 'https://publicapi.solotodo.com/products/85741/picture/?width=300&height=300'
        }, {
            id: 7,
            nombre: 'Lenovo V145 (A6-9225 / 4GB / 500GB)',
            precio: 319.999,
            imagen: 'https://publicapi.solotodo.com/products/68096/picture/?width=300&height=300'
        }, {
            id: 8,
            nombre: 'Lenovo IdeaPad S145-14IGM [81MW0024CL]',
            precio: 329.992,
            imagen: 'https://publicapi.solotodo.com/products/79751/picture/?width=300&height=300'
        }, {
            id: 9,
            nombre: 'ASUS VivoBook X420FA-EK257T',
            precio: 349.999,
            imagen: 'https://publicapi.solotodo.com/products/84210/picture/?width=300&height=300'
        }, {
            id: 10,
            nombre: 'HP 15-DA0082LA [9UV27LA]',
            precio: 369.998,
            imagen: 'https://publicapi.solotodo.com/products/84315/picture/?width=300&height=300'
        }, {
            id: 11,
            nombre: 'Dell Inspiron 14 3480 (Pentium Gold 5405U / 4GB / 128GB SSD /',
            precio: 399.998,
            imagen: 'https://publicapi.solotodo.com/products/85092/picture/?width=270&height=270'
        }, {
            id: 12,
            nombre: 'Lenovo IdeaPad 3 14IIL05 [81WD00KCCL]',
            precio: 399.998,
            imagen: 'https://publicapi.solotodo.com/products/86300/picture/?width=270&height=270'
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