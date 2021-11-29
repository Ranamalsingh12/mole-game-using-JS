const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreboard = document.querySelector('.score');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min ,max){
    return Math.random(Math.random() * (max -min) + min);
}

function randomHole(holes){
    const idx = Math.floor(Math.random()* holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        console.log('AAH thats the same one folks');
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function popingup(){
    const time = randomTime(200,1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) popingup();
      },800);
}

function startGame(){
    scoreboard.textContent = 0;
    timeUp = false;
    score = 0;
    popingup();
    setTimeout(() => timeUp = true ,10000);
}

function bonk(e){
    if(!e.isTrusted) return ;   //cheater
    score++;
    this.classList.remove('up');
    scoreboard.textContent = score;
    console.log(e);
}

moles.forEach(mole => mole.addEventListener('click',bonk));