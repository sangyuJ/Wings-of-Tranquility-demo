var womanCells = [
    { left: 0,   top: 0, width: 57, height: 120 } ,
    { left: 111, top: 0, width: 60, height: 120 },
    { left: 222, top: 0, width: 63, height: 120 },
    { left: 333, top: 0, width: 63, height: 120 },
    { left: 444, top: 0, width: 63, height: 120 },
    { left: 556, top: 0, width: 57, height: 120 },
    // { left: 660, top: 0, width: 54, height: 120 },
  ],
    woman_SpriteSheet=new Image();
// Behaviors.................................................
var idle = {
    lastAdvance: 0,
    PAGEFLIP_INTERVAL: 300,

    execute: function (sprite, context, time) {
        if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            sprite.painter.advance();
            this.lastAdvance = time;
        }
    }
  };
  // Sprite....................................................
  var woman_Sprite = new Sprite('woman',
  new SpriteSheetPainter(womanCells,woman_SpriteSheet),
  [idle]);

// Animation.....................................................
function woman_Animate(time){
    if(endingActive){
        woman_Sprite.update(context,time);
        woman_Sprite.paint(context);
    requestNextAnimationFrame(woman_Animate);
    }
}
// Initialization................................................
function initWomanSprite(){
    woman_SpriteSheet.src="images/woman_idle.png";
    woman_SpriteSheet.onload=onWomanSpriteLoad;
    }
function onWomanSpriteLoad(){
    woman_Sprite.left=400;
    woman_Sprite.top=417;
    initRestBirdSprite();
}