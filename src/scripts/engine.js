const state = { /* Divisão entre elementos que alteram algo visual (view)
                e elementos de lógica */
    view: {
        squares: document.querySelectorAll(".square"), /* Pegando todas as divs com classe square */ 
        enemy: document.querySelector(".enemy"), /* Capturando a enemy */
        timeLeft: document.querySelector("#time-left"), /* Pegando o h2 com id = time-left */ 
        score: document.querySelector("#score"), /* Pegando o h2 com id = score */
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 16,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime --; /* Tempo de jogo diminuindo */
    state.view.timeLeft.textContent = state.values.currentTime; /* Tornando visual o passar do tempo */

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Sua pontuação foi: " + state.values.result)
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() { /* Função que vai escolher um quadrado aleatorio para o inimigo */
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); /* Percorrendo todos os quadrados e removendo o inimigo */
    })

    let randomNumber = Math.floor(Math.random() * 9); /* Sorteando um num aleatorio de 1 a 9 */
    let randomSquare = state.view.squares[randomNumber]; /* Pegando o quadrado do numero que sorteou */
    randomSquare.classList.add("enemy"); /* Atribuindo o inimigo ao quadrado */
    state.values.hitPosition = randomSquare.id; /* Guardando a posição do inimigo */ 
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) { /* Se o quadrado que o usuario clicou for igual ao quadrado aleatorio */
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; 
                playSound("hit");
            } else {
                playSound("fail");
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
}

initialize();