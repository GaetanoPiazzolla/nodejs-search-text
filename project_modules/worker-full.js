const fs = require('fs');
const {parentPort} = require("worker_threads");

parentPort.on("message", data => {

    const regEx = new RegExp(data.text, "i")
    const result = [];

    fs.readFile('file/' + data.filename + ".txt", 'utf8', function (err, contents) {
        let lines = contents.toString().split("\n");
        lines.forEach(line => {
            if (line && line.search(regEx) >= 0) {
                console.log('found in file ', data.filename)
                result.push(line)
            }
        })
        console.log('finished search');
        parentPort.postMessage(result)
    })

});

