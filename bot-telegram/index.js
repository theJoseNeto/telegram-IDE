const axios = require("axios").default;

class TelegramBot { 
    
    constructor(token, chatID){ 
        this.token = token; 
        this.chatID = chatID;
        this.apiConnectionUrl = `https://api.telegram.org/bot${token}`;
        this.answeredMessages = []; 
    }

    getMessageData = async() => {

        const message = await axios.get(`${this.apiConnectionUrl}/getUpdates`);
        const messageData = {};
        
        const isAMessage = "text" === message['result'][-1]["message"];
        
        if (message.length > 0 && isAMessage){
            messageData["data"] = message
            messageData["update_id"] = message["result"][-1]["update_id"]
            messageData["message_id"] = message["result"][-1]["message"]["message_id"]
            messageData["message_from"] = message["result"][-1]["message"]["from"]["first_name"]
            messageData["message_text"]  = message["result"][-1]["message"]["text"]

            return messageData
        }
    
    } 

    chatCheck = async chatId => {
        let isCorrectChat = false
        if (!this.chatID == chatId) isCorrectChat = true;
        return isCorrectChat
    }


    getChatInfos = messageData => {
        if( messageData == {}) return;

        let chatInfos = {}        
        let chatType = messageData["data"]["result"][-1]["message"]["chat"]["type"]
        let chatTitle = messageData["data"]["result"][-1]["message"]["chat"]["title"]
        let chatId = messageData["data"]["result"][-1]["message"]["chat"]["id"]

        const is_correct_chat = this.chat_check(chatId);

        if (is_correct_chat){
            chatInfos["chat_id"] = chatId;
            chatInfos["chat_type"] = chatType;
            chatInfos["chat_title"] = chatTitle;
        }

        return chatInfos
    }

    sendMessage = async text => {
        let chatID = this.chat_id;
        const url = `{self.api_connection_url}/sendMessage?chat_id=${chatID}&text=${text}`;
        await axios.get(url)
    }


}

module.exports = TelegramBot;