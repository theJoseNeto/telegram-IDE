const axios = require("axios").default;

class TelegramBot {

    constructor(token) {
        this.token = token;
        this.apiConnectionUrl = `https://api.telegram.org/bot${token}`;
        this.answeredMessages = [];
    }



    getMessageData = async () => {

        return await axios.get(`${this.apiConnectionUrl}/getUpdates`).then(message => {

            const messageData = {};
            // console.log(message);
            const lastIndex = message.data.result.length - 1;

            if (message.data.result.length > 0) {
                messageData["data"] = message;
                messageData["update_id"] = message.data["result"][lastIndex]["update_id"];
                messageData["chatId"] = message.data["result"][lastIndex]["chatId"];
                messageData["message_id"] = message.data["result"][lastIndex]["message"]["message_id"];
                messageData["message_from"] = message.data["result"][lastIndex]["message"]["from"]["first_name"];
                messageData["message_text"] = message.data["result"][lastIndex]["message"]["text"];
            }

            return messageData;

        });

    }

    sendMessage = async (text, chatId) => {

        const sendMessage = `${this.apiConnectionUrl}/sendMessage?chat_id=${chatId}&text=${text}`;
        await axios.get(sendMessage);
    }



}

module.exports = TelegramBot;