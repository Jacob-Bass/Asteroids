const FPS = 30; //frames per second
const SHIP_SIZE = 30;

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var ship = {
    x: canvas.width/2,
    y: canvas.height/2,
    r: SHIP_SIZE/2, // radius
    a: 90 / 180 * Math.PI // converted to radians = angle
}

//set game loop
window.setInterval(update,1000 / FPS)

function update(){
    // draw space
    RenderSpace();
    // draw triangular ship
    RenderShip();
    // rotate ship

    // move ship

    // center dot
    ctx.fillStyle = "red";
    ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
}

function RenderSpace(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function RenderShip(){
    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo( //nose of ship
        ship.x + 4/3 * ship.r * Math.cos(ship.a),
        ship.y - 4/3 * ship.r * Math.sin(ship.a)
    );

    ctx.lineTo( // rear left
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
    );

    ctx.lineTo( // rear right
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
    );

    ctx.closePath();
    ctx.stroke();
}