const withCSS = require('@zeit/next-css');

module.exports = {
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    ...withCSS({
        cssLoaderOptions: {
            url: false
        },
    })
};

