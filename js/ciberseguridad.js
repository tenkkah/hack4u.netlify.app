window.onload = function () {
    cargarCursosCiberseguridad();
    mostrarUsuarioLogueado();
    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
}

//Variable global donde almacenamos la lista de Cursos de Ciberseguridad obtenidas del JSON
var listaCursos = [];

//Funcion para cargar los cursos de Ciberseguridad
function cargarCursosCiberseguridad() {
    $.get("/js/cursos.json", {}, (resultado) => {
        listaCursos = resultado;
        pintarCursos(resultado.ciberseguridad, "contenidoCiberseguridad");
    });
}





