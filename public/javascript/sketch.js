

// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll = -30;
let pitch = 0;
let yaw = -20;




function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
 
  createEasyCam();

}
 


function draw() {
  background(255);


   noStroke();
   lights();
   directionalLight(255, 255, 255, 0.5, 0.5, -1);

   
   
   
rotateZ(pitch);
rotateX(roll);
rotateY(yaw);



ambientMaterial(255, 200, 200); // 小猪头部
  push();
  translate(0, -60, -35); 
  box(100, 90, 110);
  pop();
  
  ambientMaterial(0, 0, 0); // 鼻子左、鼻子右、眼睛左、眼睛右
  push();
  translate(-15, -50, 50);
  box(8); 
  pop();
  
  push();
  translate(15, -50, 50);
  box(8); 
  pop();
  
  push();
  translate(-30, -80, 30);
  box(9); 
  pop();
  
  push();
  translate(30, -80, 30);
  box(9); 
  pop();
  
  ambientMaterial(255, 150, 150); // 鼻子
  push();
  translate(0, -50, 35); 
  box(40, 30, 20);
  pop();
  

  
  ambientMaterial(255, 200, 200); // 前右腿、前左腿、后右腿、后左腿
  push();
  translate(32, -10, 0); 
  box(10, 20, 20);
  pop();
  
  push();
  translate(-32, -10, 0); 
  box(10, 20, 20);
  pop();
  
  push();
  translate(32, -10, -70); 
  box(10, 20, 20);
  pop();
  
  push();
  translate(-32, -10, -70); 
  box(10, 20, 20);
  pop();
  
  // 小猪尾巴，改成缠绕线柱体
  ambientMaterial(255, 150, 150); 
  push();
  translate(0, -70, -100); 
  rotateX(PI / 2); 
  torus(15, 4); 
  pop();
  
  ambientMaterial(255, 150, 150); // 耳朵左、耳朵右
  push();
  translate(-40, -110, -5); 
  rotateY(PI / 2); 
  box(20, 40, 10);
  pop();
  
  push();
  translate(40, -110, -5); 
  rotateY(-PI / 2); 
  box(20, 40, 10);
  pop();
  
  ambientMaterial(255); // 耳朵内部
  push();
  translate(-40, -105, 5); 
  rotateY(PI / 2); 
  box(10, 20, 10);
  pop();
  
  push();
  translate(40, -105, 5); 
  rotateY(-PI / 2); 
  box(10, 20, 10);
  pop();
  


}
//process the incoming OSC message and use them for our sketch
function unpackOSC(message){

  /*-------------

  This sketch is set up to work with the gryosc app on the apple store.
  Use either the gyro OR the rrate to see the two different behaviors
  TASK: 
  Change the gyro address to whatever OSC app you are using to send data via OSC
  ---------------*/

  //maps phone rotation directly 
  // if(message.address == "/gyrosc/gyro"){
  //   roll = message.args[0]; 
  //   pitch = message.args[1];
  //   yaw = message.args[2];
  // }

  //uses the rotation rate to keep rotating in a certain direction
  if(message.address == "/gyrosc/rrate"){
    roll += map(message.args[0],-3,3,-0.1,0.1);
    pitch += map(message.args[1],-3,3,-0.1,0.1);
    yaw += map(message.args[2],-3,3,-0.1,0.1);
  }
}

//Events we are listening for
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  console.log(_message);

  unpackOSC(_message);

});