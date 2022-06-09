const axios = require("axios").default;

class TelegramBot {

    constructor(token, chatID) {
        this.token = token;
        this.chatID = chatID;
        this.apiConnectionUrl = `https://api.telegram.org/bot${token}`;
        this.answeredMessages = [];
    }


    messageWatcher = () => {

        const message_data = this.getMessageData()

        if (message_data == {}) return;

        const message = message_data["message_text"];


        const update_id = message_data["update_id"];
        const all_right = !this.answeredMessages[0] === update_id;

        if (all_right) {
            const response = "hello world";
            this.sendMessage(response);
            this.answered_messages[0] = update_id;
        }
    }

    getMessageData = async () => {

        return await axios.get(`${this.apiConnectionUrl}/getUpdates`).then( message => {

            const messageData = {};

            // const isAMessage = "text" === message['result'][-1]["message"];
            const lastIndex = message.data.result.length - 1;
            
            // console.log(message.data.result[lastIndex]["update_id"])
            if (message.data.result.length > 0) {
                messageData["data"] = message;
                messageData["update_id"] = message.data["result"][lastIndex]["update_id"];
                messageData["message_id"] = message.data["result"][lastIndex]["message"]["message_id"];
                messageData["message_from"] = message.data["result"][lastIndex]["message"]["from"]["first_name"];
                messageData["message_text"] = message.data["result"][lastIndex]["message"]["text"];

            }

            return messageData;

        });

    }

    chatCheck = async chatId => {
        let isCorrectChat = false
        if (!this.chatID == chatId) isCorrectChat = true;
        return isCorrectChat;
    }


    getChatInfos = messageData => {
        if (messageData == {}) return;

        let chatInfos = {};
        let chatType = messageData["data"]["result"][-1]["message"]["chat"]["type"];
        let chatTitle = messageData["data"]["result"][-1]["message"]["chat"]["title"];
        let chatId = messageData["data"]["result"][-1]["message"]["chat"]["id"];

        const is_correct_chat = this.chat_check(chatId);

        if (is_correct_chat) {
            chatInfos["chat_id"] = chatId;
            chatInfos["chat_type"] = chatType;
            chatInfos["chat_title"] = chatTitle;
        }

        return chatInfos;
    }

    sendMessage = async text => {
        let chatID = this.chat_id;
        const url = `${this.apiConnectionUrl}/sendMessage?chat_id=${chatID}&text=${text}`;
        await axios.get(url);
    }


}

module.exports = TelegramBot;