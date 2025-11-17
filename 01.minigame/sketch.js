let x_pos;
let y_pos;
let obj_pos = [];
let shapes = [];

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
    const obj = obj_pos[i];
    const leafImg = getLeafAsset(obj.amt);
    shapes.push(new Draggable(obj.x, obj.y, 50, 50, leafImg));
  }
}

function draw() {
  background(220);
  image(asset1, 0, 0, 1000, 750); //table asset

  for (let i = 0; i < shapes.length; i++) { //drawing objs
    const shape = shapes[i];
    shape.over();
    shape.update();
    shape.show();

    // keep obj_pos in sync with the draggables position 
    obj_pos[i].x = shape.x;
    obj_pos[i].y = shape.y;
  }

  //makes the image change when the mouse is pressed
  fill(255);
  if (mouseIsPressed) {
    push();
    translate(0, -85)
    image(asset2, mouseX, mouseY, 400, 500)
    pop();
  } else {
    push();
    translate(0, -85)
    image(asset3, mouseX, mouseY, 400, 500)
    pop();
  } 
}

function mousePressed() {
  // iterate backwards so the topmost leaf gets priority
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