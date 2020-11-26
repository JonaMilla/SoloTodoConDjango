(function(d,w){
    d.addEventListener("readystatechange",function(){
        if(d.readyState === "complete"){
            init();
        }
    });
    //DECLARACIÓN DE CONSTANTES
    const URL_COMENTARIO = w.location.href + "api/comentario/"
    let COMENTARIOS = []
    const TBODY = document.getElementsByTagName("tbody")[0];
    //MÉTODOS DE UTILIDAD
    function borrarTodo(){
        const btnBorrar = d.getElementById("btnBorrar");
        btnBorrar.addEventListener("click",function(){
            const resultado = confirm("¿Seguro desea borar todos los comentarios?");
            if(resultado){
                COMENTARIOS = [];
                fetch(URL_COMENTARIO,{
                    method:"DELETE"
                })
                .then(function(respuesta){
                    return respuesta.json();
                })
                .then(function(data){   
                    TBODY.innerHTML = "";
                    alert(data.mensaje);
                })
                .catch(function(error){
                    console.error(error);
                })
                .finally(function(){
                    console.info("Borrado termino :D");
                })
            }
        });
    }

    function agregarComentario(){
        const formulario = d.getElementsByTagName("form")[1];
        formulario.addEventListener("submit",function(e){
            e.preventDefault();
            const usuario = formulario.usuario.value.trim()
            const comentario = formulario.comentario.value.trim()
            const objetoSalida = {
                usuario: usuario,
                comentario: comentario
            };
            fetch(URL_COMENTARIO,{
                method:'POST',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(objetoSalida)
            })
            .then(function(respuesta){
                return respuesta.json();
            })
            .then(function(data){
                console.table(data);
                formulario.reset();
                alert("Agregado con éxito...")
                agregarATabla(data);
            })
            .catch(function(error){
                console.error(error);
            })
            .finally(function(){
                console.info("Petición agregar terminada")
            });
        })
    }

    function buscarComentarios(){
        fetch(URL_COMENTARIO)
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(data){
            COMENTARIOS = data
            TBODY.innerHTML = "";
            for(const comentario of COMENTARIOS){
                agregarATabla(comentario);
            }
        })
        .cath(function(error){
            console.error(error)
        })
        .finally(function(){
            console.info("Petición de comentario finalizada")
        })
    }

    function agregarATabla(comentario){
        const tr = d.createElement("tr");
        tr.id = comentario.id;
        const tdUsuario = d.createElement("td");
        tdUsuario.innerText = comentario.usuario;
        // TD Fecha
        const tdFecha = d.createElement("td");
        tdFecha.innerText = comentario.fecha;
        // TD Acción
        const tdAccion = d.createElement("td");
        // Btn Modificar
        const btnModificar = d.createElement("button");
        btnModificar.innerText = "M";
        btnModificar.classList.add("btn","btn-info");
        btnModificar.addEventListener("click",function(){
            btnModificar(comentario.id);
        });
        const btnAccion = d.createElement("button");
        if(comentario.activo === 1){
            btnAccion.innerText = "D";
            btnAccion.classList.add("btn","btn-warning");
            btnAccion.addEventListener("click",function(){
                accionComentario(comentario.id,0);
            });
        }else{
            btnAccion.innerText = "P";
            btnAccion.classList.add("btn","btn-info");
            btnAccion.addEventListener("click",function(){
                accionComentario(comentario.id,1);
            });
        }
        // construimos los TD
        tdAccion.appendChild(btnModificar);
        tdAccion.appendChild(btnAccion);
        // Construimos el TR
        tr.appendChild(tdUsuario);
        tr.appendChild(tdFecha);
        tr.appendChild(tdAccion);
        TBODY.appendChild(tr);
        console.log(comentario);
    }

    function modificar(comentarioId){
        console.log(comentarioId);
    }

    function accionComentario(comentarioId,accion){
        console.log(comentarioId,accion);
    }
    // Metodo de inicio :D
    function init(){
        agregarComentario();
        buscarComentarios();
        borrarTodo();
    }
})(document,window,$)