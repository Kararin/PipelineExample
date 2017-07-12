module.exports = {
    entry: "./main.js",
    output: {
        filename: "./app/app.js"
    },
    watch: true,

    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        }]
    }
};