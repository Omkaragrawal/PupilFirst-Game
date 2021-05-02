let mainCanvas = document.getElementById('mainCanvas');
let backgroundCanvas = document.createElement("canvas");
let frontCanvas = document.createElement("canvas");

let mainContext = mainCanvas.getContext('2d');
let backgroundContext = backgroundCanvas.getContext('2d');
let frontContext = frontCanvas.getContext('2d');


const allImages = {};

/**
 * 
 * @param  {String} src="" - Image source in String
 * @param  {Number} width=500  - Width of Image
 * @param  {Number} height=500 - Height of Image
 * @param  {Function} callback - Th callback that will be called after image has loaded
 */
const loadImg = (src = "", width = 500, height = 500, callback) => {
    let img = new Image(width, height);

    img.onload = _ => callback(img);

    img.src = src
}

/**
 * Loads all the images
 * @param  {Function} callback - The callback that will be executed after all the images have been loaded
 */
const loadAllImages = (callback) => {
    const imagesToLoad = {
        background: ["background"],
        backward: [1, 2, 3, 4, 5, 6],
        forward: [1, 2, 3, 4, 5, 6],
        idle: [1, 2, 3, 4, 5, 6, 7, 8],
        kick: [1, 2, 3, 4, 5, 6, 7],
        punch: [1, 2, 3, 4, 5, 6, 7]
    };

    for (const folder in imagesToLoad) {
        allImages[folder] = [];
        if (folder !== "background") {
            imagesToLoad[folder].forEach(frame => {
                loadImg(imgPath(frame, folder), mainCanvas.width, mainCanvas.height, (img) => {
                    allImages[folder].push(img);
                    if (folder === "punch" && frame === 7) {
                        callback();
                    }
                });
            });
        } else {
            loadImg(imgPath("background", false, "jpg"), mainCanvas.width, mainCanvas.height, (img) => {
                allImages[folder].push(img);
                if (folder === "punch" && frame === 7) {
                    callback();
                }
            });
        }
    }
}

/**
 * Get the image path 
 * @param  {String} frame="" - Name of the image that is needed
 * @param  {Boolean} folder=false - Wether the image is present in folder?
 * @param  {String} extension="png" - Extension of the image, set to png by default
 */
const imgPath = (frame = "", folder = false, extension = "png") => {
    return ((folder) ? `./images/${folder}/${frame}.${extension}` : `./images/${frame}.${extension}`);
};

// backgroundCanvas.height = 500;
// frontCanvas.height = 500;

// backgroundCanvas.width = 500;
// frontCanvas.width = 500;

// mainContext.fillStyle = '#6F6F6F';
// mainContext.fillRect(0, 0, 500, 500);


// backgroundContext.fillStyle = '#3B62FF';
// backgroundContext.fillRect(50,50,150,150);
// mainContext.drawImage(backgroundCanvas, 0, 0, 500, 500);


// frontContext.fillStyle = 'red';
// frontContext.fillRect(75,75,175,175);

// mainContext.drawImage(frontCanvas, 0, 0, 500, 500);

mainCanvas.width = innerWidth * 0.97;
mainCanvas.height = innerHeight * 0.97;


frontCanvas.width = innerWidth * 0.97;
frontCanvas.height = innerHeight * 0.97;

backgroundCanvas.width = innerWidth * 0.97;
backgroundCanvas.height = innerHeight * 0.97;

/**
 * Automatically animates in the given context with the given images array and finally executes the callback
 * @param  {frontContext} context=Context - The context in which animation should take place
 * @param  {mainContext} context=Context - The context in which the fore context will be painted
 * @param  {Array} imagesArray=[] - The array of images that should be used for animation
 * @param  {Function} callback - The callback that will be called after the animation has taken place
 */
const animate = (context, backContext, imagesArray = [], callback) => {
    console.groupCollapsed('animation');
    imagesArray.forEach((image, index) => {
        setTimeout(() => {
            console.log("clearing the front context");
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
            console.log("Drawing the front context");
            // backContext.drawImage(frontCanvas, 0, backContext.canvas.height - Math.ceil(backContext.canvas.height / 1.3), Math.ceil(backContext.canvas.width / 2.3), Math.ceil(backContext.canvas.height / 1.3));
        }, index * 100);
    });
    setTimeout(() => {
        console.groupEnd('animation');
        callback();
    }, imagesArray.length * 100);
};

loadAllImages(() => {

    /* Draw the Background */
    mainContext.drawImage(allImages["background"][0], 0, 0, mainCanvas.width, mainCanvas.height);

    /* Draw an idle image in front context with given width and height */
    // console.log("making front canvas");
    frontContext.drawImage(allImages["idle"][0], 0, 0, frontCanvas.width, frontCanvas.height);

    /* Draw an idle image in background context with given width and height */
    // console.log("making opponent canvas");
    // backgroundContext.drawImage(allImages["idle"][0], backgroundCanvas.width, 0, 0, backgroundCanvas.height);

    /* Draw an Front Canvas over the Main Context with given width and height */
    console.log("Painting Front canvas");
    mainContext.drawImage(frontCanvas, 0, mainCanvas.height - Math.ceil(mainCanvas.height / 1.3), Math.ceil(mainCanvas.width / 2.3), Math.ceil(mainCanvas.height / 1.3));


    /* Animate the Player */
    animate(frontContext, mainContext, allImages["idle"], () => {
        console.log("Animation Completed!!! did it work?")
    });

    /* Draw an Background Canvas over the Main Context with given width and height */
    // console.log("Painting opponent canvas");
    // mainContext.drawImage(backgroundCanvas, 0, mainCanvas.height - Math.ceil(mainCanvas.height / 1.3), Math.ceil(mainCanvas.width / 2.3), Math.ceil(mainCanvas.height / 1.3))
});