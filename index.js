const fs = require("fs").promises;
const data = "console.log('hello world!')"; 


const createFile = async (fileName, typeFile, content) => {
    await fs.writeFile(`${fileName}.${typeFile}`, content); 
}

createFile('test', "js", data);

