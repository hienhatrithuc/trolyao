<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hỏi đáp trợ lý ảo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        #chat-container {
            width: 400px;
            max-width: 100%;
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        #chat-window {
            padding: 20px;
            height: 400px;
            overflow-y: auto;
            flex: 1;
        }
        .message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 4px;
        }
        .user-message {
            background-color: #e1ffc7;
            align-self: flex-end;
        }
        .bot-message {
            background-color: #f1f1f1;
            align-self: flex-start;
        }
        #input-container {
            display: flex;
            border-top: 1px solid #ddd;
        }
        #input-container input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 0;
        }
        #input-container button {
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        #input-container button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div id="chat-container">
        <div id="chat-window"></div>
        <div id="input-container">
            <input type="text" id="user-input" placeholder="Nhập tin nhắn của bạn...">
            <button onclick="sendMessage()">Gửi</button>
        </div>
    </div>

    <script>
        const ACCESS_TOKEN = 'pat_4RRRsN1HkKSj3ciVTrqzzO8BRltdaeFlMQCA8cFqt2HYMMZ3q0DbhyxIYmqe6Zzm';
        const BOT_ID = '7347935645614063618'; // Thay thế 'your_bot_id' bằng ID bot của bạn
        const USER_ID = '29032201862555';
        const CONVERSATION_ID = '123';

        async function sendMessage() {
            const userInput = document.getElementById('user-input');
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, 'user-message');
                userInput.value = '';

                try {
                    const response = await fetch('https://api.coze.com/open_api/v2/chat', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer pat_4RRRsN1HkKSj3ciVTrqzzO8BRltdaeFlMQCA8cFqt2HYMMZ3q0DbhyxIYmqe6Zzm`,
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            'Host': 'api.coze.com',
                            'Connection': 'keep-alive'
                        },
                        body: JSON.stringify({
                            conversation_id: CONVERSATION_ID,
                            bot_id: 7347935645614063618,
                            user: USER_ID,
                            query: message,
                            stream: true
                        })
                    });

                    if (!response.body) {
                        throw new Error("Phản hồi không chứa dữ liệu.");
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    let botMessage = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            break;
                        }
                        const chunk = decoder.decode(value, { stream: true });
                        
                        try {
                            const data = JSON.parse(chunk);
                            if (data.event === 'message' && data.message.role === 'assistant') {
                                botMessage += data.message.content;
                                addMessage(botMessage, 'bot-message');
                            } else if (data.event === 'done') {
                                break;
                            }
                        } catch (error) {
                            console.error('Lỗi phân tích cú pháp JSON:', error);
                        }
                    }
                } catch (error) {
                    addMessage('Lỗi khi gửi yêu cầu: ' + error.message, 'bot-message');
                }
            }
        }

        function addMessage(text, className) {
            const chatWindow = document.getElementById('chat-window');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${className}`;
            messageElement.textContent = text;
            chatWindow.appendChild(messageElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    </script>
</body>
</html>
