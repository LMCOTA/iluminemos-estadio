import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBWTMyjr9_-Tj2B49vPf17-5XfBzSNyres",
    authDomain: "iluminemos-el-estadio.firebaseapp.com",
    projectId: "iluminemos-el-estadio",
    storageBucket: "iluminemos-el-estadio.firebasestorage.app",
    messagingSenderId: "800697560425",
    appId: "1:800697560425:web:bfc71edd4d597811eca1f8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const formulario = document.querySelector(".formulario");
const contador = document.getElementById("numeroApoyos");

onSnapshot(collection(db, "apoyos"), (snapshot) => {
    contador.innerText = snapshot.size;
});

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    const boton = formulario.querySelector("button");

    boton.disabled = true;
    boton.innerText = "Enviando...";

    const nombre = formulario.querySelector("input[name='nombre']").value.trim();
    const mensaje = formulario.querySelector("textarea[name='mensaje']").value.trim();

    const consulta = query(
        collection(db, "apoyos"),
        where("nombre_normalizado", "==", nombre.toLowerCase())
    );

    const resultado = await getDocs(consulta);

    if(!resultado.empty){

        alert("Ese nombre ya registró su apoyo.");

        boton.disabled = false;
        boton.innerText = "REGISTRAR MI APOYO";

        return;
    }

    await addDoc(collection(db, "apoyos"), {
        nombre: nombre,
        nombre_normalizado: nombre.toLowerCase(),
        mensaje: mensaje,
        fecha: serverTimestamp()
    });

    formulario.reset();

    document.getElementById("mensajeExito").style.display = "flex";

    boton.disabled = false;
    boton.innerText = "REGISTRAR MI APOYO";

});

function cerrarMensaje(){
    document.getElementById("mensajeExito").style.display = "none";
}

window.cerrarMensaje = cerrarMensaje;