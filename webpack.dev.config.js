const config = require('./webpack.config.js');


const devConfig = {
    devtool: 'source-map'
};

module.exports = Object.assign({}, config, devConfig);;