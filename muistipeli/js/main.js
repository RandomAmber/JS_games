document.addEventListener("DOMContentLoaded", () => {

//Taulukko, joka sisältää pelin käytössä olevat kortit

const cardArray = [
{
  name:"fries",
  img:"img/fries.png"
},
{
  name:"cheeseburger",
  img:"img/cheeseburger.png"
},
{
  name:"hotdog",
  img:"img/hotdog.png"
},
{
  name:"ice-cream",
  img:"img/ice-cream.png"
},
{
  name:"milkshake",
  img:"img/milkshake.png"
},
{
  name:"pizza",
  img:"img/pizza.png"
},
];

//console.log(cardArray);

//monistetaan taulukossa olevat kortit
cardArray.push(...cardArray);

//Sekoitetaan kortit
//cardArray.sort(function(a,b){ return 0.5 - Math.random()});
cardArray.sort((a,b) => 0.5 -  Math.random());

const grid = document.querySelector(".grid");
const result = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard(){
  for(let i=0; i < cardArray.length; i++){
    const card = document.createElement("img");
    card.setAttribute("src", "img/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
    console.log(`blah blah${createBoard}`)
  }
}

function flipCard(){
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if(cardsChosenId.length === 2){
    setTimeout(checkForMatch, 500);
  }
}


// tarkistetaan ovatko samoja kortteja
function checkForMatch(){
  //alert("tarkista ovatko kortit samat");
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if(optionOneId === optionTwoId){
    cards[optionOneId].setAttribute("src", "img/blank.png");
    //cards[optionTwoId].setAttribute("src", "img/blank.png");
    alert("Valitsit samaan kuvan uudestaan");
  } else if (cardsChosen[0] === cardsChosen[1]){
      cards[optionOneId].setAttribute("src", "img/white.png");
      cards[optionTwoId].setAttribute("src", "img/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      alert("Löysit parit! Olet paras!")
      cardsWon.push(cardsChosen)
  }else{
    cards[optionOneId].setAttribute("src", "img/blank.png");
    cards[optionTwoId].setAttribute("src", "img/blank.png");
    alert("Yritä uudestaan");
  }


  cardsChosen = [];
  cardsChosenId = [];
  result.innerHTML = cardsWon.length;

  if(cardsWon === cardsArray / 2){
    result.innerHTML = "Onnea! Löysit kaikki parit!";
    //alert("Onnea! Löysit kaikki parit!")

  }
}



createBoard();
});
