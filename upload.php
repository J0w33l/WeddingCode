<?php
// Specify the directory where images will be stored
$target_dir = "uploads/";

// Ensure the uploads directory exists, or create it
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0755, true);
}

// Handle the file upload
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $responseMessage = '';

    // Allowed file types
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    // Check if the uploaded file is an actual image
    $fileType = mime_content_type($_FILES["image"]["tmp_name"]);
    if (in_array($fileType, $allowedTypes) && in_array($imageFileType, $allowedExtensions)) {
        $uploadOk = 1;
    } else {
        $responseMessage = "Invalid file type. Only images (JPG, PNG, GIF, WEBP) are allowed.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        $responseMessage = "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size (5MB max)
    if ($_FILES["image"]["size"] > 5000000) {
        $responseMessage = "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Upload the file if all checks pass
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $responseMessage = "The file " . htmlspecialchars(basename($_FILES["image"]["name"])) . " has been uploaded.";
        } else {
            $responseMessage = "Sorry, there was an error uploading your file.";
        }
    }

    // Return response message
    echo $responseMessage;
}
?>
