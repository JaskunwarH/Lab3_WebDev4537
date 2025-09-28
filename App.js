const MathUtils = require('./modules/MathUtils');

class App 
{
    run() 
    {
        const math = new MathUtils();

        const sum = math.add(5, 3);
        const difference = math.subtract(5,3);

        console.log(`Hello Jaskunwar. Then sum is #${sum} and difference is #${difference}.`);0
    }
}

module.exports = App;

const app = new App();
app.run();