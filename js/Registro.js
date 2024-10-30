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

function validateAndSubmit(event) {
    event.preventDefault();

    // Obtener y validar los campos del formulario
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var asistencia = document.getElementById('asistencia').value.trim();
    var addtext = document.getElementById('addtext').value.trim();

    // Inicializar variable de error
    var errorMessage = "";

    // Verificar qué campo está vacío y construir el mensaje de error
    if (!nombre) {
        errorMessage += "¡Woof! te falto darnos tu Nombre es obligatorio.<br>";
    }
    if (!email) {
        errorMessage += "¡Woof! te falto darnos tu Correo Electrónico es obligatorio.<br>";
    }
    if (!asistencia) {
        errorMessage += "¡Woof! te falto darnos tu Respuesta de asistencia es obligatorio.<br>";
    }

    // Mostrar el mensaje de error si hay campos vacíos
    if (errorMessage) {
        document.getElementById('DivError').innerHTML = errorMessage;
        document.getElementById('DivError').style.display = 'block';
        return;
    } else {
        document.getElementById('DivError').style.display = 'none';
        const asistencia = document.getElementById('asistencia').value;

        if (asistencia === 'si') {
            document.getElementById('confirmationForm').style.display = 'none'; // Hide confirmation form
            document.getElementById('uploadContainer').style.display = 'block'; // Show upload form
        } else {
            document.getElementById('DivError').style.display = 'block';
            enviarCorreoNo();
        }
    }

    // Proceder con el envío del formulario o cualquier otra acción
    enviarCorreo();

    // Limpiar los campos del formulario después de enviar
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('asistencia').value = '';
    document.getElementById('addtext').value = '';
}

function enviarCorreo() {
    // Obtener datos del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var asistencia = document.getElementById('asistencia').value.trim();
    var addtext = document.getElementById('addtext').value.trim();

    // Validate if addtext is empty
    if (addtext === '') {
        addtext = "No hay mensajes adicionales";
    }

    // Crear el objeto de datos
    var datos = {
        nombre: nombre,
        email: email,
        asistencia: asistencia,
        addtext: addtext
    };

    // Configurar el servicio y plantilla de Email.js
    var serviceID = "service_knqbvpb";
    var templateID = "template_qiax1ao";

    // Enviar el correo usando Email.js
    emailjs.send(serviceID, templateID, datos)
        .then(function (response) {
            console.log("Correo enviado:", response);

            /*           Swal.fire({
                       title: "Woof!",
                       text: "Gracias por enviarnos tus datos!",
                       icon: "success",
                       confirmButtonColor: '#28a745'
                     }); */

            // Puedes redirigir a una página de éxito o mostrar un mensaje aquí
        }, function (error) {
            console.error("Error al enviar el correo:", error);
            Swal.fire({
                title: "Woof!",
                text: "Error al enviar los datos, vuelve a intentarlo!",
                icon: "Error",
                confirmButtonColor: '#28a745'
            });
        });
}

function enviarCorreoNo() {
    // Obtener datos del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var asistencia = document.getElementById('asistencia').value.trim();
    var addtext = document.getElementById('addtext').value.trim();

    // Validate if addtext is empty
    if (addtext === '') {
        addtext = "No hay mensajes adicionales";
    }

    // Crear el objeto de datos
    var datos = {
        nombre: nombre,
        email: email,
        asistencia: asistencia,
        addtext: addtext
    };

    // Configurar el servicio y plantilla de Email.js
    var serviceID = "service_knqbvpb";
    var templateID = "template_qiax1ao";

    // Enviar el correo usando Email.js
    emailjs.send(serviceID, templateID, datos)
        .then(function (response) {
            console.log("Correo enviado:", response);

            Swal.fire({
                title: "Woof!",
                text: "Entendemos y te agradecemos la respuesta!",
                icon: "success",
                confirmButtonColor: '#28a745'
            });

            // Puedes redirigir a una página de éxito o mostrar un mensaje aquí
        }, function (error) {
            console.error("Error al enviar el correo:", error);
            Swal.fire({
                title: "Woof!",
                text: "Error al enviar los datos, vuelve a intentarlo!",
                icon: "Error",
                confirmButtonColor: '#28a745'
            });
        });
}
