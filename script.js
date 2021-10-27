const startBtn = document.getElementById('startBtn');
const start = document.querySelector('#start');
const lifes = document.getElementById('lifes');
const score = document.querySelector('#score span');
const player = document.querySelector('audio');
// const audioF = document.querySelector('#audioF');
// const audioS = document.querySelector('#audioS');
const source = document.querySelector('audio source');
const gameBlock = document.querySelector('#game');
const soundBtn = document.querySelector('#sound img');
const gamer = document.querySelector('#player');

let gamerSkin = 'skin_1';
let countLifes = 3;

startBtn.onclick = function () {
    startGame();
}

let sound = 'off';

soundBtn.onclick = function () {

    if (sound=='on') {
        soundBtn.src = 'images/mute_sound.png';
        sound = 'off';
        player.pause();
    } else {
        soundBtn.src = 'images/sound_on.png';
        sound = 'on';
       
         source.src = "audio/Stay.mp3";
        player.load();
         player.play();
    }
    
}

document.onkeydown = function (e) {
    // moveGamer(gamer)
    console.dir(e)
    if (e.keyCode == 38) {
        gamer.style.top = gamer.offsetTop - 40 + 'px';
    }
    if (e.keyCode == 40) {
        gamer.style.top = gamer.offsetTop + 40 + 'px';
    }
    if (e.keyCode == 32) {
        createBullet();
    }
}

function startGame() {
start.style.display = 'none';
    gameBlock.style.display = 'block';
    gamer.className = gamerSkin;
    
    createEnemy();
    createLifes();

}

function moveEnemy(enemy) {
  
     let timerId= setInterval(function () {
          enemy.style.left = enemy.offsetLeft - 10 + 'px';
          if (enemy.offsetLeft < -100) {
              enemy.remove();
              createEnemy();
              clearInterval(timerId);
              die();
          }
    },30)
}

function moveBullet(bullet) {
    let timer=setInterval(function () {
        bullet.style.left = bullet.offsetLeft + 10 + 'px';
      
        if (bullet.offsetLeft > document.querySelector('body').clientWidth) {
            bullet.remove();
            clearInterval(timer)
        }
        isBoom(bullet);
    },10)
}


function createEnemy() {
    let enemy = document.createElement('div');
    enemy.className = 'enemy '+typeEnemy();
    enemy.style.top = random(100,document.querySelector('#app').clientHeight-150) + 'px';
    
    gameBlock.appendChild(enemy);
    moveEnemy(enemy)
}

function typeEnemy() {
    
    if (random(1, 2) == 1) {
        return 'type-1';
    } else {
        return 'type-2';
    }
}

function createBullet() {
    let bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.top = gamer.offsetTop + 140 + 'px';

    gameBlock.appendChild(bullet);
    moveBullet(bullet)
};

function isBoom(bullet) {
    let enemy = document.querySelector('.enemy')
    if (bullet.offsetTop > enemy.offsetTop
        && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
        && bullet.offsetLeft > enemy.offsetLeft) {
        createBoom(bullet.offsetTop, bullet.offsetLeft);
        score.innerText = Number(score.innerText) +1;
        bullet.remove();
        enemy.remove();
        createEnemy();
        
    }
}

function die() {
    countLifes -= 1;
    if (countLifes <= 0) {
        endGame();
    }
    
    createLifes();
}
function createLifes() {
    lifes.innerHTML = '';
    let count = 0;
    while (count < countLifes) {
        let span = document.createElement('span');
        lifes.appendChild(span);
        count += 1;
    }
}

function createBoom(top,left) {
    let boom = document.createElement('div');
    boom.className = 'boom';
    boom.style.top = top -100+ 'px';
    boom.style.left = left-100 + 'px';
    gameBlock.appendChild(boom);
    setTimeout(function () {
        boom.remove();
    }, 1000);
}

function endGame() {
let scoreBlock = document.querySelector('#end h3 span');
    scoreBlock.innerText = score.innerText;

    gameBlock.innerHTML = '';
    let endBlock = document.querySelector('#end');
    endBlock.style.display = 'block';
    
    let restartBtn = document.querySelector('#end button')
    restartBtn.onclick = restart;
}

function restart() {
    location.reload();
}

function random(min,max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const selectSkin1 = document.querySelector('#skin_1');
selectSkin1.onclick = function () {
    selectSkin1.className = 'selected';
    selectSkin2.className = '';
    gamerSkin = 'skin_1';
}
const selectSkin2 = document.querySelector('#skin_2');
selectSkin2.onclick = function () {
    selectSkin2.className = 'selected';
    selectSkin1.className = '';
    gamerSkin = 'skin_2';
}