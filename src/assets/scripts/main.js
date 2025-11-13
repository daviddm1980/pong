const tablero = document.getElementById('tablero');

// pelota, variables;
const ball = document.getElementById('ball');

const velBall = 10;
let ballX = 0;
let ballY = 0;
let dirBallX = 1;
let dirBallY = 1;

// paleta, variables;
const pala = document.getElementById('pala');

let palaY = 0;
const veloPala = 5;
let stopID = null;
let contador = 0;

// Ball funciones;
function rebote() {
    const limiteX = tablero.clientWidth - 20;
    const limiteY = tablero.clientHeight - 20;
    ballX += velBall * dirBallX;
    ballY += velBall * dirBallY;

    if(ballY > limiteY) {
        ballY = limiteY;
        dirBallY = -1;
    } else if (ballY < 0) {
        ballY = 0;
        dirBallY = 1;
    }

    if (ballX > limiteX) {
        ballX = limiteX;
        dirBallX = -1;
    } else if (ballX < 0) {
        contador++;
        dirBallX = 1;
        puntos(contador);
    }
    updateBall();
    colision();
}

function updateBall() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}
setInterval(rebote,20);

// Pala funciones;
const limiteY = tablero.clientHeight - pala.clientHeight;

function palaDown() {
    stopInterval();
    stopID = setInterval(()=> {
        palaY += veloPala;
        if (palaY > limiteY) {
            palaY = limiteY;
        }
        pala.style.top = `${palaY}px`;
    });
}

function palaUp() {
    stopInterval();
    stopID = setInterval(()=> {
        palaY -= veloPala;
        if (palaY < 0) {
            palaY = 0;
        }
        pala.style.top = `${palaY}px`;
    });
}

function stopInterval() {
    if (stopID !== null) {
        clearInterval(stopID);
        stopID = null;
    }
}

// colision pelota pala;
function colision() {
    const palaRect = pala.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    const colisiones = 
            palaRect.right > ballRect.left &&
            palaRect.left < ballRect.right &&
            palaRect.top < ballRect.bottom &&
            palaRect.bottom > ballRect.top;

    if (colisiones) {
        dirBallX = 1;
    }
}

function puntos(contador) {
    const puntos = document.getElementById('puntos');
    puntos.innerText = contador;
}

// Controles;
document.addEventListener('keydown',event=> {
    if (event.key === 'w' || event.key === 'W') palaUp();
    if (event.key === 's' || event.key === 'S') palaDown();
});

document.addEventListener('keyup',event=> {
    if (event.key === 'w' || event.key === 'W') stopInterval();
    if (event.key === 's' || event.key === 'S') stopInterval();
});
