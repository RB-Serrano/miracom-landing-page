<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $phone = $_POST['phone'];
    $product = $_POST['product'];
    $message = $_POST['message'];

    $to = "ralphbernard.serrano@outsourceddoers.com"; // Replace with your email
    $subject = "New Booking Request from $name";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Company: $company\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Product: $product\n";
    $email_content .= "Message: $message\n";

    $headers = "From: $email";

    mail($to, $subject, $email_content, $headers);
    
    // Redirect to thank you page
    header("Location: thank-you.html");
    exit();
}
?>
