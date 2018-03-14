const http = require('http');
const director = require('director');

function podcastRoute(req, res) {
    this.res.writeHead(200);
    this.res.write('nice!!!');
    this.res.end();
}

const router = new director.http.Router({
    '/podcast': {
        get: podcastRoute
    }
});

const server = http.createServer((req, res) => {
    const onErr = err => {
        if (err) {
            console.dir(err);
            res.writeHead(404);
            res.end();
        }
    };
    router.dispatch(req, res, onErr);
});

server.listen(8000);
