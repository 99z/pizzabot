const pizzabot = require('./pizzabot');

if (!process.argv[2]) {
    console.error(`usage: node main.js "NxN (x1, y1) (x2, y2) ..."`);
    process.exit(1);
}

let stripped = pizzabot.stripInputCoords(process.argv[2]);
pizzabot.validateInput(stripped);
let normalized = pizzabot.normalizeCoords(stripped);
let sorted = normalized.sort(pizzabot.compareX);
let path = pizzabot.findPath(sorted);
console.log(path);