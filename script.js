function getBotResponse(userInput) {
    var data = {
        "conversation_id": "123",
        "bot_id": "7348640557197246482",
        "user": "29032201862555",
        "query": userInput,
        "stream": true
    };

    fetch('https://api.coze.com/open_api/v2/chat', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer {YOUR PERSONAL_ACCESS_TOKEN}',
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Host': 'api.coze.com',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        var botResponse = data.response;
        displayMessage(botResponse, "bot-message");
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
