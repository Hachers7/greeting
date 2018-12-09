const path = require('path');

module.exports = {
    entry: './src/static.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};