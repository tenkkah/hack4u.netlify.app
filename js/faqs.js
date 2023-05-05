window.onload = function(){
    cargarPreguntasFrecuentes();
    mostrarUsuarioLogueado();

    document.getElementById("linkFacebook").addEventListener("click",mostrarFacebook);
    document.getElementById("linkTwitter").addEventListener("click",mostrarTwitter);
    document.getElementById("linkGoogle").addEventListener("click",mostrarGoogle);
    document.getElementById("linkInstagram").addEventListener("click",mostrarInstagram);
}

var listaPreguntas = [];


//Cojo los datos del json y llamo a la funcion de pintar para mostrar por pantalla los datos
function cargarPreguntasFrecuentes(){
    $.get("../js/faqs.json",{},(resultado) =>{
        listaPreguntas = resultado;
        pintarPreguntasFrecuentes(resultado.preguntas_frecuentes);
    });
}


//Le pasamos la lista vacia donde vamos a añadir los datos que sacaremos a partir de el faqs.json
function pintarPreguntasFrecuentes(lista){
    lista.forEach(preguntas =>{
        var texto = 
        `<h5 style='color:#F82668; margin-left:4em; margin-right:4em;'>${preguntas.pregunta}</h5> 
         <p style='color:white; margin-left:4em; margin-right:4em;'>${preguntas.respuesta}</p><br>`;

        document.getElementById("contenidoPreguntas").innerHTML += texto;
    });
}