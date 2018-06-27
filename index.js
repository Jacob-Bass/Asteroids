const FPS = 60; //frames per second
const SHIP_SIZE = 30;
const ROIDS_NUM = 3; //starting number of asteroids
const TURN_SPEED = 360; //turn speed in degrees per second
const SHIP_THRUST = 5; // accelleration of ship 
const FRICTION = 0.6; // 0 = no fri ction, 1 = lots of it

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var ship = {
    x: canvas.width/2,
    y: canvas.height/2,
    r: SHIP_SIZE/2, // radius
    a: 90 / 180 * Math.PI, // converted to radians = angle
    rot: 0,
    thrusting: false,
    thrust:{
        x:0,
        y:0
    }
};
//setup asteroid
var roids = [];
createAsteroidBelt();
createAsteroidBelt(){
    roids = [];
    for (let i = 0; i < ROIDS_NUM; i++) {
        roids.push(newAsteroid());
        
    }
}


//set game loop
window.setInterval(update,1000 / FPS)


function KeyDown(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
        case 37: // left arrow (rotate ship left)
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: //up arrow (thrust forward)
            ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
    }
}

function KeyUp(/** @type {KeyboardEvent} */ ev){
    switch(ev.keyCode){
        case 37: // left arrow (stop)
            ship.rot = 0;
            break;
        case 38: //up arrow (thrust forward)
            ship.thrusting = false;
            break;
        case 39: // right arrow (stop)
            ship.rot = 0;
            break;
    }
}

//setup event handlers
function addEventHandlers(){
    document.addEventListener("keydown",KeyDown);
    document.addEventListener("keyup",KeyUp);
}
addEventHandlers();



function update(){
    // draw space
    RenderSpace();
    // draw triangular ship
    RenderShip();
    // rotate ship
    ship.a += ship.rot;
    // thrust the ship
    if(ship.thrusting){
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
        // Draw the thruster
        ctx.fillStyle = "red"
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = SHIP_SIZE / 10;
        ctx.beginPath();
        ctx.moveTo( //rear left
            ship.x - ship.r * (2/3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2/3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
        );

        ctx.lineTo( // rear center: behind the ship
            ship.x - ship.r * 6/3 * Math.cos(ship.a),
            ship.y + ship.r * 6/3 * Math.sin(ship.a)
        );

        ctx.lineTo( // rear right
            ship.x - ship.r * (2/3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2/3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        );

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }else{
        ship.thrust.x -= FRICTION*ship.thrust.x /FPS;
        ship.thrust.y -= FRICTION*ship.thrust.y /FPS;
    }
    


    // move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // handle edge of screen
    if(ship.x < 0 - ship.r){
        ship.x = canvas.width + ship.r;
    }else if(ship.x > canvas.width + ship.r){
        ship.x = 0 - ship.r;
    }
    if(ship.y < 0 - ship.r){
        ship.y = canvas.height + ship.r;
    }else if(ship.y > canvas.height + ship.r){
        ship.y = 0 - ship.r;
    }



    // center dot
    ctx.fillStyle = "red";
    //ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
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
        ship.x - ship.r * (2/3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2/3 * Math.sin(ship.a) - Math.cos(ship.a))
    );

    ctx.lineTo( // rear right
        ship.x - ship.r * (2/3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2/3 * Math.sin(ship.a) + Math.cos(ship.a))
    );

    ctx.closePath();
    ctx.stroke();
}


function newAsteroid(x,y){
    var roid = {
        x:x,
        y:y,
        xv: Math.random() * ROID_SPD
    }
}