// Initialize EmailJS with your User ID
(function(){
    emailjs.init("j9jqzw426E0GZ96DA"); // Replace with your actual EmailJS User ID
})();

// Add event listener for form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Send email using EmailJS
    emailjs.sendForm('service_j6knsgm', 'template_oqs1buo', this)
        .then(function() {
            alert('Email sent successfully!');
            document.getElementById('contact-form').reset(); // Reset the form
        }, function(error) {
            alert('Failed to send email. Error: ' + JSON.stringify(error));
        });
});
