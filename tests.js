const test = require('tape');
const pizzabot = require('./pizzabot');

test('stripInputCoords', (t) => {
    let inputString = '5x5 (0, 0) (1, 3) (4, 4) (4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4, 1)';
    let stripped = pizzabot.stripInputCoords(inputString);

    t.equal('string', typeof stripped, 'returns a string');
    t.equal(stripped, '55001344424201322341', 'returns expected string');
    t.end();
});

test('normalizeCoords', (t) => {
    let inputCoords = '55001344';
    let normalized = pizzabot.normalizeCoords(inputCoords);

    t.equal(normalized.length, 3, 'returns correct number of coordinates');
    t.deepEqual(
        normalized,
        [
            {x: 0, y: 0},
            {x: 1, y: 3},
            {x: 4, y: 4}
        ],
        'returns array with correct coordinate values'
    );

    t.notDeepEqual(
        normalized,
        [
            {x: 5, y: 5},
            {x: 0, y: 0},
            {x: 1, y: 3},
            {x: 4, y: 4}
        ],
        'returned coordinate values do not include board size'
    );
    t.end();
});

test('compareX', (t) => {
    let c1 = {x: 1, y: 3};
    let c2 = {x: 4, y: 4};

    t.equal(pizzabot.compareX(c1, c2), -1, 'returns -1 when first.x < second.x');
    t.equal(pizzabot.compareX(c2, c1), 1, 'returns 1 when first.x > second.x');

    c2.x = 1;
    t.equal(pizzabot.compareX(c1, c2), 0, 'returns 0 when first === second');
    t.end();
});

test('findPath', (t) => {
    let coords = [
        {x: 1, y: 3},
        {x: 4, y: 4}
    ];
    let path = pizzabot.findPath(coords);

    t.equal(path, 'ENNNDEEEND', 'returns a correct path');

    let coordsOrigin = [
        {x: 0, y: 0},
        {x: 1, y: 3},
        {x: 4, y: 4}
    ];
    let pathOrigin = pizzabot.findPath(coordsOrigin);

    t.equal(pathOrigin, 'DENNNDEEEND', 'returns a correct path with origin as a stop');
    t.end();
});