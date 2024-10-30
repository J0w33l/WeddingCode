function showBTN() {
    console.log("Function showBTN() is executing...");
    var divhidden = document.getElementById('divhidden');
    var btnSiguiente = document.getElementById('btnSig');
    var btnEnviar = document.getElementById('btnEnviar');

    console.log("divhidden:", divhidden);
    console.log("btnSiguiente:", btnSiguiente);
    console.log("btnEnviar:", btnEnviar);

    // Mostrar el div y el botón de enviar
    divhidden.style.display = 'block';
    btnEnviar.style.display = 'block';

    // Ocultar el botón de siguiente
    btnSiguiente.style.display = 'none';

    Swal.fire({
        title: "Woof!",
        text: "Debes enviarnos una foto de tí, ya después verás el motivo! ",
        icon: "Aceptar",
        confirmButtonColor: '#28a745'
    });
    hideBTN();

}
function hideBTN() {

    // Change button title every second
    var seconds = 10;
    btnEnviar.innerText = "(" + seconds + ")";
    btnEnviar.disabled = true; // Disable the button initially
    var titleInterval = setInterval(function () {
        seconds--;
        if (seconds >= 0) {
            btnEnviar.innerText = "(" + seconds + ")";
        } else {
            clearInterval(titleInterval); // Stop updating title
            btnEnviar.disabled = false; // Enable the button
            btnEnviar.classList.add("fadeIn");
            btnEnviar.innerText = "Enviar";
        }
    }, 1000); // Update every second (1000 milliseconds)
}

// Validate and submit confirmation form
// Function to validate and submit confirmation form
function validateAndSubmit(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asistencia = document.getElementById('asistencia').value.trim();
    const addtext = document.getElementById('addtext').value.trim();
    let errorMessage = "";

    if (!nombre) errorMessage += "Nombre es obligatorio.<br>";
    if (!email) errorMessage += "Correo Electrónico es obligatorio.<br>";
    if (!asistencia) errorMessage += "Respuesta de asistencia es obligatoria.<br>";

    if (errorMessage) {
        document.getElementById('DivError').innerHTML = errorMessage;
        document.getElementById('DivError').style.display = 'block';
        return;
    } else {
        document.getElementById('DivError').style.display = 'none';
        
        if (asistencia === 'si') {
            enviarCorreo();       // Send email confirmation
            showUploadForm();     // Show upload form
        } else {
            enviarCorreoNo();     // Send "No" response email
        }
    }
}

function showUploadForm() {
    document.getElementById('confirmationForm').style.display = 'none'; // Hide confirmation form
    document.getElementById('uploadForm').style.display = 'block';       // Show upload form
}

function enviarCorreo() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        asistencia: document.getElementById('asistencia').value,
        addtext: document.getElementById('addtext').value || "No hay mensajes adicionales"
    };

    emailjs.send("service_knqbvpb", "template_qiax1ao", datos)
        .then(response => {
            console.log("Correo enviado:", response);
            Swal.fire("Gracias", "¡Gracias por confirmarnos tu asistencia!", "success");
        })
        .catch(error => {
            console.error("Error al enviar el correo:", error);
            Swal.fire("Error", "Error al enviar los datos. Por favor, intenta nuevamente.", "error");
        });
}

function enviarCorreoNo() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        asistencia: "No, no asistiré",
        addtext: document.getElementById('addtext').value || "No hay mensajes adicionales"
    };

    emailjs.send("service_knqbvpb", "template_qiax1ao", datos)
        .then(response => {
            console.log("Correo enviado:", response);
            Swal.fire("Gracias", "Entendemos y te agradecemos la respuesta", "success");
        })
        .catch(error => {
            console.error("Error al enviar el correo:", error);
            Swal.fire("Error", "Error al enviar los datos. Por favor, intenta nuevamente.", "error");
        });
}

function subirImagen(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('uploadForm'));

    fetch('upload.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.ok ? response.text() : Promise.reject("Error en el servidor"))
        .then(() => {
            document.getElementById('mensaje').innerText = "Imagen subida con éxito.";
            document.getElementById('mensaje').style.color = "green";
            Swal.fire("Éxito", "Imagen subida con éxito", "success");
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje').innerText = "Error al subir la imagen.";
            document.getElementById('mensaje').style.color = "red";
        });
}