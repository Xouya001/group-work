//Work Title：Dragon Welcomes the Chinese New Year
//Group Member: Xinyi Ouyang, Xumiao Wei, Xiaoyu Ge, Yu Yan

//Introduction:
//The interactive dynamic image we've created is inspired by 
//a Chinese idiom, "二龙戏珠" (Two Dragons Playing with a Pearl), which 
//describes a traditional Chinese artistic motif. This motif typically 
//features two dragons swirling around a pearl, symbolizing auspiciousness 
//and freedom. In our image, however, the pearl is playfully replaced with 
//a pig. This substitution stems from a pun in Chinese, where the word for
//pearl, "珠（zhu）," shares its pronunciation with the word for pig, also "猪（zhu）," 
//adding a touch of cuteness to the scene. Thus, we've adapted the motif 
//into "Two Dragons Playing with a Pig." Additionally, the dragons in the 
//scene spew gold coins, signifying wealth and prosperity, against a red 
//background that embodies the festive spirit of Chinese New Year. 
//The entire scene is filled with rising "福（Fu）" characters, wishing 
//everyone a year brimming with blessings. The background music is a 
//classic Chinese New Year song performed by Andy Lau, titled "Gong Xi Fa Cai," 
//enhancing the joyous atmosphere of welcoming the Year of the Dragon. 
//Overall, the significance of this interactive dynamic image is to extend 
//our best wishes for the Chinese New Year, hoping that everyone will enjoy 
//prosperity, luck, and freedom every day of the Dragon Year, and become the 
//most endearing version of themselves.

//Coding part:
//Establish a connection to the server
const socket = io();

//Global variables
let canvas;
let roll = -30;
let pitch = 0;
let yaw = -20;
let loongModel;
let loongTexture;
let angle = 0;
let fireParticleSystem;
let loongHeadPosition;
let fireParticleSystem2;
let loongHeadPosition2;
let coinModel;
let cloudModel; 
let mintColor;
let fuCharacters = []; 
let bgMusic;

//Load models and music
function preload() {
  loongModel = loadModel('model/loong.obj', true);
  loongTexture = loadImage('model/123.jpg');
  coinModel = loadModel('model/coin.obj', true);
  cloudModel = loadModel('model/cloud1.obj', true);
  bgMusic = loadSound('sound/Chinese New Year music.mp3');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();

//Creat "福(Fu)"
for (let i = 0; i < 50; i++) {
  let graphics = createGraphics(100, 100);
  graphics.background(255, 0, 0, 0); // Transparent background
  graphics.fill(255, 215, 0); // Gold color
  graphics.textAlign(CENTER, CENTER);
  graphics.textSize(64);
  graphics.text("福", 50, 50);
  let fuTexture = graphics.get();
  fuCharacters.push(new FuCharacter(fuTexture, createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-200, 200))));
}

//Play music and set volume
bgMusic.setVolume(0.1);
bgMusic.loop();

//Particle systems
  fireParticleSystem = new ParticleSystem(createVector(0, 0, 0));
  loongHeadPosition = createVector(-120, -140, -50);
  fireParticleSystem = new ParticleSystem(loongHeadPosition);
  loongHeadPosition2 = createVector(140, -140, -50);
  fireParticleSystem2 = new ParticleSystem(loongHeadPosition2);
}

function draw() {
  background(255,0,0);
  ambientLight(200);
  specularMaterial(120);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  noStroke();

  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);

  // Render dragon models
  ambientMaterial(255, 0, 0);
  push();
  texture(loongTexture);
  translate(-400, -60, -50);
  rotateX(PI);
  rotateY(PI / 2);
  scale(3, 3, 3);
  model(loongModel);
  pop();

  push();
  texture(loongTexture);
  translate(400, -60, -50);
  rotateX(PI);
  rotateY(-PI / 2);
  scale(3, 3, 3);
  model(loongModel);
  pop();

  //Render clouds
  mintColor = color(176, 224, 230); 
  let mintGreen = color(152, 251, 152); 
  let cloudColor = lerpColor(mintColor, mintGreen, random(1));

  ambientMaterial(cloudColor);
  push();
  translate(-80, 180, -120);
  rotateX(PI);
  scale(8);
  model(cloudModel);
  pop();

  // Draw pig and coins
  drawPig();
  fireParticleSystem.run();
  fireParticleSystem2.run();
  pop();
  drawFu();
}

function drawPig() {
  // Render pig
  ambientMaterial(255, 200, 200);
  push();
  translate(0, -60, -35);
  box(100, 90, 110);
  pop();
  
  ambientMaterial(0, 0, 0);
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
  
  ambientMaterial(255, 150, 150);
  push();
  translate(0, -50, 35);
  box(40, 30, 20);
  pop();
  
  ambientMaterial(255, 200, 200);
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
  
  ambientMaterial(255, 150, 150);
  push();
  translate(0, -70, -100);
  rotateX(PI / 2);
  torus(15, 4);
  pop();
  
  ambientMaterial(255, 150, 150);
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
  
  ambientMaterial(255);
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

//Draw "福(Fu)"
function drawFu() {
  fuCharacters.forEach(fu => {
    fu.update();
    fu.display();
  });
}

//福(Fu)'s position and speed
class FuCharacter {
  constructor(texture, position) {
    this.texture = texture;
    this.position = position;
    this.velocity = createVector(0, 0, -5); 
  }

  update() {
    this.position.add(this.velocity);
    // Reset position if out of bounds
    if (this.position.z < -400 || this.position.z > 400) {
      this.position.z = 200;
      this.position.x = random(-width / 2, width / 2);
      this.position.y = random(-height / 2, height / 2);
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(PI/2);
    rotateY(-PI/2);
    texture(this.texture);
    plane(50, 50);
    pop();
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    let p = new Particle(this.origin);
    this.particles.push(p);
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
    this.addParticle();
  }
}

class Particle {
  constructor(position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = position.copy();
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    fill(255, 255, 0, this.lifespan);
    noStroke();
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(10);
    pop();
  }

  isDead() {
    return this.lifespan < 0;
  }
}

//Additional functions for handling OSC messages and window resizing
function unpackOSC(message) {
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("disconnect", () => {
  console.log(socket.id);
});

socket.on("message", (_message) => {
  console.log(_message);
  unpackOSC(_message);
});