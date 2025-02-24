
    let score=JSON.parse(localStorage.getItem('score'))||{
      wins:0,
      loses:0,
      ties:0
    };
    updateScoreElement();
    /*
    updateScore();
    updateStateGame();
    updateDescriptionGame();*/
/*
    if(!score){   //score===null
      score={
        wins:0,
        loses:0,
        ties:0
      };
    }  */
let isAutoPlaying =false;
let intervalId;
function changetitleButton(){
document.querySelector('.js-autoplay').innerHTML='Stop';
}
    function autoPlay(){
/*
      setInterval(function(){
        const playerMove=computerPicked();
        playerGame(playerMove);
      },1000);
      isAutoPlaying=true;
*/
     if (!isAutoPlaying){
        intervalId=setInterval(function(){
          const playerMove=computerPicked();
          playerGame(playerMove);
        },1000);
        isAutoPlaying=true;
        setTimeout(changetitleButton,1000)
      }else{
        clearInterval(intervalId);
        isAutoPlaying=false;
        document.querySelector('.js-autoplay').innerHTML='Auto Play';
      }
    }
    document.querySelector('.js-rock-button').addEventListener('click',()=>{
      playerGame('rock');
    });
    document.querySelector('.js-paper-button').addEventListener('click',()=>{
      playerGame('paper');
    });
    document.querySelector('.js-scissors-button').addEventListener('click',()=>{
      playerGame('scissors');
    });
    
    document.body.addEventListener('keydown',(event)=>{
      if(event.key==='r'){
        playerGame('rock');
      }else if(event.key==='p'){
        playerGame('paper');
      }else if (event.key==='s'){
        playerGame('scissors');
      }
    })
    function playerGame(playerPicked){
      const randomItem=computerPicked();
      let result;
      if (playerPicked ==='scissors'){

        if (randomItem==='scissors'){
          result='You tie';
        }else if (randomItem==='rock'){
          result='You loss';
        }else {
          result='You win';
        }
      }else if(playerPicked ==='paper'){
        if (randomItem==='paper'){
          result='You tie';
        }else if (randomItem==='scissors'){
          result='You loss';
        }else {
          result='You win';
        }    
      }else if(playerPicked ==='rock'){
        if (randomItem==='rock'){
          result='You tie';
        }else if (randomItem==='paper'){
          result='You loss';
        }else {
          result='You win';
        }
      }
      if(result==='You win'){
        score.wins++;
      }else if(result==='You loss'){
        score.loses++;
      }else if(result==='You tie'){
        score.ties++;
      }
      localStorage.setItem('score',JSON.stringify(score));
      updateScoreElement();
      document.body.querySelector('.state-game').innerHTML=result;
      document.body.querySelector('.description-game').innerHTML=`You 
    <img src="images/${playerPicked}-emoji.png" class="move-icon">
    <img src="images/${randomItem}-emoji.png" class="move-icon">
    Computer`;
    }

    function updateScoreElement(){
      document.body.querySelector('.score-values').innerHTML=`wins${score.wins}, loses${score.loses}, ties${score.ties}.`;
    }
    function updateDescriptionGame(){
      
    }
    function computerPicked(){
      let items = ['paper', 'rock', 'scissors'];
      let randomItem = items[Math.floor(Math.random() * items.length)];
      return randomItem;
    }
    function resetvalues(){
      score.wins=0;
      score.loses=0;
      score.ties=0;
      localStorage.removeItem('score');
      updateScoreElement();
    }
