const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
    const general = await imagemin(['client/public/media/*.{jpg,png}'], {
        destination: 'client/public/media/min',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    const gadgets = await imagemin(['client/public/media/gadgets/*.{jpg,png}'], {
        destination: 'client/public/media/min/gadgets',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    const maps = await imagemin(['client/public/media/maps/*.{jpg,png}'], {
        destination: 'client/public/media/min/maps',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    const operators = await imagemin(['client/public/media/operators/*.{jpg,png}'], {
        destination: 'client/public/media/min/operators',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    const utility = await imagemin(['client/public/media/utility/*.{jpg,png}'], {
        destination: 'client/public/media/min/utility',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });

    //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
})();
