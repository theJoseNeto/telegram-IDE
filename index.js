require('dotenv').config();

const { resolve } = require('path');
const {exec} = require("child_process");

const { cleanFiles } = require('./src/modules/cleanUp');
const {createFile} = require('./src/modules/fileCreator');

const pathToInput = resolve('src', "input-output", "input")
// const pathToOutput = resolve('src', "input-output","output")

const TelegramBot = require("./bot-telegram");
const token = process.env.TELEGRAM_URL_CONNECTION;
const bot = new TelegramBot(token, '-1001387626450');



// const intervael = setInterval(async () => {
const run = async ()=>{
    const message = (await bot.getMessageData()).message_text;
    const inputFileName = "input";
    await createFile(pathToInput, `${inputFileName}`, "js", message)
        .then(() => {

            exec(`node ./src/input-output/input/${inputFileName}.js > ./src/input-output/output.txt`,
            (error, stdout, stderr) => {
                if (error) {console.log(`Erro: ${error}`); return;}
                if (stderr) {console.log(`stderr: ${stderr}`);return;}
                console.log(`Success!`);
            });
        })
     }
     
     run();
        
    // }, 1000);
