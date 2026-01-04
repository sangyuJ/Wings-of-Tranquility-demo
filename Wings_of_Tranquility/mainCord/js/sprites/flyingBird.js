var birdCells = [
    { left: 2,   top: 2, width: 63, height: 63 } ,
    { left: 66,  top: 2, width: 63, height: 63 },
    { left: 130, top: 2, width: 63, height: 63 },
    { left: 195, top: 2, width: 63, height: 63 },
  ],

    bird_SpriteSheet=new Image();

var BIRD_WIDTH=63,
    BIRD_HEIGHT=63, 

    X_MOVEMENT=50,
    Y_MOVEMENT=60;


// Behaviors.................................................
var flyInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 120,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
},
    flyInCanvas = {
    lastMove: 0,

    execute: function (sprite, context, time) {
      if (this.lastMove !== 0) {
        sprite.top += sprite.velocityY *
                       ((time - this.lastMove) / 1000); 
        sprite.left -= sprite.velocityX *
                      ((time - this.lastMove) / 1000); 

        if (sprite.top + BIRD_HEIGHT >= canvas.height) {
          //  sprite.top = canvas.height-this.BIRD_HEIGHT;
          gameOver();

        }
        if (sprite.top <0) {
            // sprite.top = 0;
            gameOver();
         }
         if(sprite.left + BIRD_WIDTH >= canvas.width){
            // sprite.left = canvas.width-this.BIRD_WIDTH;
            gameOver();
         }
         if(sprite.left <0){
            // sprite.left = 0;
            gameOver();
         }
      }
      this.lastMove = time;
    }
 };

// Sprite....................................................
    var bird_Sprite = new Sprite('bird',
                                new SpriteSheetPainter(birdCells,bird_SpriteSheet),
                                [flyInPlace,flyInCanvas]);
// Animation.....................................................
function bird_Animate(time) {
    if(animateActive){
    
      bird_Sprite.update(context, time);
      bird_Sprite.paint(context); 
 
      requestNextAnimationFrame(bird_Animate);
    }
 }

// Event Handlers................................................
 
 // 按下键盘空格键，左箭头，右箭头的时候实现小鸟向上，左，右运动
 function onCanvasKeydown(e) {
  if(!animateActive) return;

      if(e.keyCode==32)
        flyUp(bird_Sprite,context);
      if(e.keyCode==37)
        flyBackward(bird_Sprite,context);
      if(e.keyCode==39)
        flyForward(bird_Sprite,context);
  } 
// Functions.....................................................

  function flyUp(sprite,context){
    sprite.top -= Y_MOVEMENT;
    sprite.paint(context);
  }
  function flyBackward(sprite,context){
    sprite.left -= X_MOVEMENT;
    sprite.paint(context);
  }
  function flyForward(sprite,context){
    sprite.left += X_MOVEMENT;
    sprite.paint(context);
  }
  
  // Initialization................................................

  function initBirdSprite(){
      bird_SpriteSheet.src="images/bird_spriteSheet.png";
      bird_SpriteSheet.onload=onBirdSpriteLoad;
  }
  function onBirdSpriteLoad(){
      bird_Sprite.velocityX = 100; 
      bird_Sprite.velocityY = 100; // pixels/second
      bird_Sprite.left = canvas.width*2/3;
      bird_Sprite.top = canvas.height/3;
      initLetterLoad();
  }


