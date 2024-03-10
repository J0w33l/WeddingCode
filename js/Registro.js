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
    var titleInterval = setInterval(function() {
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








function validateAndSubmit() {

   // Validate other form fields
   var nombre = document.getElementById('nombre').value;
   var email = document.getElementById('email').value;
   var asistencia = document.getElementById('asistencia').value.trim();
   var addtext = document.getElementById('addtext').value.trim();

   // Validate form fields
   if (!nombre || !email || !asistencia) {
       alert('Por favor, completa todos los campos.');
       return;
   }

   // Proceed with form submission or any other action
   enviarCorreo();

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

           Swal.fire({
            title: "Woof!",
            text: "Gracias por enviarnos tus datos!",
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
