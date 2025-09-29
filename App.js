// Jaskunwar Hunjan A01195757
// The code and comments in this file were completed with the assistance of ChatGPT and Copilot

// Import the MathUtils class from the modules folder
const MathUtils = require('./modules/MathUtils');

// App class is the main entry point of the program
class App {
    // run() method is used to test MathUtils functions
    run() {
        // Create a MathUtils object to use its methods
        const math = new MathUtils();

        // Call the add method to add two numbers
        const sum = math.add(5, 3);

        // Call the subtract method to subtract two numbers
        const difference = math.subtract(5, 3);

        // Print a message with the results using template literals
        // Includes your name to show this is your work
        console.log(`Hello Jaskunwar. Then sum is #${sum} and difference is #${difference}.`); 0
    }
}

// Export App class so it can be used in other files
module.exports = App;

// Create an App object and call run() to start the program
const app = new App();
app.run();
