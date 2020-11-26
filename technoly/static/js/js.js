// DANDOLE FUNCIÓN AL MENÚ DESPLEGABLE CON MATERIALIZECSS
// document.addEventListener('DOMContentLoaded', function() {
//     let elems = document.querySelectorAll('.dropdown-trigger');
//     let instances = M.Dropdown.init(elems, {
//         coverTrigger: false
//     });
// });
// DANDOLE FUNCION AL CUADRO DE COTIZACIONES CON MATERIALIZECSS
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.tabs');
//     var instance = M.Tabs.init(elems);

// });

// DANDOLE ZOOM AL PRODUCTO CON MATERIALIZECSS 
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems);
});

// DANDOLE FUNCIÓN AL CAROUSEL CON SLICK
$(function() {
        $('.slider-tec').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: $('#arrow-prev'),
            nextArrow: $('#arrow-next'),
            responsive: [{
                    breakpoint: 1125,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 365,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    })
    // DANDOLE FUNCIÓN AL CAROUSEL-2 CON SLICK
$(function() {
    $('.slider-tec2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('#arrow-prev1'),
        nextArrow: $('#arrow-next2'),
        responsive: [{
                breakpoint: 1125,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
})

// DANDOLE FUNCIÓN AL BOTON icon-menu
// document.getElementById('icon-menu').addEventListener('click', mostrar_menu);

// function mostrar_menu() {
//     document.getElementById('move-content').classList.toggle('move-container-all');
//     document.getElementById('show-menu').classList.toggle('show-lateral');
// }

// ++++++++++"BUSCADOR DE CONTENIDO"++++++++++

// EJECUTANDO FUNCIONES
// document.getElementById('icon-search').addEventListener('click', mostrar_buscador);
// document.getElementById('cover-ctn-search').addEventListener('click', ocultar_buscador);

// DECLARANDO VARIABLES
// let bars_search = document.getElementById('ctn-bars-search');
// let cover_ctn_search = document.getElementById('cover-ctn-search');
// let inputSearch = document.getElementById('inputSearch');
// let box_search = document.getElementById('box-search');

// FUNCION PARA MOSTRAR EL BUSCADOR (INPUT_SEARCH)

// function mostrar_buscador() {
//     bars_search.style.top = '64px';
//     cover_ctn_search.style.display = 'block';
//     inputSearch.focus();
//     if (inputSearch.value === '') {
//         box_search.style.display = 'none';
//     }
// }


// FUNCION PARA OCULTAR BUSCADOR
// function ocultar_buscador() {
//     bars_search.style.top = '-100px';
//     cover_ctn_search.style.display = 'none';
//     inputSearch.value = '';
//     box_search.style.display = 'none';
// }

// CREANDO FILTRADO DE BUSQUEDA
// document.getElementById('inputSearch').addEventListener('keyup', buscador_interno);

// function buscador_interno() {
//     filter = inputSearch.value.toUpperCase();
//     li = box_search.getElementsByTagName('li');

//     // RECORRIENDO ELEMENTOS A FILTRAR MEDIANTE LOS 'li'
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName('a')[0];
//         textValue = a.textContent || a.innerText;

//         if (textValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = '';
//             box_search.style.display = 'block'

//             if (inputSearch.value === '') {
//                 box_search.style.display = 'none';
//             }
//         } else {
//             li[i].style.display = 'none';
//         }
//     }
// }