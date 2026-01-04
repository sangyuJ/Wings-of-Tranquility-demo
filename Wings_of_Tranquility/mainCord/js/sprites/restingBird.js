restBirdCells=[
    { left: 134, top: 102, width: 45, height: 34 },
    { left: 134, top: 102, width: 45, height: 34 },
    { left: 91, top: 102, width: 45, height: 34 },
]
restBird_SpriteSheet=new Image();

// Behaviors.................................................
var restInPlace = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 800,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
};
// Sprite....................................................
var restBird_Sprite = new Sprite('restBird',
    new SpriteSheetPainter(restBirdCells,restBird_SpriteSheet),
    [restInPlace]);

// Animation.....................................................
function restBird_Animate(time) {
    if(endingActive){

    if(restBird_Sprite.visible){
        smallerBird_Sprite.visible=false;
        carriedLetter_Sprite2.visible=false;
    }
    restBird_Sprite.update(context, time);
    restBird_Sprite.paint(context); 
 
    requestNextAnimationFrame(restBird_Animate);
    }
 }

  // Initialization................................................
  function initRestBirdSprite(){
    restBird_SpriteSheet.src="images/smallerBird_spriteSheet_left.png";
    restBird_SpriteSheet.onload=onRestBirdSpriteLoad;
}
function onRestBirdSpriteLoad(){
    restBird_Sprite.left = 510;
    restBird_Sprite.top = 425;
    restBird_Sprite.visible=true;
    initSmallerBirdSprite();
}

