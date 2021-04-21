const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const {Worker} = require("worker_threads");
const osType = require('os').type();
const {spawn} = require('child_process');

const searchStream = (filename, text) => {

    return new Promise((resolve) => {
        const inStream = fs.createReadStream('file/' + filename + ".txt");
        const outStream = new stream;
        const rl = readline.createInterface(inStream, outStream);
        const result = [];
        const regEx = new RegExp(text, "i")
        rl.on('line', function (line) {
            if (line && line.search(regEx) >= 0) {
                result.push(line)
            }
        });
        rl.on('close', function () {
            console.log('finished search', filename)
            resolve(result)
        });
    })
}

const searchFull = (filename, text) => {

    return new Promise((resolve) => {

        const regEx = new RegExp(text, "i")
        const result = [];

        fs.readFile('file/' + filename + ".txt", 'utf8', function (err, contents) {
            console.log(err)
            let lines = contents.toString().split("\n");
            lines.forEach(line => {
                if (line && line.search(regEx) >= 0) {
                    result.push(line)
                }
            })
            console.log('finished search');
            resolve(result);
        })
    });
}

const searchStream_Worker = (filename, text) => {

    return new Promise((resolve) => {
        let worker = new Worker("./project_modules/worker-stream.js");
        worker.on("message", result => {
            resolve(result)
        });
        worker.postMessage({text, filename});
    });
}


const searchFull_Worker = (filename, text) => {

    return new Promise((resolve) => {
        let worker = new Worker("./project_modules/worker-full.js");
        worker.on("message", result => {
            resolve(result)
        });
        worker.postMessage({text, filename});
    });
}

const searchOs = (filename, text) => {
    return new Promise((resolve) => {

        if (osType === 'Windows_NT') {
            console.log('Searching using WINDOWS FIDSTR');

            /**
             *  at Socket.onChildStdout (child_process.js:368:14)
             at Socket.emit (events.js:315:20)
             at addChunk (internal/streams/readable.js:309:12)
             at readableAddChunk (internal/streams/readable.js:280:11)
             at Socket.Readable.push (internal/streams/readable.js:223:10)
             at Pipe.onStreamRead (internal/stream_base_commons.js:188:23) {
                  code: 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER',
                  cmd: 'findstr /i /s /c:"cristina" C:/workspace_private/nodejs-search-text/file/big.txt'
             */
            /*exec('findstr /i /s /c:"' + text + '" ' + 'C:/workspace_private/nodejs-search-text/file/' + filename + '.txt', function (error, stdout, stderr) {
                if (error) {
                    console.log(error,stderr)
                    resolve([])
                } else {
                    let lines = stdout.trim().split("\n");
                    resolve(lines)
                }
            }); */

            let child = spawn('findstr', [
                    '/i',
                    '/s',
                    '/c:' + text, 'file/' + filename + '.txt'],
                {cwd: 'C:/workspace_private/nodejs-search-text/'});

            let results = []
            child.stdout.on('data', function (data) {
                if (data) {
                    results = results.concat(data.toString().split("\r\n"))
                    results.pop()
                }
            });
            child.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });
            child.on('close', function (code) {
                console.log('child process exited with code ' + code);
                resolve(results)
            });

        }
    })

}


module.exports = {

    searchStream, searchStream_Worker,

    searchFull, searchFull_Worker,

    searchOs

}