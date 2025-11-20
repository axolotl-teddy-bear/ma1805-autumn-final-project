let x_pos;
let y_pos;
let obj_pos = [];
let shapes = [];

let sec_limit = 25;
let sec_left;
let milis_limit = 25000; //1000milis is a second

function preload() {
  asset1 = loadImage("assets/images/bg.PNG");
  asset2 = loadImage("assets/images/hand_close.PNG");
  asset3 = loadImage("assets/images/hand_open.PNG");
  asset4 = loadImage("assets/images/leaf01.PNG");
  asset5 = loadImage("assets/images/leaf02.PNG");
  asset6 = loadImage("assets/images/leaf03.PNG");
  asset7 = loadImage("assets/images/leaf04.PNG");
  asset8 = loadImage("assets/images/leaf05.PNG");

  sound1 = loadSound("assets/audios/bg_music.wav");
  sound2 = loadSound("assets/audios/fail.mp3");
}

function setup() {
  createCanvas(1000, 750);
  let obj_num = floor(random(25, 35));
  for (let i = 0; i < obj_num; i++) {   //generate the amount of objs needed
    gen_obj(); // generate each object up to selected amount
  //When I was trying to make the objects draggablet, I found the process to be very confusing because my objects are stored in an array. to use the draggable() function (as seen in the ma1805 repository examples) i need an element that is an object.
    const obj = obj_pos[i];
    const leafImg = getLeafAsset(obj.amt);
    shapes.push(new Draggable(obj.x, obj.y, 50, 50, leafImg)); //making the objects draggable was the most frustrating element to add in this game. Especially when i want the positions and images of the leafs to be random, it took me a long time to figure out 
  }
  noCursor() //makes the cursor disappear
  sound1.play();
}

function draw() {
  audio_sp = millis() / 70000
  sound1.rate(1+audio_sp)

  background(220);
  image(asset1, 0, 0, 1000, 750); //table asset
  //circle(500, 380, 590) // outer plate area

  //CILANTRO GEN
  for (let i = 0; i < shapes.length; i++) { //drawing objs
    const shape = shapes[i];
    shape.over();
    shape.update();
    shape.show();

    // keep obj_pos in sync with the draggables position 
    obj_pos[i].x = shape.x;
    obj_pos[i].y = shape.y;
  }

  //CURSOR
  //makes the image change when the mouse is pressed
  fill(255);
  if (mouseIsPressed) {
    push();
    translate(-10, -80)
    image(asset2, mouseX, mouseY, 400, 500)
    pop();
  } else {
    push();
    translate(-10, -80)
    image(asset3, mouseX, mouseY, 400, 500)
    pop();
  } 

  //TIMER
  //reference link: https://editor.p5js.org/rainbowlazer/sketches/7UMxWVXyV
  sec_left = milis_limit - millis();
  if (sec_left >= 0) {
    sec_left = sec_left/1000
    push()
    fill('yellow');
    rect(30, 30, sec_left * 900/sec_limit, 30 );
    pop();
  } else if (sec_left < 0) {
    endGame()
  }
}

// top leaf moves first
function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].pressed();
    if (shapes[i].dragging) break;
  }
}

function mouseReleased() {
  for (const shape of shapes) {
    shape.released();
  }
}

function gen_obj() { //generates random position then adds then into the array
  x_pos = random(320, 650);
  y_pos = random(200, 525);
  obj_amt = floor(random(1, 6));
  obj_pos.push({ x: x_pos, y: y_pos, amt: obj_amt }); //makes the objs in the array draggables
}

function getLeafAsset(amount) {
  switch (amount) {
    case 1:
      return asset4;
    case 2:
      return asset5;
    case 3:
      return asset6;
    case 4:
      return asset7;
    case 5:
    default:
      return asset8;
  }
}

//ENDGAME
let hasPlayedSound = false; 
function endGame() {
  fill(127, 127)
  rect(0, 0, 1000, 750)
  fill(0)
  textAlign(CENTER)
  textSize(100);
  
  text("You lose :(", 500, 375)
    if (hasPlayedSound === false) {
    sound2.play(); // Play the sound
    hasPlayedSound = true; // Set flag to true to prevent replay
  }

  frameRate(0)
}