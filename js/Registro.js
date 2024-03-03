function showBTN(){
    var divhidden = document.getElementById('divhidden');
    var btnSiguiente = document.getElementById('btnSig');
    var btnEnviar = document.getElementById('btnEnviar');
    
    // Mostrar el div y el botón de enviar
    divhidden.style.display = 'block';
    btnEnviar.style.display = 'block';
    
    // Ocultar el botón de siguiente
    btnSiguiente.style.display = 'none';

    Swal.fire({
        title: "Woof!",
        text: "Debes enviarnos una foto de ti! Ya despues verás el porque!",
        icon: "Aceptar",
        confirmButtonColor: '#28a745'
      });
}



function validateAndSubmit() {
/*    // Check if a file is uploaded
   var uploader = document.querySelector('lr-file-uploader-minimal[ctx-name="my-uploader"]');
   var uploadedFiles = uploader.files;

   if (!uploadedFiles || uploadedFiles.length === 0) {
       alert('Por favor, carga una imagen.');
       return;
   } */

   // Validate other form fields
   var nombre = document.getElementById('nombre').value;
   var email = document.getElementById('email').value;
   var transporte = document.getElementById('transporte').value.trim();
   var direccion = document.getElementById('direccion').value;
   var asistencia = document.getElementById('asistencia').value.trim();
   var addtext = document.getElementById('addtext').value.trim();

   // Validate form fields
   if (!nombre || !email || !transporte || !direccion || !asistencia || !addtext) {
       alert('Por favor, completa todos los campos.');
       return;
   }

   // Proceed with form submission or any other action
   enviarCorreo();
}

function enviarCorreo() {
   // Obtener datos del formulario
   var nombre = document.getElementById('nombre').value;
   var email = document.getElementById('email').value;
   var transporte = document.getElementById('transporte').value.trim();
   var direccion = document.getElementById('direccion').value;
   var asistencia = document.getElementById('asistencia').value.trim();
   var addtext = document.getElementById('addtext').value.trim();

   // Crear el objeto de datos
   var datos = {
       nombre: nombre,
       email: email,
       transporte: transporte,
       direccion: direccion,
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
            icon: "Woof!",
            confirmButtonColor: '#28a745'
          });
           // Puedes redirigir a una página de éxito o mostrar un mensaje aquí
       }, function (error) {
           console.error("Error al enviar el correo:", error);
           alert("Error al enviar el correo")
           // Manejar errores aquí
       });
}
