window.onload = function(){
    document.getElementById("enviarContacto").addEventListener("click", enviarContacto);

    mostrarUsuarioLogueado(); //Se obtiene del archico funciones.js

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
}


//Funcion donde se valida la funcion y manda un email con la funcion mail
function enviarContacto(event){
    event.preventDefault();

    var nombre = document.getElementById("nombreUsuario").value;
    var apellidos = document.getElementById("apellidosUsuario").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("message").value;

    nombreRegex = /^[a-záéíóúÁÉÍÓÚñÑ ,.'-]+$/i;
    apellidosRegex = /^[a-záéíóúÁÉÍÓÚñÑ ,.'-]+$/i;
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    var enlaceMandarMail = document.querySelector("#enlaceMandarMail");

    if(nombreRegex.test(nombre)) {
        if(apellidosRegex.test(apellidos)) {
            if(emailRegex.test(email)) {
                var DatosFormulario = (new DatosContacto(nombre,apellidos,email,mensaje));
                enlaceMandarMail.setAttribute('href',`mailto:contacto_hack4u@gmail.com?subject=Nombre: ${DatosFormulario['nombre']}, Apellidos: ${DatosFormulario['apellidos']}, Email: ${DatosFormulario['email']}&body=${DatosFormulario['mensaje']}`);
                enlaceMandarMail.click();  
            } else {
                alert("El mail introducido no tiene un formato correcto");
            }
        } else {
            alert("Los apellidos introducidos no tienen un formato válido");
        }
    } else {
        alert("El nombre introducido no tiene un formato válido")
    }
}