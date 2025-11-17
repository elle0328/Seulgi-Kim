let pianoImg;
let osc;
let circles = [];
let lastNote = null;
let noteTimer = 0;

const notes = {
  "도": 261.63,
  "도#": 277.18,
  "레": 293.66,
  "레#": 311.13,
  "미": 329.63,
  "파": 349.23,
  "파#": 369.99,
  "솔": 392.00,
  "솔#": 415.30,
  "라": 440.00,
  "라#": 466.16,
  "시": 493.88,
  "도2": 523.25
};

const keyAreas = {
  "도": [
    {"x":0,"y":203,"w":51,"h":108},{"x":1,"y":0,"w":27,"h":200}
  ],
  "도#": [
    {"x":28,"y":0,"w":37,"h":201}
  ],
  "레": [
    {"x":52,"y":200,"w":55,"h":112}, {"x":62,"y":2,"w":32,"h":197}
  ],
  "레#": [
    {"x":94,"y":0,"w":31,"h":197}
  ],
  "미": [
    {"x":107,"y":200,"w":50,"h":111}, {"x":127,"y":1,"w":30,"h":199}
  ],
  "파": [
    {"x":158,"y":201,"w":52,"h":110}, {"x":161,"y":1,"w":24,"h":199}
  ],
  "파#": [
    {"x":187,"y":1,"w":33,"h":199}
  ],
  "솔": [
    {"x":211,"y":201,"w":51,"h":108}, {"x":220,"y":3,"w":26,"h":196}
  ],
  "솔#": [
    {"x":246,"y":0,"w":32,"h":197}
  ],
  "라": [
    {"x":265,"y":200,"w":49,"h":112}, {"x":279,"y":3,"w":27,"h":196}
  ],
  "라#": [
    {"x":307,"y":1,"w":32,"h":197}
  ],
  "시": [
    {"x":317,"y":199,"w":51,"h":112}, {"x":339,"y":2,"w":29,"h":197}
  ],
  "도2": [
    {"x":368,"y":199,"w":52,"h":112}, {"x":370,"y":1,"w":29,"h":197}
  ]
};

function preload() {
  pianoImg = loadImage("piano_image.jpg");
}

function setup() {
  createCanvas(pianoImg.width, pianoImg.height);
  osc = new p5.Oscillator('sine');
  osc.amp(0);
  osc.start();
}

function draw() {
  background(255);
  image(pianoImg, 0, 0, width, height);

  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    drawGradientCircle(c.x, c.y, 20, c.life);
    c.life--;
    if (c.life <= 0) circles.splice(i, 1);
  }

  if (lastNote && frameCount - noteTimer < 60) {
    fill(180, 100, 255);
    textSize(28);
    textAlign(CENTER, TOP);
    text(lastNote, width / 2, 10);
  }
}

function mousePressed() {
  let noteName = getClickedNote(mouseX, mouseY);
  if (noteName) {
    playNote(noteName);
    circles.push({ x: mouseX, y: mouseY, life: 30 });
    lastNote = noteName;
    noteTimer = frameCount;
    console.log(`눌린 음: ${noteName}`);
  }
}

function mouseReleased() {
  stopNote();
}

function getClickedNote(x, y) {
  const blackKeys = ["도#","레#","파#","솔#","라#"];
  
  for (let key of blackKeys) {
    for (let area of keyAreas[key]) {
      if (x > area.x && x < area.x + area.w && y > area.y && y < area.y + area.h) {
        return key;
      }
    }
  }

  for (let key in keyAreas) {
    if (blackKeys.includes(key)) continue;
    for (let area of keyAreas[key]) {
      if (x > area.x && x < area.x + area.w && y > area.y && y < area.y + area.h) {
        return key;
      }
    }
  }
  return null;
}

function playNote(noteName) {
  let freq = notes[noteName];
  if (freq) {
    osc.freq(freq);
    osc.amp(0.5, 0.05);
  }
}

function stopNote() {
  osc.amp(0, 0.2);
}

function drawGradientCircle(x, y, r, life) {
  noFill();
  for (let i = r; i > 0; i--) {
    let alpha = map(i, 0, r, 255, 30);
    alpha *= (life / 30);
    stroke(150, alpha);
    circle(x, y, i * 2);
  }
}
