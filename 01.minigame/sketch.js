let x_pos;
let y_pos;
let obj_pos = [];

function preload() {
  asset1 = loadImage("assets/bg.PNG");
  asset2 = loadImage("assets/hand_close.PNG");
  asset3 = loadImage("assets/hand_open.PNG");
  asset4 = loadImage("assets/leaf01.PNG");
  asset5 = loadImage("assets/leaf02.PNG");
  asset6 = loadImage("assets/leaf03.PNG");
  asset7 = loadImage("assets/leaf04.PNG");
  asset8 = loadImage("assets/leaf05.PNG");
}

function setup() {
  createCanvas(1000, 750);
  let obj_num = floor(random(5, 12));
  for (let i = 0; i < obj_num; i++) {   //generate the amount of objs needed
    gen_obj(); // generate each object up to selected amount
  //When I was trying to make the objects draggablet, I found the process to be very confusing because my objects are stored in an array. to use the draggable() function (as seen in the ma1805 repository examples) i need an element that is an object. 
  }
}

function draw() {
  background(220);
  //image(asset1, 0, 0, 1000, 750); //table asset
  circle(200, 200, 300);
  fill(0);
  circle(200, 200, 160);

  for (let obj of obj_pos) { //drawing objs
    fill(255, 0, 0);
    circle(obj.x, obj.y, 20);
  }

  //makes the image change when the mouse is pressed
  fill(255);
  if (mouseIsPressed) {
    push();
    translate(0, -85)
    image(asset2, mouseX, mouseY, 400, 450)
    pop();
  } else {
    push();
    translate(0, -85)
    image(asset3, mouseX, mouseY, 400, 450)
    pop();
  }

  
}

function gen_obj() { //generates random position then adds then into the array
  x_pos = random(145, 255);
  y_pos = random(145, 255);
  obj_pos.push({ x: x_pos, y: y_pos }); //makes the objs in the array draggables
}
