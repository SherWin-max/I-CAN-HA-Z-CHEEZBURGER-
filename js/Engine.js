// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
    this.socre = document.getElementById("score");
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // console.log(myScor);
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    const divScore = document.getElementById('scoreBoard')
    divScore.innerText = 'Score: '+ SCORE;


    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      const resetButton = document.createElement('button');
      resetButton.style.fontFamily='Arial, Helvetica, sans-serif'
      resetButton.style.background = '#3dfe3a';
      resetButton.style.fontSize = '30px';
      resetButton.style.fontWeight = 'bold';
      resetButton.style.color = 'black'
      resetButton.style.backgroundColor = 'yellow';
      resetButton.style.position = 'absolute';
      resetButton.style.top = '100';
      resetButton.style.left = '175';
      resetButton.style.borderRadius = '25px';
      resetButton.style.zIndex = '1500';
      resetButton.style.padding = '20px';
      resetButton.style.color= 'black';
      resetButton.innerText = "Reset";
      const root = this.root;
      root.appendChild(resetButton)
      resetButton.addEventListener('click', (e) => {
      this.gameLoop()
      root.removeChild(resetButton)
      })
      return
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };


  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let dead = false;
    console.log(this.player.y);
    for (const enemy of this.enemies) {
      const enemyXStart = enemy.x
      const enemyXEnd = enemyXStart + ENEMY_WIDTH

      // console.log("Enemy start X: ", enemyXStart)
      // console.log("Enemy end X: ", enemyXEnd)
      // console.log("Player x: ", this.player.x)
      // console.log("Enemy y: ", enemy.y + ENEMY_HEIGHT)
      // console.log(this.player.x >= enemyXStart && this.player.x <= enemyXEnd)
      // console.log((enemy.y + ENEMY_HEIGHT) >= this.player.y)

      if ((this.player.x >= enemyXStart && this.player.x <= enemyXEnd)
        && (enemy.y + ENEMY_HEIGHT) >= this.player.y) {
        console.log("Hit!")
        dead = true;
        break;
      }
    }  // return false;
    console.log("Dead? ", dead)
    return dead
  };
}
