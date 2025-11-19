//This code references the 'click and drag' example taken from the ma1805 code repository. 

class Draggable {
  constructor(x, y, w, h, img) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.initx = x;
    this.inity = y;
    this.img = img;
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
    //change position ONLY if within limits
    let newx = mouseX + this.offsetX;
    let newy = mouseY + this.offsetY;
    let pos_dist = dist(newx, newy, 500, 380) //if the distance from the centre is too far the position resets

    if (this.dragging && pos_dist < 295) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    } else if (this.dragging) {
      this.x = this.initx;
      this.y = this.inity;
    }
  }
  
  show() {
    stroke(0);
    image(this.img, this.x, this.y, this.w, this.h);
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