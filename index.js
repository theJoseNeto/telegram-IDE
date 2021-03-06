require('dotenv').config();

const { resolve } = require('path');
const { exec } = require("child_process");

const { cleanFiles } = require('./src/modules/cleanUp');
const { createFile } = require('./src/modules/fileCreator');

const pathToInput = resolve('src', "inputOutput", "input")

const TelegramBot = require("./bot-telegram");
const { readFileSync } = require('fs');
const token = process.env.TELEGRAM_URL_CONNECTION;
const { sendMessage, getMessageData, saveAnseweredMessage, messageIsAnsewered } = new TelegramBot(token);



setInterval(async () => {
    const run = async () => {
        const {chatId, update_id, message_text} = await getMessageData();

        const inputFileName = "input";
        await createFile(pathToInput, `${inputFileName}`, "js", message_text)
            .then(() => {

                return new Promise((resolve, reject) => {
                    exec(`node ./src/inputOutput/input/${inputFileName}.js > ./src/inputOutput/output/output.txt`,
                        async (error, stdout, stderr) => {
                            if (error) { console.log(`Erro: ${error}`); return; }
                            if (stderr) { console.log(`stderr: ${stderr}`); return; }

                            try {
                                const content = readFileSync("./src/inputOutput/output/output.txt", "utf8");
                                resolve(content);

                            } catch (error) {
                                reject(error);
                            }
                        });

                }).then(async output => {
                    try {

                        await sendMessage(output, chatId, update_id);

                    } catch (e) {
                        const erro = {
                            erro: e.response.statusText,
                            statusCode: e.response.status,
                            ErrorDescription: e.response.data.description
                        }
                        console.log(erro)
                    }
                });

            });

    }

    run();
}, 1000);
