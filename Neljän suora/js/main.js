document.addEventListener("DOMContentLoaded", () =>{

    const grid = document.querySelector(".grid");
    const squares = document.querySelectorAll(".grid div");
    const result = document.querySelector("#result");
    const displayCurrentPlayer = document.querySelector("#current-player");

    let currentPlayer = 1;
    let array = [360, 360, 360, 360, 360, 360, 360];
    //let area = {60:6, 120:5, 180:4, 240:3, 300:2, 360:1};
    let falling = false;
    
 //määritetään kaikki mahdolliset voitot
 const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

  function checkBoard(){
    
    //let i = 10;
    for(let i = 0; i < winningArrays.length; i++){
    const square1 = document.querySelector(`[data-id="${winningArrays[i][0]}"]`);
    const square2 = document.querySelector(`[data-id="${winningArrays[i][1]}"]`);
    const square3 = document.querySelector(`[data-id="${winningArrays[i][2]}"]`);
    const square4 = document.querySelector(`[data-id="${winningArrays[i][3]}"]`);
    console.log(square1);
    console.log(square2);

    //if(!square1 === null || !square2 === null|| !square3 === null || !square4 === null) {
        //continue; - if any of them is null, just go on and come back to me later;
    //}
    if (square1 != null &&
        square2 != null &&
        square3 != null &&
        square4 != null
        ) {

        //tarkistetaan onko pelaaja yksi saanut neljän suoran
        if(square1.classList.contains("player-one") && 
        square2.classList.contains("player-one") &&
        square3.classList.contains("player-one") && 
        square4.classList.contains("player-one") ) {
            result.textContent = "Pelaaja 1 voitti!";
            setTimeout(window.location.reload.bind(window.location), 3000);
        }

        if(square1.classList.contains("player-two") && 
        square2.classList.contains("player-two") &&
        square3.classList.contains("player-two") && 
        square4.classList.contains("player-two") ) {
            result.textContent = "Pelaaja 2 voitti!";
            setTimeout(window.location.reload.bind(window.location), 3000);
        }
    }
    }
  }

    grid.onclick = (e) => {
        if(falling) return;

        falling = true;

        let x = e.pageX - e.currentTarget.offsetLeft;
        let y = e.pageY - e.currentTarget.offsetTop;
        //console.log(x);
        //console.log(y);


        x = Math.floor(x / 60);
        y = Math.floor(y / 60);
        let pos = y * 60;
        array[x] -= 60; 

        const animation = document.createElement("div");
        //console.log(array[x]);
        animation.setAttribute("data-id", array[x] / 60 * 7 + x);
        //array[x] -= 60;
        //console.log(array[x] / 60 * 7 + x);

        if (currentPlayer ==1){
            animation.classList.add("player-one");
            currentPlayer = 2;
            displayCurrentPlayer.textContent = currentPlayer;
            
        } else {
            animation.classList.add("player-two");
            currentPlayer = 1;
            displayCurrentPlayer.textContent = currentPlayer;
        }
        
        animation.style.left = x * 60 + "px";
        animation.style.top = y * 60 + "px";

        grid.appendChild(animation);
        console.log(animation);

        const id = setInterval(frame, 5);
        function frame() {
            if (pos == array[x]) {
                clearInterval(id);
                falling = false;
                checkBoard();
            } else {
                pos++;
                animation.style.top = pos + "px";
            }
        }
    
    }


  
    
    //checkBoard();

});



