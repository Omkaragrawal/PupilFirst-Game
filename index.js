let mainCanvas = document.getElementById('mainCanvas');
// let backgroundCanvas = document.createElement("canvas");
// let frontCanvas = document.createElement("canvas");

let mainContext = mainCanvas.getContext('2d');
// let backgroundContext = backgroundCanvas.getContext('2d');
// let frontContext = frontCanvas.getContext('2d');

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


const loadImg = (src, width = 500, height = 500, callback) => {
    let img = new Image(width, height);

    img.onload = _ => callback(img);
    
    img.src = src
}

//background Image
loadImg("./images/background.jpg", mainCanvas.width, mainCanvas.height, (bgImg) => {
    mainContext.drawImage(bgImg, 0, 0, mainCanvas.width, mainCanvas.height)
})