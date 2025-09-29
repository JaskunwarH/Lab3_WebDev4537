// Jaskunwar Hunjan A01195757
// The code and comments in this file were completed with the assistance of ChatGPT and Copilot

// This class stores message templates that can be reused
class MessageCatalog {
    // Returns a greeting template with placeholders:
    // %1 will be replaced with the user's name
    // %2 will be replaced with the server's current date and time
    getGreetingTemplate() {
        return "Hello %1. Server current date and time is %2";
    }
}

// Makes the MessageCatalog class available for use in other files
module.exports = MessageCatalog;
