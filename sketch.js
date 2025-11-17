let inputH, inputM, inputS;
let button;
let alarms = [];          
let alarmButtons = []; 
let alarmSound;

function preload() {
  soundFormats('mp3', 'wav');
  alarmSound = loadSound('Blue Valentine.mp3');
}

function setup() {
  createCanvas(400, 450);
  textAlign(CENTER, CENTER);
  textSize(18);

  inputH = createInput();
  inputH.position(100, 150);
  inputH.size(50);
  inputH.attribute('placeholder', '시');

  inputM = createInput();
  inputM.position(160, 150);
  inputM.size(50);
  inputM.attribute('placeholder', '분');

  inputS = createInput();
  inputS.position(220, 150);
  inputS.size(50);
  inputS.attribute('placeholder', '초');

  button = createButton('알람 추가');
  button.position(290, 150);
  button.mousePressed(addAlarm);

  userStartAudio();
}

function draw() {
  background(240, 245, 255);

  fill(70, 80, 120);
  textSize(28);
  text("⏰ 알람 시계", width / 2, 40);

  let h = hour();
  let m = minute();
  let s = second();
  fill(40);
  textSize(24);
  text(`${nf(h, 2)} : ${nf(m, 2)} : ${nf(s, 2)}`, width / 2, 90);

  fill(80, 90, 130);
  textSize(20);
  text("📝 등록된 알람", width / 2, 210);

  fill(50);
  textSize(18);

  if (alarms.length === 0) {
    text("아직 알람이 없습니다.", width / 2, 240);
  } else {
    for (let i = 0; i < alarms.length; i++) {
      let a = alarms[i];

      text(
        `${i + 1}. ${nf(a.h, 2)}:${nf(a.m, 2)}:${nf(a.s, 2)}`,
        150,
        240 + i * 30
      );

      if (h === a.h && m === a.m && s === a.s) {
        if (!alarmSound.isPlaying()) {
          alarmSound.play();
        }
      }

    
      let btn = alarmButtons[i];
      if (btn) {
        btn.position(250, 232 + i * 30);
      }
    }
  }
}

function addAlarm() {
  let h = int(inputH.value());
  let m = int(inputM.value());
  let s = int(inputS.value());

  if (isNaN(h) || isNaN(m) || isNaN(s)) {
    alert("시 / 분 / 초를 숫자로 입력하세요!");
    return;
  }

  alarms.push({ h: h, m: m, s: s });

  let index = alarms.length - 1;
  let btn = createButton("끄기");
  btn.mousePressed(() => removeAlarm(index)); 
  alarmButtons.push(btn);

  console.log(`알람 추가됨 → ${h}시 ${m}분 ${s}초`);
}

function removeAlarm(index) {
  if (alarmSound.isPlaying()) {
    alarmSound.stop();
  }

  alarms.splice(index, 1);

  alarmButtons[index].remove();
  alarmButtons.splice(index, 1);

  console.log(`알람 ${index + 1}번 삭제됨 (소리도 정지됨)`);
}