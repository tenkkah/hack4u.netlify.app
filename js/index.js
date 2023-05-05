window.onload = function(){
    document.getElementById("btnContacto").addEventListener("click", mostrarContacto);
    cargarEmpleados();
    mostrarUsuarioLogueado(); 
    

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
    
}

var listaEmpleados = [];

//Funcion para cargar los empleados a traves del JSON 'empleados.json', seguidamente llamamos a la funcion de pintarEmpleados
function cargarEmpleados(){
    $.get("./js/empleados.json",{},(resultado) => {
        listaEmpleados = resultado;
        pintarEmpleados(resultado.empleados);
    });
}

//Function que nos pinta los empleados que tenemos en el JSON pasandole la lista obtenida en la function 'cargarEmpleados'
function pintarEmpleados(lista){
    lista.forEach(element => {
        var texto =
        `<tr>
            <th scope="row">#${element.cod_empleado}</th>
            <td><img src=${element.foto} class="img-fluid avatar" alt="slide1"></td>
            <td>${element.nombreyapellidos}</td>
            <td>${element.cargo}</td>
       </tr>`; 

       document.getElementById("contenidoEmpleados").innerHTML += texto;
    });
}


function mostrarContacto(){
    window.open("../html/contacto.html", "_blank");
}
