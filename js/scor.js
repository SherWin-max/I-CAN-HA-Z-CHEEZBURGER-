const createScoreBoard = ()=> {
    console.log('hello from score.js!!!');
    const divApp = document.getElementById('app');
      const divScore = document.createElement('div');
      divScore.id = 'scoreBoard';
      // divScore.innerText = 'Score: '+ SCORE;
      divScore.style.fontFamily = "Electrolize";
      divScore.style.fontSize = '14px';
      divScore.style.fontWeight = 'bold';
      divScore.style.color = 'black'
      divScore.style.backgroundColor = 'green';
      divScore.style.position = 'absolute';
      divScore.style.top = '13';
      divScore.style.left = '2';
      divScore.style.borderRadius = '30px';
      divScore.style.zIndex = 2000;
      divScore.style.padding = '10px 20px';
      divApp.appendChild(divScore);
  }
  createScoreBoard();



  const divScore = document.getElementById('scoreBoard')