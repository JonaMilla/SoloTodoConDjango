//console.log("Funcionando");

const formulario = document.querySelector('#formulario');
const lista = document.getElementById('listaProductos');
const boton = document.querySelector('#borrar');
let arrayPro = [];


const Crearitem = (producto, precio, imagen) => {
    let item = {
        producto: producto,
        precio : precio,
        imagen : imagen
    }
    arrayPro.push(item);
    return item;
}

const GuardarPR = () => {
    localStorage.setItem('cosas', JSON.stringify(arrayPro));
    LeerPR();
}

const EliminarPR = (producto) =>{

}


const LeerPR = () => {
    lista.innerHTML = '';
    arrayPro = JSON.parse(localStorage.getItem('cosas'));
    console.log(arrayPro);

    if (arrayPro === null) {
        arrayPro = [];
    } else {

        arrayPro.forEach(element => {
            lista.innerHTML += `<div role="alert">
            <a class="short-description-product slick-slide slick-current slick-active">
            <img src=${element.imagen} alt="", width="350xp">
            <br>
            <b class="name-producto">${element.producto}</b>
            <b class="precio-producto">$${element.precio}</b>
            
            </a>
            
        <span>
       
        </span>
        </div>`
        });
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let product = document.querySelector('#nombrep').value;
    let precio = document.querySelector('#precio').value;
    let imagen = document.querySelector('#imagen').value;
    formulario.reset();

    Crearitem(product, precio, imagen);
    GuardarPR();
})

document.addEventListener('DOMContentLoaded', LeerPR);

lista.addEventListener('click', (e) =>{

    e.preventDefault();

    console.log(e.target.childNodes[1].innerHTML);
   
    
});

