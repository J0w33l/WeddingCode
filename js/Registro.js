function enviarCorreo() {
    // Obtener datos del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var transporte = document.getElementById('transporte').value;
    var direccion = document.getElementById('direccion').value;
    var asistencia = document.getElementById('asistencia').value;
    var my_file = document.getElementById('my_file').files[0];

 
 
    // Crear el objeto de datos
    var datos = {
       nombre: nombre,
       email: email,
       transporte: transporte,
       direccion: direccion,
       asistencia: asistencia,
       my_file: my_file
    };

    alert("correo enviado");
 
    // Configurar el servicio y plantilla de Email.js
    var serviceID = "service_knqbvpb";
    var templateID = "template_qiax1ao";
 
    // Enviar el correo usando Email.js
    emailjs.send(serviceID, templateID, datos)
       .then(function(response) {
          console.log("Correo enviado:", response);
          // Puedes redirigir a una página de éxito o mostrar un mensaje aquí
       }, function(error) {
          console.error("Error al enviar el correo:", error);
          // Manejar errores aquí
       });
}