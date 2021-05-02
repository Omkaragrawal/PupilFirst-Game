// import {
//     fabric
// } from "fabric";
let img;
let player1Images = {};
let player2Images = {};

const canvas = new fabric.Canvas('mainCanvas', {
    backgroundImage: 'images/background.jpg',
    width: window.innerWidth * 0.96,
    height: window.innerHeight * 0.96,
});

let playerHeight = Math.ceil(canvas.height / 1.3);
let playerWidth = Math.ceil(canvas.width / 2.3);

let player1Position = new fabric.Point(playerWidth / 2.7, (canvas.height - playerHeight / 2));
let player2Position = new fabric.Point(canvas.width - (playerWidth / 2.7), (canvas.height - playerHeight / 2));
/**
 * Get the image path 
 * @param  {String} frame="" - Name of the image that is needed
 * @param  {Boolean} folder=false - Wether the image is present in folder?
 * @param  {String} extension="png" - Extension of the image, set to png by default
 */
const imgPath = (frame = "", folder = false, extension = "png") => {
    return ((folder) ? `./images/${folder}/${frame}.${extension}` : `./images/${frame}.${extension}`);
};

const loadAllImages = (callback) => {
    const imagesToLoad = {
        // background: ["background"],
        backward: [1, 2, 3, 4, 5, 6],
        block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        forward: [1, 2, 3, 4, 5, 6],
        idle: [1, 2, 3, 4, 5, 6, 7, 8],
        kick: [1, 2, 3, 4, 5, 6, 7],
        punch: [1, 2, 3, 4, 5, 6, 7]
    };

    for (const folder in imagesToLoad) {
        // if (folder !== "background") {
        player1Images[folder] = [];
        player2Images[folder] = [];
        imagesToLoad[folder].forEach(frame => {
            fabric.Image.fromURL(imgPath(frame, folder), (image) => {
                // image.set({
                //     flipX: true
                // });
                image.scaleToHeight(playerHeight);
                image.scaleToWidth(playerWidth);
                // image.setPositionByOrigin(new fabric.Point(canvas.width - (Math.ceil(canvas.width / 2.3) / 2), (canvas.height - Math.ceil(canvas.height / 1.3) / 2)))
                // canvas.add(image).renderAll().setActiveObject(image);
                player1Images[folder].push(image);
                image.clone(copyImg => {
                    copyImg.set({
                        flipX: true
                    });
                    player2Images[folder].push(copyImg);
                });
                if (folder === "punch" && frame === 7) callback();
            });
        });
    }
};

/**
 * Automatically animates in the given context with the given images array and finally executes the callback
 * @param  {fabric.Canvas} context=Context - The context in which animation should take place
 * @param  {mainContext} context=Context - The context in which the fore context will be painted
 * @param  {String} animation="idle" - The animation that has to be played
 * @param  {Int} position=0 - The player position in the canvas that needs animation
 * @param  {Function} callback - The callback that will be called after the animation has taken place
 */
const animate = (canvasElem = canvas, animation1 = "idle", animation2 = 'idle', callback) => {
    // animation = animation.toLowerCase();
    // console.groupCollapsed('animation');
    let maxTimeout = Math.max(player1Images[animation1].length, player2Images[animation2].length) * 100;
    let player1TimeOut = maxTimeout / player1Images[animation1].length;
    let player2TimeOut = maxTimeout / player2Images[animation2].length;
    player1Images[animation1].forEach((image, index) => {
        setTimeout(() => {
            canvasElem.item(0).setElement(image.getElement());
            canvasElem.item(0).setPositionByOrigin(player1Position);
            canvasElem.renderAll();
        }, index * player1TimeOut);
    });
    player2Images[animation2].forEach((image, index) => {
        setTimeout(() => {
            canvasElem.item(1).setElement(image.getElement());
            canvasElem.item(1).setPositionByOrigin(player2Position);
            canvasElem.renderAll();
        }, index * player2TimeOut);
    });
    setTimeout(callback, maxTimeout + 3);
};

let startGame = () => {
    canvas.hoverCursor = "default";
    // Add Player 1
    canvas.add(player1Images["idle"][0]);
    canvas.item(0).hasControls = canvas.item(0).hasBorders = canvas.item(0).selectable = false;
    canvas.item(0).setPositionByOrigin(player1Position);
    // Add Player 2
    canvas.add(player2Images["idle"][0]);
    canvas.item(1).hasControls = canvas.item(1).hasBorders = canvas.item(1).selectable = false;
    canvas.item(1).setPositionByOrigin(player2Position);
    // Render players
    canvas.renderAll();
    let player1AnimationQueue = [];
    let player2AnimationQueue = [];
    let recursive = () => {
        let player1Animation = (player1AnimationQueue.length) ? player1AnimationQueue.shift() : "idle";
        let player2Animation = (player2AnimationQueue.length) ? player2AnimationQueue.shift() : "idle";
        animate(canvas, player1Animation, player2Animation, recursive);
    };
    window.addEventListener("keydown", (event) => {
        // console.log(event.key);
        switch (event.key) {
            case 'k':
            case 'K':
                player1AnimationQueue.push('kick');
                break;
            case 'p':
            case 'P':
                player1AnimationQueue.push('punch');
                break;
            case 'b':
            case 'B':
                player1AnimationQueue.push('block');
                break;
            case 'a':
            case 'A':
                player1AnimationQueue.push('backward');
                break;
            case 'd':
            case 'D':
                player1AnimationQueue.push('forward');
                break;
            case '7':
                player2AnimationQueue.push('kick');
                break;
            case '9':
                player2AnimationQueue.push('punch');
                break;
            case '4':
                player2AnimationQueue.push('block');
                break;
            case 'ArrowRight':
                player2AnimationQueue.push('backward');
                break;
            case 'ArrowLeft':
                player2AnimationQueue.push('forward');
                break;
            default:
                break;
        };
    });

    recursive();
};

loadAllImages(startGame);



// fabric.Image.fromURL("/images/idle/1.png", (image) => {
//     img = image;
//     image.set({
//         flipX: true
//     });
//     image.scaleToHeight(Math.ceil(canvas.height / 1.3));
//     image.scaleToWidth(Math.ceil(canvas.width / 2.3));
//     image.setPositionByOrigin(new fabric.Point(canvas.width - (Math.ceil(canvas.width / 2.3) / 2), (canvas.height - Math.ceil(canvas.height / 1.3) / 2)))
//     canvas.add(image).renderAll().setActiveObject(image);
//     // image.
// });

// canvas.add(allImages["idle"][0]);