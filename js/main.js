console.log("Up and running!");


var cards = [
    {
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png"
    },
    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png"
    },
    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png"
    },
    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png"
    }
];

var cardsInPlay = [];

function checkForMatch(){
    if (cardsInPlay.length==2)
        {
            if (cardsInPlay[0].rank==cardsInPlay[1].rank)
                {
                    alert("You found a match!");
                }
            else alert("Sorry, try again.");
        }
}

function flipCard(){
    var cardId = this.getAttribute('data-id');
    console.log("Flipped "+cards[cardId].rank+" of "+cards[cardId].suit);

    this.setAttribute('src',cards[cardId].cardImage);

    cardsInPlay.push(cardId);
    checkForMatch();
}

function shuffleCards(deck){
    for (i = 0; i<deck.length/2+1; i++)
    {
        var firstIndex = Math.floor(Math.random()*deck.length);
        var secondIndex = Math.floor(Math.random()*deck.length);
        var holder = deck[firstIndex];
        deck[firstIndex]=deck[secondIndex];
        deck[secondIndex]=holder;
    }
    return deck;
}

function logCards(){

}


function createBoard(){
    cards = shuffleCards(cards);

    var boardelement = document.getElementById('game-board');
    for (var i=0; i < cards.length; i++)
        {
            var newCard = document.createElement('img');
            newCard.setAttribute('src',"images/back.png")
            newCard.setAttribute('data-id',i);
            newCard.addEventListener('click',flipCard);
            boardelement.appendChild(newCard);
        }
}



createBoard();



