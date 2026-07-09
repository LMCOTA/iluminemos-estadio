const formulario = document.querySelector(".formulario");
const contador = document.getElementById("numeroApoyos");

let apoyos = Number(contador.innerText) || 0;

formulario.addEventListener("submit", function(){

    const boton = formulario.querySelector("button");

    boton.disabled = true;
    boton.innerText = "Enviando...";

    setTimeout(function(){

        apoyos++;

        contador.innerText = apoyos;

        formulario.reset();

        document.getElementById("mensajeExito").style.display = "flex";

        boton.disabled = false;

        boton.innerText = "✅ REGISTRAR MI APOYO";

    },1000);

});

function cerrarMensaje(){

    document.getElementById("mensajeExito").style.display="none";

}