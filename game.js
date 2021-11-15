

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: null,
    aiHand: null
}

const hands = [...document.querySelectorAll('.select img')];


function handSelection() {
    game.playerHand = this.dataset.option;
    // console.log(game.playerHand);
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px green';
    
}



//resetowanie
function reset() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = null;
    game.playerHand = null; //wspólna część obydwu sposobów w tej funkcji (góra i dół w komentarzu)
    // hands.forEach(hand => hand.style.boxShadow = '');
}

//wybór ai
function aiChoice() {
    const aiHand = hands[Math.floor(Math.random()*hands.length)].dataset.option;
    return aiHand;
}

//sprawdzenie wyniku 
function chceckResult(player, ai) {
    // console.log(player, ai);
    if(player === ai) {
        return 'draw'
    } else if((player === "papier"&& ai==="kamień")||(player==="kamień" &&ai==="nożyczki") || (player==="nożyczki" && ai==="papier")) {
        return 'win'
    } else {
        return 'loss'
        
    }
}

//publikacja wyniku (switch i if)
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    
    switch(result) {
        case 'win':
            document.querySelector('p.wins span').textContent = ++gameSummary.wins;
            document.querySelector('[data-summary = "who-win"]').textContent = "Wygrałeś :D";
            document.querySelector('[data-summary = "who-win"]').style.color = "green";
            break;
        case 'loss':
            document.querySelector('p.losses span').textContent = ++gameSummary.losses;
            document.querySelector('[data-summary = "who-win"]').textContent = "Wygrał Komputer :(";
            document.querySelector('[data-summary = "who-win"]').style.color = "red";
            break;
        case 'draw':
            document.querySelector('p.draws span').textContent = ++gameSummary.draws;
            document.querySelector('[data-summary = "who-win"]').textContent = "Remis :\\";
            document.querySelector('[data-summary = "who-win"]').style.color = "gray";
            break;
        default:
            console.log('brak');
            
    }
}
//funkcja sterująca
function startGame() {
    if(!game.playerHand) {
        return alert("Wybierz papier, kamień lub nożyczki") 
    } 
    game.aiHand = aiChoice();
    const gameResult = chceckResult(game.playerHand, game.aiHand)
    // console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult)
    reset()
}

//wybór papier kamień nożyce gracza
hands.forEach(hand => hand.addEventListener('click', handSelection))

//oznaczenie przycisku
document.querySelector('.start').addEventListener('click', startGame)