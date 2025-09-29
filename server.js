// Jaskunwar Hunjan A01195757
// The code and comments in this file were completed with the assistance of ChatGPT and Copilot

// Import Node.js built-in modules for HTTP server and URL parsing
const http = require('http');
const url = require('url');

// Import helper classes from modules
const Utils = require('./modules/Utils');
const MessageCatalog = require('./lang/en/en');
const FileService = require('./modules/FileService');

// Use either the port provided by the host (Render) or default to 8080 for local testing
const PORT = process.env.PORT || 8080;

// ServerApp class handles all incoming HTTP requests
class ServerApp {
    constructor() {
        // Create objects for utilities, message templates, and file handling
        this.utils = new Utils();
        this.catalog = new MessageCatalog();
        this.fileService = new FileService();
    }

    // Starts the HTTP server and listens for requests
    start(port) {
        const server = http.createServer((req, res) => {
            // Parse the incoming request URL
            const parsedUrl = url.parse(req.url, true);
            console.log("Requested path:", parsedUrl.pathname);

            // Route handling
            if (
                parsedUrl.pathname === '/COMP4537/labs/3/getDate' ||
                parsedUrl.pathname === '/COMP4537/labs/3/getDate/'
            ) {
                // Handle date/time greeting
                this._handleGetDate(req, res, parsedUrl.query);

            } else if (
                parsedUrl.pathname === '/COMP4537/labs/3/writeFile' ||
                parsedUrl.pathname === '/COMP4537/labs/3/writeFile/'
            ) {
                // Handle writing text to file
                this._handleWriteFile(req, res, parsedUrl.query);

            } else if (
                parsedUrl.pathname === '/COMP4537/labs/3/readFile/file.txt' ||
                parsedUrl.pathname === '/COMP4537/labs/3/readFile/file.txt/'
            ) {
                // Handle reading from file
                this._handleReadFile(req, res);

            } else {
                // All other paths return 404 Not Found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h3 style="color:red">404 Not Found</h3>');
            }
        });

        // Start the server listening on the chosen port
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    // Handles the /getDate endpoint
    // Returns a greeting message with the user's name and the server's date/time
    _handleGetDate(req, res, query) {
        const name = query.name || 'Guest'; // Default to Guest if no name provided
        const serverTime = this.utils.getServerDateString();

        // Replace placeholders in the message template
        let message = this.catalog.getGreetingTemplate();
        message = message.replace('%1', name).replace('%2', serverTime);

        // Send back the message styled in blue
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<span style="color:blue">${message}</span>`);
    }

    // Handles the /writeFile endpoint
    // Appends the provided text to file.txt
    _handleWriteFile(req, res, query) {
        const text = query.text;
        if (!text) {
            // Return error if query parameter is missing
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<span style="color:red">400 Bad Request: text query param missing</span>');
            return;
        }

        // Append text to file.txt
        this.fileService.appendLine('file.txt', text);

        // Respond with confirmation
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<span style="color:blue">Appended "${text}" to file.txt</span>`);
    }

    // Handles the /readFile endpoint
    // Reads the content of file.txt and displays it
    _handleReadFile(req, res) {
        const content = this.fileService.readFile('file.txt');
        if (content === null) {
            // Return 404 if file.txt does not exist
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<span style="color:red">404 Not Found: file.txt does not exist</span>');
        } else {
            // Display file contents in blue
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<pre style="color:blue">${content}</pre>`);
        }
    }
}

// Create a ServerApp object and start the server
const app = new ServerApp();
app.start(PORT);
