document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const messageInput = document.getElementById('messageInput');
    const responseMessage = document.getElementById('responseMessage');

    // Simulate sending the message
    setTimeout(() => {
        messageInput.value = ''; // Clear the textarea
        responseMessage.classList.remove('hidden'); // Show the response message
    }, 500);
});