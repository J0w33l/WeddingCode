let CLIENT_ID = '223473516619-peolc10plkat68ass40rhjhg0o2k6vhp.apps.googleusercontent.com';
let API_KEY = ''; // API Key is not required for this simple upload example
let SCOPES = 'https://www.googleapis.com/auth/drive.file';

function authenticateAndUpload() {
    // Load the Google API client and initialize OAuth2
    gapi.load("client:auth2", () => {
        gapi.auth2.init({ client_id: CLIENT_ID }).then(() => {
            gapi.auth2.getAuthInstance().signIn().then(uploadFile);
        });
    });
}

function uploadFile() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    if (file) {
        let metadata = {
            name: file.name,
            mimeType: file.type,
        };
        let form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", file);

        // Send the file to Google Drive
        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: new Headers({ Authorization: "Bearer " + gapi.auth.getToken().access_token }),
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('status').innerText = "¡Archivo subido con éxito!";
            console.log("Uploaded file info:", data);
        })
        .catch(error => {
            console.error("Error subiendo archivo:", error);
            document.getElementById('status').innerText = "Error al subir el archivo.";
        });
    } else {
        alert("Selecciona un archivo para subir.");
    }
}
