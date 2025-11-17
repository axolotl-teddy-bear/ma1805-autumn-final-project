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
   shapes = new Draggable(obj_pos[i].x, obj_pos[i].y, 50, 50);
  }
}

//This code references the 'click and drag' example taken from the ma1805 code repository. 

class Draggable {
    constructor(x, y, w, h) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  
    over() {
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }
  
    show() {
      stroke(0);
      for (let obj of obj_pos) { //drawing objs
      if (obj.amt == 1) {
        image(asset4, obj.x, obj.y, 50, 50);
      } else if (obj.amt == 2) {
        image(asset5, obj.x, obj.y, 50, 50);
      } else if (obj.amt == 3) {
        image(asset6, obj.x, obj.y, 50, 50);
      } else if (obj.amt == 4) {
        image(asset7, obj.x, obj.y, 50, 50);
      } else if (obj.amt == 5) {
        image(asset8, obj.x, obj.y, 50, 50);
      }
    }
  }
  
    pressed() {
      // Did I click on the rectangle?
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
    }
  }

function draw() {
  background(220);
  image(asset1, 0, 0, 1000, 750); //table asset
  //circle(200, 200, 300);
  //fill(0);
  //circle(500, 375, 400);

  //the section below that draws the objs are based off of the 03.multiples project i did for the last assignment. 
    shapes.over();
    shapes.update();
    shapes.show();
  }

  //makes the image change when the mouse is pressed
  
  /*
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
    */

  


function mousePressed() {
  shapes.pressed();
}

function mouseReleased() {
  shapes.released();
}

function gen_obj() { //generates random position then adds then into the array
  x_pos = random(320, 650);
  y_pos = random(200, 525);
  obj_amt = floor(random(1, 6));
  obj_pos.push({ x: x_pos, y: y_pos, amt: obj_amt }); //makes the objs in the array draggables
}
