import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
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

let apoyos = [];

async function cargarApoyos() {
    const consulta = await getDocs(collection(db, "apoyos"));
    apoyos = [];

    consulta.forEach((doc) => {
        const data = doc.data();

        apoyos.push({
            nombre: data.nombre || "",
            mensaje: data.mensaje || "",
            fecha: data.fecha ? data.fecha.toDate().toLocaleString("es-MX") : ""
        });
    });

    mostrarApoyos(apoyos);
}

function mostrarApoyos(lista) {
    document.getElementById("total").innerText =
        "Total de apoyos: " + lista.length;

    let html = "";

    lista.forEach((apoyo) => {
        html += `
            <div style="background:white;margin:15px auto;padding:20px;border-radius:12px;box-shadow:0 5px 15px rgba(0,0,0,.12);max-width:800px;">
                <h3>${apoyo.nombre}</h3>
                <p>${apoyo.mensaje}</p>
                <small>${apoyo.fecha}</small>
            </div>
        `;
    });

    document.getElementById("tabla").innerHTML = html;
}

document.getElementById("buscar").addEventListener("input", function () {
    const texto = this.value.toLowerCase();

    const filtrados = apoyos.filter(a =>
        a.nombre.toLowerCase().includes(texto)
    );

    mostrarApoyos(filtrados);
});

document.getElementById("descargar").addEventListener("click", () => {
    let csv = "Nombre,Mensaje,Fecha\n";

    apoyos.forEach(a => {
        csv += `"${a.nombre}","${a.mensaje}","${a.fecha}"\n`;
    });

    const archivo = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "apoyos_iluminemos_estadio.csv";
    enlace.click();
});

cargarApoyos();