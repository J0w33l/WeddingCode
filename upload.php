<?php

$target_dir = "uploads/";

if (!is_dir($target_dir)) {
    mkdir($target_dir, 0755, true);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $responseMessage = '';

 
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    $fileType = mime_content_type($_FILES["image"]["tmp_name"]);
    if (in_array($fileType, $allowedTypes) && in_array($imageFileType, $allowedExtensions)) {
        $uploadOk = 1;
    } else {
        $responseMessage = "Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF, WEBP).";
        $uploadOk = 0;
    }


    if (file_exists($target_file)) {
        $responseMessage = "Lo siento, el archivo ya existe.";
        $uploadOk = 0;
    }


    if ($_FILES["image"]["size"] > 5000000) {
        $responseMessage = "Lo siento, el archivo es demasiado grande (máximo 5MB).";
        $uploadOk = 0;
    }


    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $responseMessage = "El archivo " . htmlspecialchars(basename($_FILES["image"]["name"])) . " ha sido subido exitosamente.";
        } else {
            $responseMessage = "Lo siento, hubo un error al subir tu archivo.";
        }
    }


    echo $responseMessage;
}
?>
