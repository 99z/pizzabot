/**
 * Removes all non-numeric characters from input string
 * @param {string} inputCoords - String containing board size and coordinate pairs
 * in the format NxN (x, y) (x, y) ...
 * @return  {string} stripped - String of numbers representing coordinate pairs
 */
function stripInputCoords(inputCoords) {
    let stripped = inputCoords.replace(/\D/g,'');
    return stripped;
}

/**
 * Checks for invalid input data and exit if bad data exists
 * @param {string} strippedInput - String of numbers representing coordinate pairs
 */
function validateInput(strippedInput) {
    if (strippedInput.length < 4) {
        console.error('Please specify at least one coordinate for delivery');
        process.exit(1);
    }

    if (strippedInput.length % 2 !== 0) {
        console.error('Please ensure all coordinate pairs have both x and y values');
        process.exit(1);
    }
}

/**
 * Contructs an array of coordinate objects from a string of numbers
 * @param   {string} coords - String of numbers representing coordinate pairs
 * @return  {array} normalized - Array of coordinate objects with x,y fields
 */
function normalizeCoords(coords) {
    let normalized = [];

    // Begin at idx 2 because we don't need board size
    // Each pair of numbers in the string is now coordinate pairs
    for (let i = 2; i < coords.length - 1; i += 2) {
        normalized.push({
            x: parseInt(coords[i]),
            y: parseInt(coords[i + 1])
        });
    }

    return normalized;
}

/**
 * Compare function to sort coordinates by X value
 * @param  {object} c1 - First coordinate
 * @param  {object} c2 - Second coordinate
 */
function compareX(c1, c2) {
    if (c1.x < c2.x) {
        return -1;
    }

    if (c1.x > c2.x) {
        return 1;
    }

    return 0;
}

/**
 * Finds a path through all coordinates specified by the coords array
 * @param  {array} coords - Array of coordinates
 * @return {string} path - String containing 'N', 'S', 'E', 'W', and 'D'
 * Represents direction to move in the coordinate plane and when a delivery
 * is made
 */
function findPath(coords) {
    let path = '';
    let insertedOrigin = false;

    // If the first coordinate is not the origin, then prepend (0, 0) to the
    // coordinate array and set insertedOrigin to true
    // This way we always begin traversal at (0, 0)
    if ((coords[0].x !== 0) && (coords[0].y !== 0)) {
        coords.unshift({x: 0, y: 0});
        insertedOrigin = true;
    }

    for (let i = 0; i < coords.length - 1; i++) {
        // If first coordinate is the origin and we didn't manually insert it,
        // then we need to deliver
        if (
            (coords[i].x === 0) &&
            (coords[i].y === 0) &&
            insertedOrigin === false
        ) path += 'D';

        let xDiff = coords[i + 1].x - coords[i].x;
        let yDiff = coords[i + 1].y - coords[i].y;

        if (xDiff > 0) {
            path += 'E'.repeat(xDiff);
        } else {
            path += 'W'.repeat(Math.abs(xDiff));
        }

        if (yDiff > 0) {
            path += 'N'.repeat(yDiff);
        } else {
            path += 'S'.repeat(Math.abs(yDiff));
        }

        path += 'D';
    }

    return path;
}

// Export functions for unit tests
module.exports = {
    stripInputCoords: stripInputCoords,
    validateInput: validateInput,
    normalizeCoords: normalizeCoords,
    compareX: compareX,
    findPath: findPath
};
