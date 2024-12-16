<script>
    // Handle Message Form Submission
    document.getElementById('messageForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const responseMessage = document.getElementById('responseMessage');
        const sendButton = document.getElementById('sendButton');

        if (messageInput.value.trim() === '') {
            alert('Message cannot be empty.');
            return;
        }

        sendButton.disabled = true; // Disable button to prevent multiple submissions

        try {
            const response = await fetch('http://localhost:3000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageInput.value })
            });

            if (response.ok) {
                messageInput.value = '';
                responseMessage.classList.remove('hidden');
                responseMessage.textContent = 'Your message has been sent anonymously!';
            } else {
                throw new Error('Failed to send the message.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message. Please try again.');
        } finally {
            sendButton.disabled = false; // Re-enable the button
        }
    });

    // Handle Admin Login Form Submission
    document.getElementById('adminLoginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const adminPassword = document.getElementById('adminPassword').value;

        try {
            const response = await fetch('http://localhost:3000/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: adminPassword })
            });

            if (response.ok) {
                const data = await response.json();
                const messageStorage = document.getElementById('messageStorage');
                const storedMessages = document.getElementById('storedMessages');
                storedMessages.innerHTML = data.messages.map(msg => `<li>${msg}</li>`).join('');
                messageStorage.classList.remove('hidden');
                document.getElementById('adminLoginForm').classList.add('hidden');
            } else {
                alert('Invalid password.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    });

    // Handle Admin Logout
    document.getElementById('logoutButton').addEventListener('click', function() {
        document.getElementById('messageStorage').classList.add('hidden');
        document.getElementById('adminLoginForm').classList.remove('hidden');
        document.getElementById('adminPassword').value = '';
    });
</script>
