const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const timeLeft = document.querySelector("#time-left");
const result = document.querySelector("#result");
const startBtn = document.querySelector("#start");

const width = 9;
let currentIndex = 76;
let winIndex = 4;
let currentTime = 20;
let timerId;

function moveCarLeft(car) {

    switch(true){
        case car.classList.contains("c1"):
            car.classList.remove("c1");
            car.classList.add("c2");
            break;
        case car.classList.contains("c2"):
            car.classList.remove("c2");
            car.classList.add("c3");
            break; 
        case car.classList.contains("c3"):
            car.classList.remove("c3");
            car.classList.add("c1");
            break; 

    }
    
}

function moveCarRight(car) {

    switch(true){
        case car.classList.contains("c1"):
            car.classList.remove("c1");
            car.classList.add("c3");
            break;
        case car.classList.contains("c2"):
            car.classList.remove("c2");
            car.classList.add("c1");
            break; 
        case car.classList.contains("c3"):
            car.classList.remove("c3");
            car.classList.add("c2");
            break; 

    }
    
}

function moveLogsLeft(log) {

    switch(true){
        case log.classList.contains("l1"):
            log.classList.remove("l1");
            log.classList.add("l2");
            break;
        case log.classList.contains("l2"):
            log.classList.remove("l2");
            log.classList.add("l3");
            break; 
        case log.classList.contains("l3"):
            log.classList.remove("l3");
            log.classList.add("l4");
            break;  
        case log.classList.contains("l4"):
        log.classList.remove("l4");
        log.classList.add("l5");
        break; 
       
        case log.classList.contains("l5"):
            log.classList.remove("l5");
            log.classList.add("l1");
            break;  
        

}
}

function moveLogsRight(log) {

    switch(true){
        case log.classList.contains("l1"):
            log.classList.remove("l1");
            log.classList.add("l5");
            break;
        case log.classList.contains("l2"):
            log.classList.remove("l2");
            log.classList.add("l1");
            break; 
        case log.classList.contains("l3"):
            log.classList.remove("l3");
            log.classList.add("l2");
            break;  
        case log.classList.contains("l4"):
        log.classList.remove("l4");
        log.classList.add("l3");
        break; 
       
        case log.classList.contains("l5"):
            log.classList.remove("l5");
            log.classList.add("l4");
            break;  
    }

    
}

function autoMoveCars() {
    carsLeft.forEach((car) =>moveCarLeft(car));
    carsRight.forEach((car) =>moveCarRight(car));
}

function autoMoveLogs() {
    logsLeft.forEach((log) =>moveLogsLeft(log));
    logsRight.forEach((log) =>moveLogsRight(log));

}

function moveWithLogLeft(){
    if(currentIndex > 18 && currentIndex < 27){
        squares[currentIndex].classList.remove("frog");
        currentIndex--;
        squares[--currentIndex].classList.add("frog");
    }

}

function moveWithLogRight(){
    if(currentIndex > 26 && currentIndex < 35){
        squares[currentIndex].classList.remove("frog");
        currentIndex++;
        squares[++currentIndex].classList.add("frog");
    }
    
}


function movePieces(){
    timeLeft.innerHTML = --currentTime;
    if(currentTime === 0){
        clearInterval(timerId);
    }else {
        autoMoveCars();
        autoMoveLogs();
        lose();
        moveWithLogRight();
        moveWithLogLeft();
    }
}


startBtn.addEventListener("click", () => {
    squares[currentIndex].classList.add("frog");
    timerId = setInterval(movePieces, 1000);
});

function lose() {
    if(currentTime === 0 || 
        squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l4") ||
        squares[currentIndex].classList.contains("l5"))
        {
        result.innerHTML = "Game Over!";
        squares[currentIndex].classList.remove("frog");
        clearInterval(timerId);
        document.removeEventListener("keyup", moveFrog)
        setTimeout(window.location.reload.bind(window.location), 1000);
    }
    

}

function win(){
    if(squares[winIndex].classList.contains("frog")){
        result.innerHTML = "Voitit!"
        squares[currentIndex].classList.remove("frog");
        clearInterval(timerId);
        document.addEventListener("keyup", moveFrog);
        setTimeout(window.location.reload.bind(window.location), 1000);

    }

}

function moveFrog (e){
    squares[currentIndex].classList.remove("frog");
    switch(e.keyCode){

        case 37:
            if(currentIndex % width !== 0) {currentIndex -= 1};
            break;

        case 38:
            if(currentIndex - width >= 0) {currentIndex -= width};
            break;

        case 39:
            if(currentIndex % width < width - 1) {currentIndex += 1};
            break;
        
        case 40:
            if(currentIndex + width < width * width) {currentIndex += width};
            break;
    }

    squares[currentIndex].classList.add("frog");
    lose();
    win();


}

document.addEventListener("keyup", moveFrog);