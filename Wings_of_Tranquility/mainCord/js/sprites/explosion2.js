var index2;
var INTERVAL2=230;
var exaudioFlag2=true;

// Behaviors.................................................
var explodeInPlace2 = {
    lastAdvance2: 0,
    PAGEFLIP_INTERVAL: 200,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance2 > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance2 = time;
        }
    }
  },

  moveTopToBottom = {
    lastMove2: 0,
    
    execute: function (sprite, context, time) {
      if (this.lastMove2 !== 0) {
        sprite.top += sprite.velocityY *
                       ((time - this.lastMove2) / 1000); 
      }
      this.lastMove2 = time;
    }
  };

  // Sprite....................................................
  var explode_Sprite2 = new Sprite('explode2',
                      new SpriteSheetPainter(explosionCells,explosion_SpriteSheet),
                      [explodeInPlace2,moveTopToBottom]);

 function blowUp_Animate2(time){
    if(animateActive){
      playExaudio2();
      
      explode_Sprite2.update(context, time);
      explode_Sprite2.paint(context);
      
      if(updateCoordinates2(explode_Sprite2)){
        setTimeout(function() { 
            requestNextAnimationFrame(blowUp_Animate2);
        },INTERVAL2);
        
        if(!catchFlag2)  score+=5;
        catchFlag2=false;
        exaudioFlag2=true;
      }else requestNextAnimationFrame(blowUp_Animate2);
    }
  }
// Functions.....................................................
function playExaudio2(){
    index2=explode_Sprite2.painter.cellIndex;
    if(index2==0&&exaudioFlag2){
      exaudio.currentTime = 0;
      exaudio.play();
      exaudioFlag2=false;
    }
}
function updateCoordinates2(sprite){
      index2=explode_Sprite2.painter.cellIndex;
      if(index2==sprite.painter.cells.length-1){
      sprite.left=parseInt(Math.random()*(canvas.width-MAX_EXPLODE_WIDTH));
      sprite.top=-200;
      return true;
    }else
      return false;
  }
  // Initialization................................................
function initExplosionSprite2(){
  explode_Sprite2.velocityY=470;
  explode_Sprite2.left=parseInt(Math.random()*(canvas.width-MAX_EXPLODE_WIDTH));
  explode_Sprite2.top=0;
  initWomanSprite();
}
