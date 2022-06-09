require('dotenv').config();
const fs = require("fs").promises;
const {resolve} = require('path');
const TelegramBot = require("./bot-telegram");

const data = "console.log('hello world!')"; // Message from telegram;

const token = process.env.TELEGRAM_URL_CONNECTION;
const bot = new TelegramBot(token, '-1001387626450');

const teste = () => bot.getMessageData().then( r => console.log(r));
teste();

// const createFile = async (fileName, typeFile, content) => {
//     const outputPath = resolve(__dirname, "output");
//     await fs.writeFile(resolve(outputPath,`${fileName}.${typeFile}`), content); 
// }

// createFile('test', "js", data); 

