//The game is your standard memory game where you will select two cards in the matix of cards. If those two cards are a match, they stay 'flipped' over and will change color. once you have matched the whole matrix of cards to one another, the game will end and your score/rating will appear along with the oppertunity to try again.
//card array to hold all of the cards
let card = document.getElementsByClassName("card");
//get cards and card
let cards = [...card];

// this is the deck of all the cards in the game
const deck = document.getElementById("deckOfCards");

//count for moves
let moves = 0;
let counter = document.querySelector(".numberOfMoves");

//var for stars
const stars = document.querySelectorAll(".fa-star");

// number of match
let matchedCard = document.getElementsByClassName("match");

 //stars list
 let starsList = document.querySelectorAll(".stars li");

 // close
 let closeicon = document.querySelector(".close");

 // modal
 let modal = document.getElementById("winningPopUp")

 // holds opened cards
var slectedCardsCheck = [];

//var endTimeTracking = new Date();


//display card to toggle open, show, disabled depending on actions in game
//https://www.w3schools.com/jsref/prop_element_classlist.asp
//The classList property returns the class name(s) of an element, as a DOMTokenList object.

//This property is useful to add, remove and toggle CSS classes on an element.

//The classList property is read-only, however, you can modify it by using the add() and remove() methods.
//https://stackoverflow.com/questions/49456631/toggle-class-to-show-cards
var displayCard = function (){
    this.classList.toggle("disabled");
    this.classList.toggle("open");
    this.classList.toggle("show");
//    this.classList.toggle("element");
};

//this is the game timer
var second = 0;
var sec;
var minute = 0;
var min;
var hour = 0;
var timer = document.querySelector(".timer");
var clock;

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", selectedSet);
    card.addEventListener("click", displayCard);
    card.addEventListener("click", showWinningModal);
};

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var count = array.length, temp, rndin;

    while (count !== 0) {
        rndin = Math.floor(Math.random() * count);
        count -= 1;
        temp = array[count];
        array[count] = array[rndin];
        array[rndin] = temp;
    }

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//shuffles cards when page is refreshed / loads
//welcome popup/alert
setTimeout(function(){ 
    alert("Welcome to a new game!\n To win, you must find all matching sets with a time under 1 min. \n GOOD LUCK!");
    gameStart();
}, 1000);

// starts game on load of document body
function gameStart(){
    
    // empty the selected cards array
    slectedCardsCheck = [];
    
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
// from     https://www.w3schools.com/jsref/met_node_appendchild.asp
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        
    }
    
    for (var i = 0; i < cards.length; i++){
        //remove unneeded classes for start
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    
    // reset rating
    for (var i= 0; i < 3; i++){
        stars[i].style.color = "gold";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    //zero timer 
    timer.innerHTML = "Click to start!";
    //clear interval
    clearInterval(clock);
}

//when player wins
function showWinningModal(){
    if (matchedCard.length == 16 || matchedCard.length > 16 ){
        
        endTime = new Date();
        
        var timeDiff = endTime - startTime; //in ms
          // strip the ms
          timeDiff /= 1000;
        
        
        clearInterval(clock);
        // show the winning modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        //https://www.w3schools.com/jsref/prop_html_innerhtml.asp
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = timeDiff;

    };
}

// if the player wants to play again and hits corresponding button
function playAgain(){
    modal.classList.remove("show");
    gameStart();
}

//// how to close the modal if player hits corresponding button
function closeModal(){
    modal.classList.remove("show");
    gameStart();
    
}

//moves counter after the card is opened and checks matched or unmatched
function selectedSet() {
    //adds curret selected onto end of array
    slectedCardsCheck.push(this);
    //see if 2 cards are opened and then check if matched or unmatched
    var len = slectedCardsCheck.length;
    
    moveCounter();
    
    if(len === 2){
        //if there are 2 new cards being looked at check if they are same type
        if(slectedCardsCheck[0].type === slectedCardsCheck[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

//if unmatched we reset the card to default state
function unmatched(){
    //add class unmatched
    slectedCardsCheck[0].classList.add("unmatched");
    slectedCardsCheck[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        //remove all classes we do not want to be on the card beause we dont know what state they are in
        slectedCardsCheck[0].classList.remove("no-event", "show", "open","unmatched");
        slectedCardsCheck[1].classList.remove("no-event", "show", "open","unmatched");
        enable();
        
        slectedCardsCheck = [];
    },1100);
}

//if matched we change class to matcha and disabled
function matched(){
    //add class matched and disabled to update the board
    slectedCardsCheck[0].classList.add("match", "disabled");
    slectedCardsCheck[1].classList.add("match", "disabled");
    //
    slectedCardsCheck[0].classList.remove("no-event", "show", "open");
    slectedCardsCheck[1].classList.remove("no-event", "show", "open");
    slectedCardsCheck = [];
}

//disable cards when matched
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//how to enable cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//for move counter
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        startTime = new Date(); 
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
//    stars[2].style.visibility = "collapse";
//        stars[1].style.visibility = "visible";
//        stars[0].style.visibility = "visible";
    if(moves <= 30){
        stars[2].style.visibility = "visible";
        stars[1].style.visibility = "visible";
        stars[0].style.visibility = "visible";
    }
    //    stars[2].style.visibility = "collapse";
//        stars[1].style.visibility = "visible";
//        stars[0].style.visibility = "visible";
    //you did ok
    if (moves > 30 && moves < 38){
        stars[2].style.visibility = "collapse";
        stars[1].style.visibility = "visible";
        stars[0].style.visibility = "visible";
        
    }
    //    stars[2].style.visibility = "collapse";
//        stars[1].style.visibility = "visible";
//        stars[0].style.visibility = "visible";
    //if you did bad
    else if (moves >= 38){
        stars[2].style.visibility = "collapse";
        stars[1].style.visibility = "collapse";
        stars[0].style.visibility = "visible";
    }
}

//timer starts
function startTimer(){
    clock = setInterval(function(){
        if(minute==0){
            min ="00";
           }
        else{
            min = minute;
        }
        if(sec<9){
           sec = "0"+second;
           }
        else{
            sec = second;
        }
        timer.innerHTML = min+":"+sec;
        second++;
        if(second == 60){
            minute++;
            second=0;
            alert("One min has passed");
            if(minute==60){
                alert("One hour has passed");
            }
        }
        //every sec
    },1000);
//        endTime = new Date();
//        
//        var timeDiff = endTime - startTime; //in ms
//          // strip the ms
//          timeDiff /= 1000;
//    timer.innerHTML= timeDiff + "seconds";
}