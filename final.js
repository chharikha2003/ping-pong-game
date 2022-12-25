var rod1=document.getElementsByClassName("rod1");
var rod2=document.getElementsByClassName("rod2");
var ball=document.getElementsByClassName("ball");
var gameOn=false;
const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

let ballSpeedX=2;
let ballSpeedY=2;
let score,rod,movement,maxscore,
windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === "null" || maxScore === "null") {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1"
    } else {
        alert(rod + " has maximum score of " + maxScore * 100);
    }

    resetBoard(rod);
})();


function resetBoard(rodName) {

    rod1[0].style.left = (window.innerWidth - rod1[0].offsetWidth) / 2 + 'px';
    rod2[0].style.left = (window.innerWidth - rod2[0].offsetWidth) / 2 + 'px';
    ball[0].style.left = (windowWidth - ball[0].offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (rodName === rod2Name) {
        ball[0].style.top = (rod1[0].offsetTop + rod1[0].offsetHeight-20) + 'px';
        ballSpeedY = 2;
    } else if (rodName === rod1Name) {
        ball[0].style.top = (rod2[0].offsetTop-rod2[0].offsetHeight-30) + 'px';
        
        //ball[0].style.top=rod2[0].offsetHeight+"px";
        console.log(rod2[0].offsetTop)
        console.log(rod2[0].offsetHeight)
        ballSpeedY = -2;
        
    }

    score = 0;
    gameOn = false;

}
function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }

    clearInterval(movement);
    resetBoard(rod);

    alert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));

}
window.addEventListener('keypress',function(event){
    let rodSpeed = 20;
    
    let rodRect = rod1[0].getBoundingClientRect();
    if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
        console.log(rodRect.x);
        rod1[0].style.left = (rodRect.x) + rodSpeed + 'px';
        rod2[0].style.left = rod1[0].style.left;
    } else if (event.code === "KeyA" && (rodRect.x > 0)) {
        rod1[0].style.left = (rodRect.x) - rodSpeed + 'px';
        rod2[0].style.left = rod1[0].style.left;
    }
    if(event.code==="Enter")
    {  
       if (!gameOn)
       {    gameOn=true;
            let ballRect = ball[0].getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;
            let rod1Height = rod1[0].offsetHeight;
            let rod2Height = rod2[0].offsetHeight;
            let rod1Width = rod1[0].offsetWidth;
            let rod2Width = rod2[0].offsetWidth;
            movement = setInterval(function () {
                // Move ball 
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1X = rod1[0].getBoundingClientRect().x;
                rod2X = rod2[0].getBoundingClientRect().x;

                ball[0].style.left = ballX + 'px';
                ball[0].style.top = ballY + 'px';


                if ((ballX + ballDia) > windowWidth || ballX < 0) {
                    ballSpeedX = -ballSpeedX; // Reverses the direction
                }
                let ballPos = ballX + ballDia / 2;

                // Check for Rod 1
                if (ballY+20 <= rod1Height) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                        
                        storeWin(rod2Name, score);
                    }
                }

                // Check for Rod 2
                else if ((ballY + ballDia) >=(windowHeight - rod2Height)) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    score++;

                // Check if the game ends
                if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                      
                    storeWin(rod1Name, score);
                    }
                }
            },10)
        }
    }
});