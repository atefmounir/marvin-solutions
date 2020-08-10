const withPlugins = require('next-compose-plugins');        //next-optimized-images package
const optimizedImages = require('next-optimized-images');   //next-optimized-images package

module.exports = withPlugins([                              //copy from documentation
    [
        optimizedImages, {
        /* config for next-optimized-images */
        }
    ],

    // your other plugins here

]);