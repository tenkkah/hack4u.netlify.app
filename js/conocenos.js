window.onload = function(){
    cargarPreguntas();
    mostrarUsuarioLogueado();

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
}

var listaPreguntas = [];

function cargarPreguntas(){
    $.get("../js/conocenos.json",{},(resultado) =>{
        listaPreguntas = resultado;
        pintarPreguntas(resultado.conocenos);
    });
}

function pintarPreguntas(lista){
    lista.forEach(preguntas =>{
        var pregunta = `<h5 style='color:#F82668; margin-left:4em; margin-right:4em;'>${preguntas.pregunta}</h5> 
        <p style='color:white; margin-left:4em; margin-right:4em;'>${preguntas.respuesta}</p><br>`;

        document.getElementById("conocenos").innerHTML += pregunta;
    });
}