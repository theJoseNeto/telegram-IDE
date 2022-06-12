require('dotenv').config();

const {
    exec
} = require("child_process");
const TelegramBot = require("./bot-telegram");
const {
    createFile
} = require('./src/modules/fileCreator');

const token = process.env.TELEGRAM_URL_CONNECTION;
const bot = new TelegramBot(token, '-1001387626450');

const run = async () => {

    const message = (await bot.getMessageData()).message_text;

    await createFile('index', "js", message)
        .then(() => {

            exec('node ./src/output/index.js', async (error, stdout, stderr) => {
                
                if (error) {
                    console.log(`Erro: ${error}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }

                console.log(`out: ${stdout}`);

            });
        });
}


run();