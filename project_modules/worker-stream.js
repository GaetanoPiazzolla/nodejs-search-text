const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const {parentPort} = require("worker_threads");

parentPort.on("message", data => {

    const fileName = 'file/' + data.filename + '.txt'
    let inStream = fs.createReadStream(fileName);
    let outStream = new stream;
    let rl = readline.createInterface(inStream, outStream);
    let result = [];

    const regEx = new RegExp(data.text, "i")

    rl.on('line', function (line) {
        if (line && line.search(regEx) >= 0) {
            console.log('found text in ', fileName)
            result.push(line)
        }
    });

    rl.on('close', function () {
        console.log('finished on worker', data.filename)
        parentPort.postMessage(result);
    });

});

