var contenido = [];
var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.nombre');
var descripcion = document.querySelector('.descripcion');
var temperatura = document.querySelector('.temperatura');
var ciudad = document.querySelector('.ciudad');
var listado = document.getElementById('listado');
var contador = document.getElementById('contador');

if(contenido.length==0){
    listado.innerHTML = "No se ha buscado ciudad";
}
function Agregar(){
    contenido.push(inputValue.value);
    listado.innerHTML= contenido;
    contador.innerHTML =contenido.length;
}
function Eliminar(){
    contenido.pop();
    listado.innerHTML= contenido;
    contador.innerHTML =contenido.length;
}

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=ab0f3bf59a661423ebe8b578f8f377d9' + '&lang=es')
    .then(response=> response.json())
    .then(data => {
        let nameValue= data['name'];
        let temperaturaValue= data['main']['temp'];
        let descripcionValue= data['weather']['0']['description'];
        name.innerHTML =nameValue;
        temperatura.innerHTML = Math.round(temperaturaValue-273)+"°C";
        descripcion.innerHTML =descripcionValue;
    })
.catch(error => alert("Ciudad no encontrada"))
})

