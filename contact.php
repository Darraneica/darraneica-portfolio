<?php

// configure
$from = 'Demo contact form <demo@domain.com>';
$sendTo = 'Demo contact form <email@gmail.com>'; // Corrected email
$subject = 'New message from contact form';
$fields = array('name' => 'Name', 'subject' => 'Subject', 'email' => 'Email', 'message' => 'Message'); // field names
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';
$errorMessage = 'There was an error while submitting the form. Please try again later';

// sending the email
try {
    // Validate and prepare the email text
    $emailText = "You have a new message from the contact form\n=============================\n";

    foreach ($fields as $key => $label) {
        if (empty($_POST[$key])) {
            throw new Exception("$label is required.");
        }
        $value = $_POST[$key];
        if ($key === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email format.');
        }
        $emailText .= "$label: $value\n";
    }

    $headers = array(
        'Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );

    if (!mail($sendTo, $subject, $emailText, implode("\n", $headers))) {
        throw new Exception('Mail could not be sent.');
    }

    $responseArray = array('type' => 'success', 'message' => $okMessage);
} catch (Exception $e) {
    $responseArray = array('type' => 'danger', 'message' => $errorMessage . ' ' . $e->getMessage());
    error_log($e->getMessage()); // Log error details
}

// Return JSON response for AJAX request
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($responseArray);
} else {
    echo $responseArray['message'];
}
