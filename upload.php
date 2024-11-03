<?php

$target_dir = "uploads/";

// Create the uploads directory if it doesn't exist
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $filename = pathinfo($_FILES["image"]["name"], PATHINFO_FILENAME); // Get the file name without extension
    $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION)); // Get the file extension
    $target_file = $target_dir . $filename . '.' . $imageFileType;
    $uploadOk = 1;
    $responseMessage = '';

    // Allowed file types and extensions
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    // Check the MIME type and extension
    $fileType = mime_content_type($_FILES["image"]["tmp_name"]);
    if (in_array($fileType, $allowedTypes) && in_array($imageFileType, $allowedExtensions)) {
        $uploadOk = 1;
    } else {
        $responseMessage = "Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF, WEBP).";
        $uploadOk = 0;
    }

    // Check if the file already exists and add a suffix if necessary
    $counter = 1;
    while (file_exists($target_file)) {
        $target_file = $target_dir . $filename . "($counter)." . $imageFileType;
        $counter++;
    }

    // Check file size (5MB maximum)
    if ($_FILES["image"]["size"] > 5000000) {
        $responseMessage = "Lo siento, el archivo es demasiado grande (máximo 5MB).";
        $uploadOk = 0;
    }

    // Attempt to upload the file if all checks pass
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $responseMessage = "El archivo " . htmlspecialchars(basename($target_file)) . " ha sido subido exitosamente.";
        } else {
            $responseMessage = "Lo siento, hubo un error al subir tu archivo.";
        }
    }

    // Return the response message
    echo $responseMessage;
}
?>