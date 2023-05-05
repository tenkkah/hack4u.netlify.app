window.onload = function(){
    cargarCursosVideojuegos();
    mostrarUsuarioLogueado();

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
    
}

//Variable global donde almacenamos la lista de Cursos de Videojuegos obtenidas del JSON
var listaCursos = [];

//Funcion para cargar los cursos de Ciberseguridad
function cargarCursosVideojuegos(){
    $.get("/js/cursos.json",{},(resultado)=>{
        listaCursos = resultado;
        pintarCursos(resultado.videojuegos,"contenidoVideojuegos");
    });
}

