window.onload = function(){
    document.getElementById("btnLogin").addEventListener("click", loguearUsuario);
}

/*LOGIN DE USUARIO*/
//Funcion para registrar y validar usuario usando la funcion de localStorage para registrar usuarios
function loguearUsuario(){
    var vNombreUsuario = document.getElementById("nombreUsuario").value.toLowerCase();
    var vEmail = document.getElementById("email").value;
    var vClave = document.getElementById("clave").value;
    

    var listUsers = obtenerListaUsuarios();

    if(listUsers.findIndex(usuario => usuario.nombreUsuario == vNombreUsuario && usuario.email == vEmail && usuario.clave == vClave) == -1){
        alert("NOMBRE USUARIO/EMAIL/CLAVE no existe o son erroneos, debe registrarse");
        document.getElementById("nombreUsuario").style.border = "2px solid red";
        document.getElementById("email").style.border = "2px solid red";
        document.getElementById("clave").style.border = "2px solid red";
    }else{
        alert("LOGUEADO CON EXITO");
        localStorage.setItem("usuario", vNombreUsuario+","+vEmail+","+vClave);
        location.href = "../index.html";
    }
}

//Array donde guardaremos los datos de los usuarios registrados 
var listaUsuarios = [];

//Si localStorage de listaUsuarios es nulo cargamos el usuario Admin por defecto
if(localStorage.getItem("localListaUsuarios") == null){
    listaUsuarios.push(new Usuario("admin","admin@gmail.com","admin1234"));
    localStorage.setItem("localListaUsuarios", JSON.stringify(listaUsuarios));
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

