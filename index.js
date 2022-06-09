const fs = require("fs").promises;
const {resolve} = require('path');
const TelegramBot = require("./bot-telegram");

const data = "console.log('hello world!')"; // Message from telegram;

const token = process.env.TELEGRAM_URL_CONNECTION;
const bot = new TelegramBot(token, "chat_id");


const createFile = async (fileName, typeFile, content) => {
    const outputPath = resolve(__dirname, "output");
    await fs.writeFile(resolve(outputPath,`${fileName}.${typeFile}`), content); 

}

createFile('test', "js", data); 

