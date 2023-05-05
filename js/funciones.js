//ARCHIVO PARA ACUMULAR LAS FUNCIONES REPETITIVAS Y USARLAS POSTERIORMENTE EN LOS .js OPORTUNOS

//-----------------------------------



/*DATOS USUARIO LOGUEADO*/
//Mostramos el nombre de usuario y las opciones disponibles en el navbar según tipo de usuario (admin o usuario sin privilegios de admin)
function mostrarUsuarioLogueado() {
    var usuarioLogueado = localStorage.getItem("usuario");
    var DivcursosInscritos = document.getElementById("cursosInscritos");
    
    //Troceamos el usuario, nos interesa el nombre de usuario en este caso y mostramos unas paginas u otras dependiendo el usuario si es admin o no
    if (usuarioLogueado != null) {
        var nombreUsuarioLogueado = localStorage.getItem("usuario").split(",");
        document.getElementById("nombreUsuarioIndex").innerHTML = nombreUsuarioLogueado[0];
        if (usuarioLogueado.split(",")[0] == 'admin') {
            var texto = `<li><a class="dropdown-item" href="/html/editarUsuario.html">EDITAR Mi Usuario</a></li>
            <li><a class="dropdown-item" href="/html/editarUsuarioAdmin.html">Editar/Borrar Usuario</a></li>
            <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>`;
            document.getElementById("funcionesUsuario").innerHTML = texto;

            var a = document.createElement("a");
            a.href = "/html/cursosInscritos.html";
            a.innerHTML = "CURSOS INSCRITOS";
            a.className = "nav-left";
            a.style.visibility = "visible";

            DivcursosInscritos.appendChild(a);
            
        } else {
            var texto = `<li><a class="dropdown-item" href="/html/editarUsuario.html">EDITAR Mi Usuario</a></li>
            <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>`;
            document.getElementById("funcionesUsuario").innerHTML = texto;

            var a = document.createElement("a");
            a.href = "/html/cursosInscritos.html";
            a.innerHTML = "CURSOS INSCRITOS";
            a.className = "nav-left";
            a.style.visibility = "visible";
            DivcursosInscritos.appendChild(a);
        }
    } else {
        document.getElementById("usuarioRegistrarse").innerHTML = "<a href='/html/registro.html' class='nav-link text-primary'>Regístrese</a>";

        
        var a = document.createElement("a");
        a.href = "/html/cursosInscritos.html";
        a.innerHTML = "CURSOS INSCRITOS";
        a.className = "nav-left";
        a.style.visibility = "hidden";
        DivcursosInscritos.appendChild(a);
    }
}


//Cierra la sesion del usuario actual llevando al login y borrando localStorage del usuario Logueado
function cerrarSesion() {
    localStorage.removeItem("usuario");
    location.href = "/html/login.html";
}


/*FOOTER*/
//Función para mostrar página de Facebook (ventana nueva)
function mostrarFacebook() {
    window.open("https://www.facebook.com/", "_blank");
}
//Función para mostrar página de Google (ventana nueva)
function mostrarGoogle() {
    window.open("https://www.google.es/", "_blank");
}
//Función para mostrar página de Twitter (ventana nueva)
function mostrarTwitter() {
    window.open("https://twitter.com/", "_blank");
}
//Función para mostrar página de Instagram (ventana nueva)
function mostrarInstagram() {
    window.open("https://instagram.com/");
}
//Función para mostrar página del IES Cañaveral (ventana nueva)
function mostrarCanaveral() {
    window.open("https://www.educa2.madrid.org/web/iescanaveral", "_blank");
}




//Funcion general para pintar todos los cursos, donde le paso por parametros la lista que es diferente y el id donde quiero que se pinte en el html
function pintarCursos(lista,idContenidoDiv) {
    lista.forEach(resultado => {
        var texto =
    `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${resultado.fotoCurso}" alt="Card image cap" style="margin-top:2em;">
        <div class="card-body">
          <h5 class="card-title">${resultado.titulo}</h5>
          <hr>
          <p class="card-text" style="text-align:center";>${resultado.autor}</p>
          <p class="card-text" style='visibility:hidden; display:none;'>${resultado.id}</p>
          <p class="card-text">${resultado.lecciones}</p>
          <p class="card-text">${resultado.horas}</p>`;

          //Si el localStorage esta vacio entonces llamo con onclick a la funcion inscribirse para que puedas registrarte
          if(localStorage.getItem("usuario") != null){
            texto += `<button class="btnInscribirse" type="button" onclick="inscribirse(event)">Inscribirse</button>`;
          }
         
        texto += `</div>
        </div>`;

        document.getElementById(idContenidoDiv).innerHTML += texto;
    });
}


/*INSCRIBIRSE A LOS CURSOS*/
//Funcion que nos permite inscribirnos a las ofertas y comprueba en el sessionStarage que no este escrito 
function inscribirse(event) {

    var usuarioLogueado = localStorage.getItem("usuario").split(",")[0];

    var fotoCurso = event.target.parentNode.parentNode.getElementsByTagName("img")[0].getAttribute("src");
    var tituloCurso = event.target.parentNode.parentNode.getElementsByTagName("h5")[0].innerHTML;
    var autor = event.target.parentNode.parentNode.getElementsByTagName("p")[0].innerHTML;
    var lecciones = event.target.parentNode.parentNode.getElementsByTagName("p")[2].innerHTML;
    var horas = event.target.parentNode.parentNode.getElementsByTagName("p")[3].innerHTML;
    var id = event.target.parentNode.parentNode.getElementsByTagName("p")[1].innerHTML;


    var listaInscripciones = [];
    if (localStorage.getItem("inscripciones")) {
        listaInscripciones = JSON.parse(localStorage.getItem("inscripciones"));
    }

    if (!listaInscripciones.find(curso => curso.id == id && curso.usuario == usuarioLogueado)) { // no existe la inscripcion y no es de ese usuario
        listaInscripciones.push({ usuario: usuarioLogueado, foto: fotoCurso, titulo: tituloCurso, autor: autor,lecciones: lecciones, horas: horas, id: id });
        localStorage.setItem("inscripciones", JSON.stringify(listaInscripciones));
        alert("¡TE HAS INSCRITO AL CURSO!");
        //  exit();
    } else {
        alert("¡YA EXISTE EN TU LISTA DE INSCRIPCIONES!");
    }
}

//Funcion filtrar, donde en cada pagina de cada curso se puede filtrar en tiempo real por nombre del curso
function filtrar(indexLista,idContenido) {
    var valorInput = document.getElementById("filtrar").value.toUpperCase();

    var listaFiltrada = [];
    var listaCursosTexto = listaCursos[indexLista];
    console.log(listaCursosTexto)
   
    listaCursosTexto.forEach((curso) => {
            if (curso.titulo.toUpperCase().includes(valorInput)){
                listaFiltrada.push(curso);
            }
    });
    
    document.getElementById(idContenido).innerHTML = "";
    
    pintarCursos(listaFiltrada, idContenido);
}


//Funcion para filtrar por todas las categorias, igual que la anterior funcion pero solo funciona en el apartado "todasCategorias.html"
function filtrarTodasCategorias(idContenido) {
    var valorInput = document.getElementById("filtrar").value.toUpperCase();

    var listaFiltrada = [];
    var listaCursosTexto = Object.values(listaCursos);
    console.log(listaCursosTexto)
   

    listaCursosTexto.forEach((curso) => {
        curso.forEach(element =>{
            if (element.titulo.toUpperCase().includes(valorInput)){
                listaFiltrada.push(element);
            }
        })  
    });
    
    document.getElementById(idContenido).innerHTML = "";
    
    pintarCursos(listaFiltrada, idContenido);
}


//Funcion para ordenar la lista dependiendo que value se seleccione en el select
function ordenarLista(idContenido,indexLista) {
    document.getElementById(idContenido).innerHTML = ""; //Vaciamos primero la lista 
    var valueSelectOrdenar = document.getElementById("ordenarCursos").value;
    var listaCursosFiltrada = [];
    listaCursosFiltrada.push(listaCursos[indexLista]);

    if (valueSelectOrdenar == "nombre") {
        var ordenadaNombre = listaCursosFiltrada[0].sort(function ordenar(a, b) {
            listaOriginal = listaCursosFiltrada[0].concat();
            if (b.titulo < a.titulo) {
                return 1;
            } else if (b.titulo > a.titulo) {
                return -1;
            } else {
                0;
            }
        });
        pintarCursos(ordenadaNombre, idContenido);
    }

    if (valueSelectOrdenar == "horas") {
        var ordenadaHoras = listaCursosFiltrada[0].sort(function ordenar(a, b) {
            listaOriginal = listaCursosFiltrada[0].concat();
            if (b.horas > a.horas) {
                return 1;
            } else if (b.horas < a.horas) {
                return -1;
            } else {
                0;
            }
        });
        pintarCursos(ordenadaHoras, idContenido);
    }

    if (valueSelectOrdenar == "lecciones") {
        var ordenadaLecciones = listaCursosFiltrada[0].sort(function ordenar(a, b) {
            listaOriginal = listaCursosFiltrada[0].concat();
            if (b.lecciones > a.lecciones) {
                return 1;
            } else if (b.lecciones < a.lecciones) {
                return -1;
            } else {
                0;
            }
        });
        pintarCursos(ordenadaLecciones, idContenido);
    }

    if (valueSelectOrdenar == "listaOriginal") {
        listaOriginal = listaCursosFiltrada[0].concat();
        listaCursosFiltrada = listaOriginal.concat();
        cargarCursosFiltrados(idContenido);
        
    }
}


//Funcion en el que dependiendo el id del contenido lo muestro en un apartado distinto
function cargarCursosFiltrados(idContenido){
    if(idContenido == "contenidoCiberseguridad"){
        cargarCursosCiberseguridad();
    }else if(idContenido == "contenidoSoftware"){
        cargarCursosSoftware();
    }else if(idContenido == "contenidoVideojuegos"){
        cargarCursosVideojuegos();
    }
}

//Funcion para obtener la lista de Usuarios almacenados en el localStorage
function obtenerListaUsuarios(){
    var listaAlmacenada = localStorage.getItem("localListaUsuarios");
    if(listaAlmacenada == null) {
        listaUsuarios = [];
    } else {
        listaUsuarios = JSON.parse(listaAlmacenada);
    }
    return listaUsuarios;
}


