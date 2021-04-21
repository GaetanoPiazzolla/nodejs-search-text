const search = require('./search')
const { performance } = require('perf_hooks');


const configure = (app) => {

    app.get('/search-stream/:filename/:text', (req, res) => {

        const start = performance.now();
        console.log('---start')

        if (req.params.text && req.params.text.length < 5) {
            res.json({error: 'need more char'})
        }

        search.searchStream(req.params.filename, req.params.text).then((n) => {
            const end = performance.now()
            res.json({ results: n?.length, timeSpent: (end-start)})
        })
    })

    app.get('/search-full/:filename/:text', (req, res) => {
        const start = performance.now();
        console.log('---start')

        if (req.params.text && req.params.text.length < 5) {
            res.json({error: 'need more char'})
        }

        search.searchFull(req.params.filename, req.params.text).then((n) => {
            const end = performance.now()
            res.json({ results: n?.length, timeSpent: (end-start)})
        })
    })

    app.get('/search-full-worker/:filename/:text', (req, res) => {
        const start = performance.now();
        console.log('---start')

        if (req.params.text && req.params.text.length < 5) {
            res.json({error: 'need more char'})
        }

        search.searchFull_Worker(req.params.filename, req.params.text).then((n) => {
            const end = performance.now()
            res.json({ results: n?.length, timeSpent: (end-start)})
        })
    })

    app.get('/search-stream-worker/:filename/:text', (req, res) => {
        const start = performance.now();
        console.log('---start')

        if (req.params.text && req.params.text.length < 5) {
            res.json({error: 'need more char'})
        }

        search.searchStream_Worker(req.params.filename, req.params.text).then((n) => {
            const end = performance.now()
            res.json({ results: n?.length, timeSpent: (end-start)})
        })
    })

    app.get('/search-os/:filename/:text', (req, res) => {
        const start = performance.now();
        console.log('---start')

        if (req.params.text && req.params.text.length < 5) {
            res.json({error: 'need more char'})
        }

        search.searchOs(req.params.filename, req.params.text).then((n) => {
            const end = performance.now()
            res.json({ results: n?.length, timeSpent: (end-start)})
        })
    })

}

module.exports = {
    configure
}