const URL = "https://script.google.com/macros/s/AKfycbzQ7hPok0iViTZK5ddHfrgwotYsmQQNc9fIyx3Gk0ybfM7n_SAUu1a1cA_WyYt9kUH2vw/exec";

const formulario = document.querySelector(".formulario");
const contador = document.getElementById("numeroApoyos");

let apoyos = Number(contador.innerText) || 0;

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    const boton = formulario.querySelector("button");

    boton.disabled = true;
    boton.innerText = "Enviando...";

    const nombre = formulario.querySelector("input[type=text]").value.trim();
    const mensaje = formulario.querySelector("textarea").value.trim();

    try{

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("mensaje", mensaje);

        const respuesta = await fetch(URL,{
            method:"POST",
            body:formData
        });

        const data = await respuesta.json();

        if(data.resultado === "duplicado"){

            alert("⚠️ Ese nombre ya registró su apoyo.");

        }else{

            apoyos++;
            contador.innerText = apoyos;

            const faltan = document.getElementById("faltanApoyos");

            if(faltan){
                faltan.innerText =
                "Faltan " + (1000-apoyos) + " apoyos para alcanzar la meta.";
            }

            formulario.reset();

            document.getElementById("mensajeExito").style.display = "flex";
        }

    }catch(error){

        console.error(error);
        alert("Error al conectar con el servidor.");

    }

    boton.disabled = false;
    boton.innerText = "✅ REGISTRAR MI APOYO";

});

function cerrarMensaje(){

    document.getElementById("mensajeExito").style.display = "none";

}