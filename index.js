let playerFirst
let playerSecond
let dealerFirst
let dealerSecond
let playerCards = []
let dealerCards = []
let playerSum
let dealerSum
let playerHasBlackJack = false
let playerIsAlive = true
let dealerHasBlackJack = false
let dealerIsAlive = true
let dealerMinimum = 17
let message = ""
let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("playerSum-el")
let dealerSumEl = document.getElementById("dealerSum-el")
let playerCardsEl = document.getElementById("playerCards-el")
let dealerCardsEl = document.getElementById("dealerCards-el")
let winner
let vencedorEl= document.getElementById("vencedor-el")
let botaoPassar= document.getElementById("passar-btn")


function startGame() { //da as cartas, chama runGame (mostra apenas uma carta do dealer)
    isAlive = true
    playerFirst = getRandomCard()
    playerSecond = getRandomCard()
    dealerFirst = getRandomCard()
    dealerSecond = getRandomCard()
    playerCards = [playerFirst, playerSecond]
    dealerCards = [dealerFirst, dealerSecond]
    playerSum = playerCards[0] + playerCards[1]
    dealerSum = dealerCards[0] + dealerCards[1]
    if (playerSum === 21) {
        playerHasBlackJack = true
    }else if(playerSum>21){
        playerIsAlive=false
    }
    if (dealerSum === 21) {
        dealerHasBlackJack = true
    }else if(dealerSum>21){
        dealerIsAlive===false
    }
    playerCardsEl.textContent = "Cards: " + playerCards[0] + " " + playerCards[1]
    dealerCardsEl.textContent = "Cards: " + dealerCards[0] + " ?"
    playerSumEl.textContent = "Sum: " + playerSum
    runPlayerGame()
    console.log(playerCardsEl)
    console.log(dealerCardsEl)
    console.log(playerSum)
    console.log(dealerSum)
}

function runPlayerGame() { // faz a soma das cartas do jogador e do dealer, fala se perdeu, ganhou ou se pode comprar outra
    playerSumEl.textContent = "Sum: " + playerSum
    playerCardsEl.textContent = "Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.textContent += playerCards[i] + " "
    } if (playerSum <= 20) {
        message = "Pode comprar mais uma, se quiser tentar a sorte"
        messageEl.textContent = message
    } else if (playerSum === 21) {
        message = "BlackJack na mão, aí sim em"
        playerHasBlackJack = true
        messageEl.textContent = message
        botaoPassar.textContent= "Ver a mão do Dealer"
    } else {
        message = "Ihhh passou"
        messageEl.textContent = message
        playerIsAlive = false
        mensagemVencedor()
    }
    
}

function comprarCarta() { //adiciona uma carta ao vetor do player, chama runGame de novo
    if (playerIsAlive === true && playerHasBlackJack === false) {
        let cartaNova = getRandomCard()
        playerCards.push(cartaNova)
        playerSum += playerCards[playerCards.length - 1]
        playerSumEl.textContent += playerSum
        runPlayerGame()
    }
}

function passar() {//inicia a sequencia da maquina, comprando ate a soma ser 17 ou mais, no fim, chama quemVenceu()
    messageEl.textContent="Hora do Dealer!"
    dealerTurn()
}

function dealerTurn() {
    dealerCardsEl.textContent = "Cards: " + dealerCards[0] + " " + dealerCards[1]
    if (dealerSum < 17) {
        dealerComprar()
    } else {
        dealerSumEl.textContent = "Sum: " + dealerSum
    }
    mensagemVencedor()


}
function dealerComprar() {
    while (dealerSum < 17) {
        let dealerNewCard = getRandomCard()
        dealerCards.push(dealerNewCard)
        dealerSum += dealerCards[dealerCards.length - 1]
        dealerSumEl.textContent = "Sum: " + dealerSum
        dealerCardsEl.textContent = "Cartas: "
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsEl.textContent += dealerCards[i] + " "
        }
        if (dealerSum === 21) {
        dealerHasBlackJack = true
        break
    }

    if (dealerSum > 21) {
        dealerIsAlive = false
        break
    }
    }
}
    
    

    function mensagemVencedor() {
        vencedorEl.textContent = quemVenceu() + "é o vencedor!!!"
    }

    function quemVenceu() {//checa quem tem a carta menor que e mais proxima do 21, escreve que e o vencedor
        if (!playerIsAlive)
            return "O Dealer ";
        if (dealerHasBlackJack && playerHasBlackJack)
            disputaCartaMaior()
        if ((dealerIsAlive && !playerIsAlive) || (dealerHasBlackJack && !playerHasBlackJack))
            return "O Dealer ";
        if ((playerIsAlive && !dealerIsAlive) || (playerHasBlackJack && !dealerHasBlackJack))
            return "Você ";
        if (playerSum > dealerSum) return "Você ";
        if (playerSum < dealerSum) return "O Dealer ";

        return disputaCartaMaior();
    }

    function disputaCartaMaior() {
        messageEl.textContent = "Empate! Vamos decidir na carta maior então né"
        let cartaMaiorPlayer = getRandomCard()
        let cartaMaiorDealer = getRandomCard()
        playerCardsEl.textContent = cartaMaiorPlayer
        dealerCardsEl.textContent = cartaMaiorDealer
        if (cartaMaiorPlayer > cartaMaiorDealer) {
            return "Você "
        } else if (cartaMaiorPlayer < cartaMaiorDealer) {
            return "O Dealer "
        }
    }

    function getRandomCard() {
        let randomCard = Math.floor(Math.random() * 14) + 1
        if (randomCard === 1) {
            return 11
        } else if (randomCard > 10) {
            return 10
        } else {
            return randomCard
        }

    }