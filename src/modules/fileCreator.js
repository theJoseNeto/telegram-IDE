const fs = require("fs").promises;
const {resolve} = require('path');


exports.createFile = async  (pathToFile, fileName, typeFile, content) => {
    await fs.writeFile(resolve(pathToFile, `${fileName}.${typeFile}`), content);
}

