const socket = io();
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

function preload() {
  loongModel = loadModel('model/loong.obj', true);
  loongTexture = loadImage('model/123.jpg');
  coinModel = loadModel('model/coin.obj', true);
  cloudModel = loadModel('model/cloud1.obj', true);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  fireParticleSystem = new ParticleSystem(createVector(0, 0, 0));
  loongHeadPosition = createVector(-120, -140, -50);
  fireParticleSystem = new ParticleSystem(loongHeadPosition);
  loongHeadPosition2 = createVector(140, -140, -50);
  fireParticleSystem2 = new ParticleSystem(loongHeadPosition2);
}

function draw() {
  background(255);
  ambientLight(200);
  specularMaterial(120);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  noStroke();

  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);

  // 绘制龙模型
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

  // 绘制云朵
  mintColor = color(176, 224, 230); // 薄荷蓝色
  let mintGreen = color(152, 251, 152); // 薄荷绿色
  let cloudColor = lerpColor(mintColor, mintGreen, random(1));

  ambientMaterial(cloudColor);
  push();
  translate(-80, 180, -120);
  rotateX(PI);
  scale(8);
  model(cloudModel);
  pop();

  // 绘制小猪和金币粒子系统
  drawPig();
  fireParticleSystem.run();
  fireParticleSystem2.run();
  pop();
}

function drawPig() {
  // 绘制小猪
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
