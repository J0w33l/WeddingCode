(function() {
    emailjs.init("hrVpVstDkIbKFqWzB");
})();

function enviarCorreo() {
    // Read uploaded image
    var fileInput = document.getElementById('my_file');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var imageData = event.target.result;

        // Configurar el servicio y plantilla de Email.js
        var serviceID = "service_knqbvpb";
        var templateID = "template_qiax1ao";

        // Attachments object
        var attachments = {
            "image.png": {
                content: imageData,
                type: "image/png",
                name: "image.png",
                inline: true
            }
        };

        // Send email with EmailJS
        emailjs.send(serviceID, templateID, {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            transporte: document.getElementById('transporte').value,
            direccion: document.getElementById('direccion').value,
            asistencia: document.getElementById('asistencia').value,
            addtext: document.getElementById('addtext').value,
        }, attachments).then(function(response) {
            alert('Correo enviado exitosamente!');
        }, function(error) {
            alert('Error al enviar el correo: ' + JSON.stringify(error));
        });
    };
    reader.readAsDataURL(file);
}
