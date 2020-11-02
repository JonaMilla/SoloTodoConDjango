// DANDOLE FUNCIÓN AL MENÚ DESPLEGABLE CON MATERIALIZECSS
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        coverTrigger: false
    });
});
// $('.dropdown-trigger').dropdown();
// DANDOLE ZOOM AL PRODUCTO 
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
});

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems);
// });


// DANDOLE FUNCIÓN AL BOTON icon-menu
document.getElementById('icon-menu').addEventListener('click', mostrar_menu);

function mostrar_menu() {
    document.getElementById('move-content').classList.toggle('move-container-all');
    document.getElementById('show-menu').classList.toggle('show-lateral');
}

// ++++++++++"BUSCADOR DE CONTENIDO"++++++++++

// EJECUTANDO FUNCIONES
document.getElementById('icon-search').addEventListener('click', mostrar_buscador);
document.getElementById('cover-ctn-search').addEventListener('click', ocultar_buscador);

// DECLARANDO VARIABLES
let bars_search = document.getElementById('ctn-bars-search');
let cover_ctn_search = document.getElementById('cover-ctn-search');
let inputSearch = document.getElementById('inputSearch');
let box_search = document.getElementById('box-search');

// FUNCION PARA MOSTRAR EL BUSCADOR (INPUT_SEARCH)

function mostrar_buscador() {
    bars_search.style.top = '64px';
    cover_ctn_search.style.display = 'block';
    inputSearch.focus();
    if (inputSearch.value === '') {
        box_search.style.display = 'none';
    }
}


// FUNCION PARA OCULTAR BUSCADOR
function ocultar_buscador() {
    bars_search.style.top = '-100px';
    cover_ctn_search.style.display = 'none';
    inputSearch.value = '';
    box_search.style.display = 'none';
}

// CREANDO FILTRADO DE BUSQUEDA
document.getElementById('inputSearch').addEventListener('keyup', buscador_interno);

function buscador_interno() {
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName('li');

    // RECORRIENDO ELEMENTOS A FILTRAR MEDIANTE LOS 'li'
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];
        textValue = a.textContent || a.innerText;

        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
            box_search.style.display = 'block'

            if (inputSearch.value === '') {
                box_search.style.display = 'none';
            }
        } else {
            li[i].style.display = 'none';
        }
    }
}