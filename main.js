const pizzabot = require('./pizzabot');

let stripped = pizzabot.stripInputCoords(process.argv[2]);
pizzabot.validateInput(stripped);
let normalized = pizzabot.normalizeCoords(stripped);
let sorted = normalized.sort(pizzabot.compareX);
let path = pizzabot.findPath(sorted);
console.log(path);