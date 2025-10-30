let sun;
let planets = [];
let planetImages = {};
let stars = [];

function preload() {
  sun = loadImage("assets/sol.jpg");
  planetImages = {
    mercurio: loadImage("assets/mercurio.jpg"),
    venus: loadImage("assets/venus.jpg"),
    terra: loadImage("assets/terra.jpg"),
    marte: loadImage("assets/marte.jpg"),
    jupiter: loadImage("assets/jupiter.jpg"),
    saturno: loadImage("assets/saturno.jpg"),
    urano: loadImage("assets/urano.jpg"),
    netuno: loadImage("assets/netuno.jpg"),
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  // Cria poucas estrelas fixas no fundo (leve)
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(-2000, 2000),
      y: random(-2000, 2000),
      z: random(-2000, 2000),
      brightness: random(150, 255)
    });
  }

  planets = [
    new Planet(planetImages.mercurio, 10, 100, 2.5),
    new Planet(planetImages.venus, 14, 160, 1.9),
    new Planet(planetImages.terra, 16, 230, 1.5),
    new Planet(planetImages.marte, 12, 300, 1.2),
    new Planet(planetImages.jupiter, 35, 400, 0.9),
    new Planet(planetImages.saturno, 30, 500, 0.7),
    new Planet(planetImages.urano, 25, 600, 0.5),
    new Planet(planetImages.netuno, 25, 680, 0.4),
  ];
}

function draw() {
  background(0);
  orbitControl();

  // Desenha estrelas
  push();
  noStroke();
  for (let s of stars) {
    push();
    translate(s.x, s.y, s.z);
    fill(s.brightness);
    sphere(1.5);
    pop();
  }
  pop();

  // Luz do sol
  ambientLight(80);
  pointLight(255, 255, 255, 0, 0, 0);

  // Câmera
  rotateX(80);
  rotateZ(frameCount * 0.03);

  // Sol
  push();
  noStroke();
  emissiveMaterial(255, 200, 80);
  texture(sun);
  sphere(60);
  pop();

  // Órbitas
  noFill();
  stroke(80);
  for (let p of planets) {
    ellipse(0, 0, p.distance * 2);
  }

  // Planetas
  for (let p of planets) {
    p.update();
    p.show();
  }
}

class Planet {
  constructor(img, size, distance, speed) {
    this.img = img;
    this.size = size;
    this.distance = distance;
    this.angle = random(360);
    this.speed = speed;
  }

  update() {
    this.angle += this.speed;
  }

  show() {
    push();
    rotateZ(this.angle);
    translate(this.distance, 0);
    noStroke();
    texture(this.img);
    sphere(this.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
