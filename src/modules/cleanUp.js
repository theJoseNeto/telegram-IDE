const fs = require('fs');
const {resolve} = require('path');

exports.cleanFiles = async ()=> {
    const pathToOutput = resolve("src", "input", "index.js");
    const pathToLogs = resolve("src", "output", "log-file.txt"); 
    
    fs.unlink(pathToOutput, err => {if(err) throw err});
    fs.unlink(pathToLogs, err => {if(err) throw err});
    
}