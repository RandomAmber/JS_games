const squares = document.querySelectorAll(".grid div");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");

//määritetään pelin aloitusmuuttujia
let currentShooterIndex = 202;
let score = 0;
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19, 20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]
scoreDisplay

let invadersId; //hyökkäjien intervalli
let direction = 1;
let width = 15;
let aliensRemoved = [] // taulukko sisältää osutut hyökkääjät


//funktio, jos voitit
// function win(){
//     if(aliensRemoved.length = alienInvaders.length){
//         result.innerHTML = "Voitit!"
//         setTimeout(window.location.reload.bind(window.location), 1000);
//     }

// }

//funktio, joka lisää hyökkääjat pelialustaan
function drawAliens(){
    alienInvaders.forEach((value, index) =>{
    if(squares[value].classList.contains("shooter")){
        alert("Game over!");
        clearInterval(invadersId);
        return;
    };
    })
    alienInvaders.forEach((value, index) =>{
        if(!aliensRemoved.includes(index)){  
        squares[value].classList.add("invader");
        }
    })
}

function moveInvaders(){

    //tarkistetaan onko hyökkäja[0] vasemmassa reunassa
    //palauttaa joko true tai false

    const leftEdge = alienInvaders[0] % width === 0;

    //tarkistetaan onko hyökkäja[9] oikeassa reunassa
    //palauttaa joko true tai false

    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;


    alienInvaders.forEach((index) => {
        squares[index].classList.remove("invader");
    });

        if(rightEdge && direction ===1){
            for (let i = 0; i < alienInvaders.length; i++){
                alienInvaders[i]+= width;
            }
            direction = -1;
        }else if(leftEdge && direction === -1){
            for (let i = 0; i < alienInvaders.length; i++){
                alienInvaders[i]+= width;
            }
            direction = 1;
        } else {
            for (let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i]+= direction; }
    }

    drawAliens();
}



// pelin aloitusfunktio
function startGame(){
    score = 0;
    currentShooterIndex = 202;
    clearInterval(invadersId);
    scoreDisplay.innerHTML = score;
    squares[currentShooterIndex].classList.add("shooter");

    drawAliens();
    invadersId = setInterval(moveInvaders, 500);

}

function moveShooter(e){
    let shooterIndex =  currentShooterIndex;
    squares[currentShooterIndex].classList.remove("shooter");
    
    switch(e.keyCode){

        case 37:
            currentShooterIndex--;
            break;
    

        case 39:
            currentShooterIndex++;
    }
    if(squares[currentShooterIndex].classList.contains("invader")){
        squares[shooterIndex].classList.add("shooter");
        alert("Game over!");
        return;
    }

    squares[currentShooterIndex].classList.add("shooter");


}

// funktion ampumista varten
function shoot(e){
    let laserId; // intervalli ammusta varten
    let currentLaserIndex = currentShooterIndex;

    // liikuttaa ammusta
    function moveLaser(){
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -=width;
        squares[currentLaserIndex].classList.add("laser");

        // tarkistetaan osuuko ammus hyökkääjään
        if(squares[currentLaserIndex].classList.contains("invader")){
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserId)

            aliensRemoved.push(alienInvaders.indexOf(currentLaserIndex));
            scoreDisplay.innerHTML = ++score;

            if (score === 30) {
                setTimeout(() => alert("You Win!"), 300);
                clearInterval(invadersId);
            }
        }

    }

    if(e.key === "ArrowUp"){
        laserId = setInterval(moveLaser, 100);
        
    }

}

// kuuntelija aloitus-painikkeelle 
startBtn.addEventListener("click", startGame);

// kuuntelija shooterille
document.addEventListener("keydown", moveShooter);

// kuuntelija ampumista varten
document.addEventListener("keydown", shoot);