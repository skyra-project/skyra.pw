const path = require('path');

module.exports = {
    pwa: {
        name: 'Skyra',
        themeColor: '#209CEE',
        msTileColor: '#209CEE',
        iconPaths: {
            favicon32: 'img/icons/icon-32x32.png',
            favicon16: 'img/icons/icon-16x16.png',
            appleTouchIcon: 'img/icons/icon-152x152.png',
            msTileImage: 'img/icons/icon-144x144.png'
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            const PurgecssPlugin = require('purgecss-webpack-plugin');
            const glob = require('glob-all');

            config.plugins.push(new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, './../src/index.html'),
                    path.join(__dirname, './../**/*.vue'),
                    path.join(__dirname, './../src/**/*.js')
                ])
            }));
        }
    }
};
