window.onload = function () {
    mostrarUsuarioLogueado(); //Lo obtenemos de funciones.js

    mostrarUsuariosRegistrados();
    comprobarUsuarioAdmin();
}


//Le pasamos el email del usuario para poder editar dicho usuario.
function editarUsuario(email) {
    var divCentral = document.getElementById("central");
    var listaUsuarios = JSON.parse(localStorage.getItem("localListaUsuarios"));
    var usuarioEditar = listaUsuarios.find(usuario => usuario.email == email);
    
    if (listaUsuarios != null) {
        var nuevoDiv = document.createElement("div");
        divCentral.appendChild(nuevoDiv);
        nuevoDiv.className = "cajaEdicion";
        nuevoDiv.innerHTML = `
        <form id="formEdicion">
                <table>
                    <tr>
                        <td class="nombreUser">Nombre de usuario</td>
                        <td><input type="text" id="nombreUsuarioForm" value="${usuarioEditar.nombreUsuario}"></td>
                    </tr>
                    <tr>
                        <td class="emailUser">Email</td>
                        <td><input type="text" disabled id="emailForm" value="${usuarioEditar.email}"></td>
                    </tr>
                    <tr>
                        <td class="claveUser">Clave</td>
                        <td><input type="password" id="claveForm" value="${usuarioEditar.clave}"></td>
                    </tr>
                </table>
                <button type="button" id="btn-editEmp">Editar</button>
                <button type="button" id="btn-cerrarEdit">Cerrar</button>
            </form>
        `;

        //Cuando se actica el evento del boton editar cogemos los datos nuevos introducidos para poder borrar lo que habia antes en el localStorage y volver
        // a escribirlo con el nuevo usuario, luego vaciamos la tabla y volvemos a cargarla con otra funcion para mostrarla con los nuevos usuarios
        document.getElementById("btn-editEmp").addEventListener("click", function(){
            usuarioEditar.nombreUsuario = document.getElementById("nombreUsuarioForm").value;
            usuarioEditar.email = document.getElementById("emailForm").value;
            usuarioEditar.clave = document.getElementById("claveForm").value;
            localStorage.removeItem("localListaUsuarios");
            localStorage.setItem("localListaUsuarios", JSON.stringify(listaUsuarios));

            document.getElementById("contenidoUsuarios").innerHTML = "";
            mostrarUsuariosRegistrados();
        });

    } else {
        alert("La lista de usuarios esta vacia");
    }
    //Cierra la ventana de editar el usuario
    document.getElementById("btn-cerrarEdit").addEventListener("click", function () {
        nuevoDiv.remove();
    });
}


//Le pasamos el email del usuario para poder eliminarlo porque el email es unico, no puede haber mas de un email registrado.
//Cogemos del localStorage con getItem la lista entera de usuarios y buscamos con find el que sea igual que el email introducido 
//y borramos de la lista y actualizamos la lista
function eliminarUsuario(email) {
    var listaUsuarios = JSON.parse(localStorage.getItem("localListaUsuarios"));
    if (listaUsuarios != null) {
        var usuarioEliminar = listaUsuarios.findIndex(usuario => { usuario.email == email });
        listaUsuarios.splice(usuarioEliminar, 1);
        localStorage.removeItem("localListaUsuarios");
        localStorage.setItem("localListaUsuarios", JSON.stringify(listaUsuarios));

    } else {
        alert("La lista de usuarios esta vacia");
    }
    document.getElementById("contenidoUsuarios").innerHTML = "";
    mostrarUsuariosRegistrados();
}

//Cogemos toda la lista de usuarios del localStorage, lo convertimos a un array porque estan como objetos y si esta lleno el local pinta una tabla 
//con los usuarios que hay dentro de la lista
function mostrarUsuariosRegistrados() {
    var usuarios = localStorage.getItem("localListaUsuarios");
    var listaUsuarios = JSON.parse(usuarios); //Convertido a un array

    var divContenidoUsuarios = document.getElementById("contenidoUsuarios");
    if (listaUsuarios != null) {
        listaUsuarios.forEach(usuarios => {
            if (usuarios.email == "admin@gmail.com") {
                var texto = `<tr>
            <td>${usuarios.nombreUsuario}</td>
            <td>${usuarios.email}</td>
            <td><button type='button' onclick="mostrarClave('${usuarios.email}')"><i class="fa-solid fa-eye"></i></button> <span id='claveMostrar_${usuarios.email}' class='d-none'>${usuarios.clave}</span></td>
            <td>NO SE PUEDE ELIMINAR</td>
            <td><button type='button' onclick='editarUsuario("${usuarios.email}")'><img id="editarUsuario" class="opcionesEmp" src="/images/editar.png" width='50px' height='50px'></img></button></td>
            </tr>`;
            } else {
                var texto = `<tr>
            <td>${usuarios.nombreUsuario}</td>
            <td>${usuarios.email}</td>
            <td><button type='button' onclick="mostrarClave('${usuarios.email}')"><i class="fa-solid fa-eye"></i></button> <span id='claveMostrar_${usuarios.email}' class='d-none'>${usuarios.clave}</span></td>
            <td><button type='button' onclick='eliminarUsuario("${usuarios.email}")'><img id="eliminarUsuario" class="opcionesEmp" src="/images/eliminar.png" width='50px' height='50px'></img></button></td>
            <td><button type='button' onclick='editarUsuario("${usuarios.email}")'><img id="editarUsuario" class="opcionesEmp" src="/images/editar.png" width='50px' height='50px'></img></button></td>
            </tr>`;
            }

            divContenidoUsuarios.innerHTML += texto;
        });
    }
}

//Funcion pasandole el email para mostrar la clave cuando pulsas la imagen (se llama a la funcion en el onclick de la funcion mostrarUsuariosRegistrados)
function mostrarClave(email){
    var claveMostrar = document.getElementById("claveMostrar_" + email) 
    claveMostrar.classList.toggle('d-none');
}


//Si no eres admin te manda al index, validacion que se tiene que hacer en el servidor
function comprobarUsuarioAdmin() {
    var usuarioLogueado = localStorage.getItem("usuario");
    
    if (usuarioLogueado != null) {
        var nombreUsuarioLogueado = localStorage.getItem("usuario").split(",");

        if (nombreUsuarioLogueado[1] != "admin@gmail.com") {
            location.href = '/index.html';
        }
    } else {
        location.href = "/index.html";
    }
    console.log(usuarioLogueado);
}
