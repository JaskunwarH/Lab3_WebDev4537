const http = require('http');
const url = require('url');

const Utils = require('./modules/Utils');
const MessageCatalog = require('./lang/en/en');

const PORT = process.env.PORT || 8080;

class ServerApp 
{
    constructor()
    {
        this.utils = new Utils();
        this.catalog = new MessageCatalog();
    }

    start(port) {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            console.log("Requested path:", parsedUrl.pathname);

            if (
                parsedUrl.pathname === '/COMP4537/labs/3/getDate' ||
                parsedUrl.pathname === '/COMP4537/labs/3/getDate/'
            ) 
            {
                this._handleGetDate(req, res, parsedUrl.query);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h3 style="color:red">404 Not Found</h3>');
            }
        });

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
    });

    }

    _handleGetDate(req, res, query) {
        const name = query.name || 'Guest';
        const serverTime = this.utils.getServerDateString();

        let message = this.catalog.getGreetingTemplate();
        message = message.replace('%1', name).replace('%2', serverTime);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<span style="color:blue">${message}</span>`);
    }
}

const app = new ServerApp();
app.start(8080);