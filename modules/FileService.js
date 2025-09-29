// Jaskunwar Hunjan A01195757
// The code and comments in this file were completed with the assistance of ChatGPT and Copilot

// Import Node.js built-in modules for working with files and file paths
const fs = require('fs');
const path = require('path');

// FileService class is used to handle writing to and reading from files
class FileService {
    constructor() {
        // basePath is set to the project root folder (one level up from "modules")
        this.basePath = path.join(__dirname, '..');
    }

    // Appends a line of text to the given file
    // If the file does not exist, it will be created
    appendLine(fileName, text) {
        const filePath = path.join(this.basePath, fileName);
        fs.appendFileSync(filePath, text + '\n', 'utf8');
    }

    // Reads the full content of the given file
    // If the file exists, return its content
    // If the file does not exist, return null
    readFile(fileName) {
        const filePath = path.join(this.basePath, fileName);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
        else {
            return null;
        }
    }
}

// Export FileService class so it can be used in other files
module.exports = FileService;
