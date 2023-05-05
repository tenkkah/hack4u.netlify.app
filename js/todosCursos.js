window.onload = function () {
    cargarTodosCursos();
    mostrarUsuarioLogueado();

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);

}

//Variable global donde almacenamos la lista de Cursos de Ciberseguridad obtenidas del JSON
var listaCursos = [];

//Funcion para cargar los cursos de Ciberseguridad
function cargarTodosCursos() {
    $.get("/js/cursos.json", {}, (resultado) => {
        listaCursos = resultado;
        pintarCursos(resultado.ciberseguridad,"contenidoTodasCategorias");
        pintarCursos(resultado.software,"contenidoTodasCategorias");
        pintarCursos(resultado.videojuegos,"contenidoTodasCategorias");
    });
}


function ordenarListaTodos() {
    document.getElementById("contenidoTodasCategorias").innerHTML = "";
    var valueSelectOrdenar = document.getElementById("ordenarCursos").value;
    var listaTodosCursos = [];
    listaTodosCursos.push(listaCursos["ciberseguridad"]);
    listaTodosCursos.push(listaCursos["software"]);
    listaTodosCursos.push(listaCursos["videojuegos"]);

    if (valueSelectOrdenar == "nombre") {
        var ordenadaNombre = listaTodosCursos[0].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            if (b.titulo < a.titulo) {
                return 1;
            } else if (b.titulo > a.titulo) {
                return -1;
            } else {
                0;
            }
        });
        var ordenadaNombre2 = listaTodosCursos[1].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            if (b.horas > a.horas) {
                return 1;
            } else if (b.horas < a.horas) {
                return -1;
            } else {
                0;
            }
        });
        var ordenadaNombre3 = listaTodosCursos[2].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            if (b.lecciones > a.lecciones) {
                return 1;
            } else if (b.lecciones < a.lecciones) {
                return -1;
            } else {
                0;
            }
        });
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg1'><h2><span class='tituloCateg2'>Ciberseguridad:</span></h2></div><br>";
        pintarCursos(ordenadaNombre,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Software:</span></h2></div><br>";
        pintarCursos(ordenadaNombre2,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Videojuegos:</span></h2></div><br>";
        pintarCursos(ordenadaNombre3,"contenidoTodasCategorias");

    }

    if (valueSelectOrdenar == "horas") {
        var ordenadaHoras = listaTodosCursos[0].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.horas > a.horas ? 1
                : b.horas < a.horas ? - 1
                    : 0;
        });
        var ordenadaHoras2 = listaTodosCursos[1].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.horas > a.horas ? 1
                : b.horas < a.horas ? - 1
                    : 0;
        });
        var ordenadaHoras3 = listaTodosCursos[2].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.horas > a.horas ? 1
                : b.horas < a.horas ? - 1
                    : 0;
        });
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg1'><h2><span class='tituloCateg2'>Ciberseguridad:</span></h2></div><br>";
        pintarCursos(ordenadaHoras,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Software:</span></h2></div><br>";
        pintarCursos(ordenadaHoras2,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Videojuegos:</span></h2></div><br>";
        pintarCursos(ordenadaHoras3,"contenidoTodasCategorias");
    }

    if (valueSelectOrdenar == "lecciones") {
        var ordenadaLecciones = listaTodosCursos[0].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.lecciones > a.lecciones ? 1
                : b.lecciones < a.lecciones ? - 1
                    : 0;
        });
        var ordenadaLecciones2 = listaTodosCursos[1].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.lecciones > a.lecciones ? 1
                : b.lecciones < a.lecciones ? - 1
                    : 0;
        });
        var ordenadaLecciones3 = listaTodosCursos[2].sort(function ordenar(a, b) {
            listaOriginal = listaTodosCursos[0].concat();
            return b.lecciones > a.lecciones ? 1
                : b.lecciones < a.lecciones ? - 1
                    : 0;
        });
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg1'><h2><span class='tituloCateg2'>Ciberseguridad:</span></h2></div><br>";
        pintarCursos(ordenadaLecciones,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Software:</span></h2></div><br>";
        pintarCursos(ordenadaLecciones2,"contenidoTodasCategorias");
        document.getElementById("contenidoTodasCategorias").innerHTML += "<div class='contenidoTituloCateg2'><h2><span class='tituloCateg2'>Videojuegos:</span></h2></div><br>";
        pintarCursos(ordenadaLecciones3,"contenidoTodasCategorias");
    }

    if (valueSelectOrdenar == "listaOriginal") {
        listaOriginal = listaTodosCursos[0].concat();
        listaTodosCursos = listaOriginal.concat();
        cargarTodosCursos();
    }
}