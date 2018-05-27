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

var cards = [], matchedcards = [];
var deckColor = "Blue";
var numMatches = 0;
var numFails = 0;
var startTime;
var cardClearQueue = [];
var imageClearQueue = [];

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
                    updateMatchedScore();
                    matchedcards.push(cardsInPlay[0]);
                    matchedcards.push(cardsInPlay[1])
                    cardsInPlay = [];
                    imgsInPlay = [];
                    if (matchedcards.length==cards.length)
                    {
                        var endTime = new Date().getTime();
                        var timeLapsed = endTime - startTime;
                        timeLapsed=timeLapsed/1000;
                        alert("YOU WIN! Time: "+timeLapsed+" seconds");
                        document.getElementById('game-board').innerHTML="";
                    }
                    return true;
                }
            else 
                {
                    alert("Sorry, try again.");
                    numFails++;
                    updateMissedScore();
                    cardsInPlay.forEach(function(card){cardClearQueue.push(card)});
                    imgsInPlay.forEach(function(image){imageClearQueue.push(image)});
                    cardsInPlay = [];
                    imgsInPlay = [];
                    setTimeout(function(){
                        while (cardClearQueue.length)
                            cardClearQueue.pop().showing=false;
                        while (imageClearQueue)
                            imageClearQueue.pop().setAttribute('src',"images/"+deckColor+".png");
                        }, 1000);
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
        setTimeout(function(){checkForMatch();},250);
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
            newCard.setAttribute('data-id',i-1);
            newCard.addEventListener('click',flipCard);
            boardelement.appendChild(newCard);
        }
    
}

function clearBoard(){
    document.getElementById("game-board").innerHTML="";
}

function updateMatchedScore(){
    document.getElementById('matches').innerHTML="Matched<br>"+numMatches;
}
function updateMissedScore(){
    document.getElementById('missed').innerHTML="Missed<br>"+numFails;
}

function updateScoreBoard(){
    document.getElementById("scoreboard").style.visibility="visible";
    updateMatchedScore();
    updateMissedScore();
}

function start(){
    clearBoard();
    
    matchedcards = [];
    if (deckColor == "Blue")
        deckColor = "Red";
    else deckColor = "Blue";
    numMatches = 0;
    numFails = 0;
    cardClearQueue = []; 
    imageClearQueue = [];

    document.getElementById("start").innerHTML="Restart";
    updateScoreBoard();

    document.getElementById("game-board").style.visibility="visible";
    createBoard();

    startTime = new Date().getTime();
    setInterval(function(){ 
        var currentTime = new Date().getTime();
        var timePassed = Math.floor((currentTime-startTime)/1000);
        var seconds = timePassed%60;
        var minutes = Math.floor(timePassed/60);
        seconds = seconds.toString();
        if (seconds.length==1)
            seconds = "0"+seconds;
        document.getElementById('time').innerHTML="Time<br>"+minutes+":"+seconds;
     }, 1000);

     window.location = "#scoreboard";
}




