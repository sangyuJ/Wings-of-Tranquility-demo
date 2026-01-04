var explosionCells = [
    { left: 4,   top: 46, width: 55, height: 54 } ,
    { left: 161,  top: 26, width: 82, height: 98 },
    { left: 344, top: 6, width: 132, height: 126 },
    { left: 576, top: 26, width: 115, height: 114 },
    { left: 793, top: 18, width: 126, height: 130 },
    { left: 1020, top: 18, width: 132, height: 130 },
    { left: 1252, top: 18, width: 131, height: 130 },
  ],
    explosion_SpriteSheet=new Image();

var MAX_EXPLODE_WIDTH=132,
    MAX_EXPLODE_HEIGHT=130,
    INTERVAL=500;

var index;

var exaudio=document.getElementById("exAudio");  //获取音频对象
  exaudio.volume=0.5,
  exaudioFlag=true;

// Behaviors.................................................
var explodeInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 200,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
  },
  moveLeftToRight = {
    lastMove: 0,
    
    execute: function (sprite, context, time) {
      if (this.lastMove !== 0) {
          sprite.left += sprite.velocityX *
                        ((time - this.lastMove) / 1000); 
      }
      this.lastMove = time;
    }
 };

  // Sprite....................................................
  var explode_Sprite = new Sprite('explode',
  new SpriteSheetPainter(explosionCells,explosion_SpriteSheet),
  [explodeInPlace,moveLeftToRight]);

 
// Animation.....................................................

 function blowUp_Animate(time){
    if(animateActive&&blowUpActive){
      playExaudio();

      explode_Sprite.update(context, time);
      explode_Sprite.paint(context);

      if(updateCoordinates(explode_Sprite)){
        setTimeout(function() {  
            requestNextAnimationFrame(blowUp_Animate);
        },INTERVAL);

        if(!catchFlag)  score+=10;
        catchFlag=false;
        exaudioFlag=true;
    }else requestNextAnimationFrame(blowUp_Animate);
    }
 }

// Functions.....................................................
function playExaudio(){
    index=explode_Sprite.painter.cellIndex;
    if(index==0&&exaudioFlag){
      exaudio.currentTime = 0;
      exaudio.play();
      exaudioFlag=false;
    }
}

function updateCoordinates(sprite){
      index=explode_Sprite.painter.cellIndex;
      if(index==sprite.painter.cells.length-1){

      sprite.left=-300;
      sprite.top=parseInt(Math.random()*(canvas.height-MAX_EXPLODE_HEIGHT));      
      return true;
    }else
      return false;
}

// Initialization................................................
function initExplosionSprite(){
    explosion_SpriteSheet.src="./images/explosion_spriteSheet.png";
    explosion_SpriteSheet.onload=onExplosionSpriteLoad;
}
function onExplosionSpriteLoad(){
  explode_Sprite.velocityX=650;
  explode_Sprite.left=200;
  explode_Sprite.top=parseInt(Math.random()*(canvas.height-MAX_EXPLODE_HEIGHT));      

  initExplosionSprite2();
}