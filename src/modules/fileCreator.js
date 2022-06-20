const fs = require("fs").promises;
const {resolve} = require('path');


exports.createFile = async  (pathToFile, fileName, typeFile, content) => {
    const path = resolve(pathToFile, `${fileName}.${typeFile}`)
    await fs.writeFile(path, content);
}

