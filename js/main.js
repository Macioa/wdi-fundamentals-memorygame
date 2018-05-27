console.log("Up and running!");


/*var cards = [
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
];*/
var cards = [];
var deckColor = "Blue";
var numMatches = 0;
var numFails = 0;

function createDeck(){
    for (s=0; s<4; s++)
    {
        var suit;
        switch (s)
        {
            case 0: suit = "Clubs"; break;
            case 1: suit = "Spades"; break;
            case 2: suit = "Hearts"; break;
            case 3: suit = "Diamonds"; break;
        }
        for (c=1; c<=13; c++)
        {   
            var card;
            switch(c)
            {
                case 1: card = "Ace"; break;
                case 11: card = "Jack"; break;
                case 12: card = "Queen"; break;
                case 13: card = "King"; break;
                default: card = c;
            }
            var newCard = {
                rank: card,
                suit: suit,
                cardImage: "images/"+card+suit+".png",
                showing: false
            }
            cards.push(newCard);
        }
    }
}

createDeck();
var cardsInPlay = [];
var imgsInPlay = [];


function checkForMatch(){
    if (cardsInPlay.length>=2)
        {
            if (cardsInPlay[0].rank==cardsInPlay[1].rank)
                {
                    alert("You found a match!");
                    numMatches++;
                    cardsInPlay = [];
                    imgsInPlay = [];
                    return true;
                }
            else 
                {
                    alert("Sorry, try again.");
                    numFails++;
                    setTimeout(function(){
                        cardsInPlay.forEach(function(card){card.showing=false;});
                        cardsInPlay = [];
                        imgsInPlay.forEach(function(image){image.setAttribute('src',"images/"+deckColor+".png")});
                        imgsInPlay = []; }, 3000);
                    return false;
                }
            
        }
    else return true;
}

function flipCard(){
    var cardId = this.getAttribute('data-id');

    if (!cards[cardId].showing)
    {
        this.setAttribute('src',cards[cardId].cardImage);
        cards[cardId].showing = true;

        console.log("Flipped "+cards[cardId].rank+" of "+cards[cardId].suit);

        cardsInPlay.push(cards[cardId]);
        imgsInPlay.push(this);
        checkForMatch();
    }
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

function createBoard(){
    cards = shuffleCards(cards);

    var boardelement = document.getElementById('game-board');
    for (var i=1; i <= cards.length; i++)
        {
            var newCard = document.createElement('img');
            newCard.setAttribute('src',"images/"+deckColor+".png");
            newCard.setAttribute('data-id',i);
            newCard.addEventListener('click',flipCard);
            boardelement.appendChild(newCard);
        }
}


createBoard();



