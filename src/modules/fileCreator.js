const fs = require("fs").promises;
const {resolve} = require('path');


exports.createFile = async  (fileName, typeFile, content) => {
    const outputPath = resolve("src", "output");
    await fs.writeFile(resolve(outputPath, `${fileName}.${typeFile}`), content);
}

