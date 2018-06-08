console.log("Up and running!");


/*var cards = [
    {
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png",
        showing: false
    },
    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png",
        showing: false
    },
    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png",
        showing: false
    },
    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png", 
        showing: false
    }
];*/

var cards = [], matchedcards = [];
var deckColor = "Blue";
var numMatches = 0;
var numFails = 0;
var startTime;
var cardClearQueue = [];
var imageClearQueue = [];
var gameTimer;

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
                    Match();
                    return true;
                }
            else 
                {
                    Miss();
                    return false;
                }
            
        }
    else return true;

    function Miss() {
        alert("Sorry, try again.");
        numFails++;
        updateMissedScoreboard();
        //remove cards from play and move them to clean up queue
        cardsInPlay.forEach(function (card) { cardClearQueue.push(card); });
        imgsInPlay.forEach(function (image) { imageClearQueue.push(image); });
        cardsInPlay = [];
        imgsInPlay = [];
        unflipUnmatchedCards();

        function unflipUnmatchedCards() {
            setTimeout(function () {
                while (cardClearQueue.length)
                    cardClearQueue.pop().showing = false;
                while (imageClearQueue.length)
                    imageClearQueue.pop().setAttribute('src', "images/" + deckColor + ".png");
            }, 1000);
        }
    }

    function Match() {
        alert("You found a match!");
        numMatches++;
        updateMatchedScoreboard();
        matchedcards.push(cardsInPlay[0]);
        matchedcards.push(cardsInPlay[1]);
        cardsInPlay = [];
        imgsInPlay = [];
        if (matchedcards.length == cards.length)
            endGame();
    }
}



function endGame(){
    var endTime = new Date().getTime();
    var timeLapsed = endTime - startTime;
    timeLapsed=timeLapsed/1000;
    alert("YOU WIN! Time: "+timeLapsed+" seconds");
    clearInterval(gameTimer);
    document.getElementById('game-board').innerHTML="";
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

function shuffleCards(deck, numShuffles = 3){ //simulates the shuffling of a deck of cards
    console.log(numShuffles);
    if (numShuffles>1)
        deck = shuffleCards(deck, numShuffles-1);
    var splitIndex = Math.floor(deck.length/2)-1;
    var part1 = deck.slice(0,splitIndex);
    var part2 = deck.slice(splitIndex+1,deck.length-1)
    var newDeck = []
    while (part1.length||part2.length){
        var coin = Math.floor(Math.random()*2);
        if (coin&&part1.length)
            newDeck.push(part1.pop(0));
        else if (part2.length)
            newDeck.push(part2.pop(0));
    }
    return newDeck;
}

function randomSwapCards(deck){
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
            cards[i-1].showing = false;
        }
    
}

function clearBoard(){
    document.getElementById("game-board").innerHTML="";
}

function updateMatchedScoreboard(){
    document.getElementById('matches').innerHTML="Matched<br>"+numMatches;
}
function updateMissedScoreboard(){
    document.getElementById('missed').innerHTML="Missed<br>"+numFails;
}

function updateScoreBoard(){
    document.getElementById("scoreboard").style.visibility="visible";
    updateMatchedScoreboard();
    updateMissedScoreboard();
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
    gameTimer = setInterval(function(){ 
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




