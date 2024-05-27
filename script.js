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
            const botResponse = data.responses[0].content;
            console.log("Bot's response:", botResponse);
            // Đoạn này bạn có thể xử lý botResponse, ví dụ hiển thị trên giao diện người dùng
        } else {
            console.error('Failed to send message:', response.status);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Gọi hàm sendMessage với tin nhắn bạn muốn gửi
sendMessage('Xin chào, đây là một tin nhắn từ người dùng.');

