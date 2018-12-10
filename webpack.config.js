const path = require('path');

module.exports = {
    entry: './src/animated.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};