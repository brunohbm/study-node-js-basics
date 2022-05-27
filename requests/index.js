const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Clebinho',
    },
    {
        id: 1,
        name: 'Tinkiwiki',
    },
    {
        id: 2,
        name: 'Alan bida'
    }
]

server.on('request', (req, res) => {
    if (req.url.includes('/friends')) {
        res.statusCode = 200;
        if (req.method === 'GET') {
            const key = req.url.split('/')[2];
            res.setHeader('Content-Type', 'application/json');

            if (key) {
                const response = JSON.stringify(friends[key]);
                res.end(response);
            } else {
                const response = JSON.stringify(friends);
                res.end(response);
            }
        } else if (req.method === 'POST') {
            req.on('data', data => {
                const friend = data.toString();
                friends.push(JSON.parse(friend));
            });

            req.pipe(res);
        }
    } else if (req.url === '/tafrio') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<div>');
        res.write('Caralho de frio!!!');
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log('Subiu carai!!!!!');
});