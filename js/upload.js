let CLIENT_ID = '223473516619-peolc10plkat68ass40rhjhg0o2k6vhp.apps.googleusercontent.com';
let SCOPES = 'https://www.googleapis.com/auth/drive.file';

function loadGoogleClient() {
    if (typeof gapi !== 'undefined') {
        gapi.load("client:auth2", initClient);
    } else {
        console.error("Google API script not loaded properly.");
    }
}

function initClient() {
    gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        console.log("Google API client initialized.");
    }).catch(error => {
        console.error("Error initializing Google API client:", error);
    });
}

function authenticateAndUpload() {
    if (typeof gapi === 'undefined') {
        console.error("Google API client not loaded.");
        return;
    }
    
    gapi.auth2.getAuthInstance().signIn().then(uploadFile).catch(error => {
        console.error("Error during authentication:", error);
    });
}

function uploadFile() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (file) {
        let metadata = {
            name: file.name,
            mimeType: file.type
        };
        let form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", file);

        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: new Headers({ Authorization: "Bearer " + gapi.auth.getToken().access_token }),
            body: form
        })
        .then(response => response.json())
        .then(data => {
            console.log("File uploaded successfully:", data);
            document.getElementById('status').innerText = "¡Archivo subido con éxito!";
        })
        .catch(error => {
            console.error("Error uploading file:", error);
            document.getElementById('status').innerText = "Error al subir el archivo.";
        });
    } else {
        alert("Selecciona un archivo para subir.");
    }
}

// Ensure Google API is loaded before initializing the client
document.addEventListener("DOMContentLoaded", loadGoogleClient);
