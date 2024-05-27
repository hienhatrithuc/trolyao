const ACCESS_TOKEN = 'pat_4RRRsN1HkKSj3ciVTrqzzO8BRltdaeFlMQCA8cFqt2HYMMZ3q0DbhyxIYmqe6Zzm';
const BOT_ID = '7348640557197246482';

async function sendMessage(message) {
    try {
        const response = await fetch('https://api.coze.com/open_api/v2/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bot_id: BOT_ID,
                query: message,
            })
        });

        if (response.ok) {
            const data = await response.json();
            const botResponses = data.responses.map(response => response.content);
            displayBotResponses(botResponses);
        } else {
            console.error('Failed to send message:', response.status);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function displayBotResponses(responses) {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; // Xóa nội dung chat trước đó

    responses.forEach(response => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.textContent = response;
        chatWindow.appendChild(messageElement);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Lắng nghe sự kiện khi người dùng gửi tin nhắn
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'message user-message';
        userMessageElement.textContent = message;
        document.getElementById('chat-window').appendChild(userMessageElement);
        userInput.value = ''; // Xóa nội dung tin nhắn trong input
        sendMessage(message); // Gửi tin nhắn đến chatbot
    }
});
