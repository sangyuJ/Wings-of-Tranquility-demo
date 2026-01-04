var smallerBirdCells = [
    { left: 0,   top: 0, width: 46, height: 45 } ,
    { left: 46,  top: 0, width: 45, height: 45 },
    { left: 91, top: 0, width: 46, height: 45 },
    { left: 137, top: 0, width: 45, height: 45 },
    // { left: 134, top: 102, width: 46, height: 37 },
  ],

    smallerBird_SpriteSheet=new Image();

var SMALL_BIRD_WIDTH=45,
    SMALL_BIRD_HEIGHT=45, 

    START_LEFT=0,
    START_TOP=125,

    END_LEFT=510,
    END_TOP=420,

    flag=true;

// Behaviors.................................................
var flyInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 300,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
},
startFly={
  lastMove: 0,
  execute: function (sprite, context, time) {
    if(flag){
      if (this.lastMove !== 0) {
        sprite.top += sprite.velocityY *
                        ((time - this.lastMove) / 1000);              
        sprite.left += sprite.velocityX *
                        ((time - this.lastMove) / 1000);
      }
      this.lastMove = time;
    }
  }
},
endFly={
  lastMove: 0,
  execute: function (sprite, context, time) {
    if(!flag){
      if (this.lastMove !== 0) {
        sprite.top -= sprite.velocityY *
                        ((time - this.lastMove) / 1000);              
        sprite.left += sprite.velocityX *
                        ((time - this.lastMove) / 1000);
      }
      this.lastMove = time;
    }
  }
};


// Sprite....................................................
    var smallerBird_Sprite = new Sprite('smallBird',
                                new SpriteSheetPainter(smallerBirdCells,smallerBird_SpriteSheet),
                                [flyInPlace,startFly,endFly]);
// Animation.....................................................
function smallerBird_Animate(time) {
    if(endingActive){
    
    smallerBird_Sprite.update(context, time);
    smallerBird_Sprite.paint(context); 
 
    requestNextAnimationFrame(smallerBird_Animate);
    }
 }
// Functions.....................................................
function setSmallerBird(){
    flag=false;
    restBird_Sprite.visible=false;
    smallerBird_Sprite.visible=true,

    smallerBird_Sprite.left=END_LEFT;
    smallerBird_Sprite.top=END_TOP;
    smallerBird_Sprite.velocityY=60;
    smallerBird_Sprite.velocityX=80;
}
  // Initialization................................................

  function initSmallerBirdSprite(){
      smallerBird_SpriteSheet.src="./images/smallerBird_spriteSheet.png";
      smallerBird_SpriteSheet.onload=onSmallerBirdSpriteLoad;
  }
  function onSmallerBirdSpriteLoad(){
    smallerBird_Sprite.left=START_LEFT;
    smallerBird_Sprite.top=START_TOP;

    smallerBird_Sprite.velocityY=45;
    smallerBird_Sprite.velocityX=80;
    play();
  }
