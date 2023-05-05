window.onload = function()  {
    document.getElementById("btnRegistrar").addEventListener("click", registrarUsuario);

    obtenerListaUsuarios();
}



/*REGISTRO DEL USUARIO*/
//Funcion para registrar y validar usuario usando la funcion de localStorage para registrar usuarios
function registrarUsuario(){
    var vNombreUsuario = document.getElementById("nombreUsuario").value;
    var vEmail = document.getElementById("email").value;
    var vClave = document.getElementById("clave").value;
    var vClaveConfirmacion = document.getElementById("claveConfirmacion").value;

    nombreUsuarioRegex = /^[a-zA-Z]+$/;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    claveRegex = /[1-9][a-zA-Z]{8,}/; //La clave debe ser minimo de 8 caracteres



    var listUsers = obtenerListaUsuarios();

    //Vamos a buscar la posicion del nombre de usuario o del email y validar si los datos introducidos son validos
    //si se valida correctamente llamaremos a la funcion que tenemos para añadirla en el localStorage
    if(listUsers.findIndex(usuario => usuario.nombreUsuario == vNombreUsuario || usuario.email == vEmail)){
        if(nombreUsuarioRegex.test(vNombreUsuario)){
            if(emailRegex.test(vEmail)){
                if(vClave != "" || vClaveConfirmacion != "") {
                    if(vClave === vClaveConfirmacion) {
                        registrarUsuarioEnSistema(vNombreUsuario,vEmail,vClave);
                        alert("Usuario registrado con éxito en el sistema, ahora vaya a loguearse");
                        document.getElementById("nombreUsuario").style.border = "2px solid green";
                        document.getElementById("email").style.border = "2px solid green";
                        document.getElementById("clave").style.border = "2px solid green";
                        document.getElementById("claveConfirmacion").style.border = "2px solid green";
                        location.href = "/html/login.html";
                    } else {
                        alert("No se pudo registrar usuario porque las contraseñas no coinciden");
                        document.getElementById("clave").style.border = "2px solid red";
                        document.getElementById("claveConfirmacion").style.border = "2px solid red";
                        $("#formRegistro")[0].reset();
                    }
                } else {
                    alert("El campo clave no debe estar vacío, escriba alguna clave");
                    document.getElementById("clave").style.border = "2px solid red";
                    document.getElementById("claveConfirmacion").style.border = "2px solid red";
                }
            }else{
                alert("El email introducido no es valido");
                document.getElementById("email").style.border = "2px solid red";
                $("#formRegistro")[0].reset();
            }
        }else{
            alert("El nombre de usuario no es válido");
            document.getElementById("nombreUsuario").style.border = "2px solid red";
            $("#formRegistro")[0].reset();
        }
    }else{
        alert("NOMBRE USUARIO y/o EMAIL ya existen, pruebe con otros");
        document.getElementById("nombreUsuario").style.bordder = "2px solid red";
        document.getElementById("email").style.bordder = "2px solid red";
        $("#formRegistro")[0].reset();
    }
}


//Array donde guardaremos los datos de los usuarios registrados
var listaUsuarios = [];

//Registro usuario admin/root por defecto si listaUsuarios esta vacia
if(localStorage.getItem("localListaUsuarios") == null){
    registrarUsuarioEnSistema("admin","admin@gmail.com","admin1234");
}

//Registramo usuarios con LocalStorage y actualizamos la lista del localStorage
function registrarUsuarioEnSistema(username, mail, password){
    listaUsuarios.push(new Usuario(username,mail,password));
    localStorageListaUsuarios(listaUsuarios);
}

//Funcion para almacenar la lista de Usuarios en localStorage
function localStorageListaUsuarios(lista){
    localStorage.setItem("localListaUsuarios", JSON.stringify(lista));
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


