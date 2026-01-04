var letterCell = [
    { left: 0,   top: 0, width: 42, height: 30 } ,
  ],
    letter_Img=new Image();

var LETTER_WIDTH,
    LETTER_HEIGHT,
    isCatchLetter=false;

// Behaviors.................................................

var move = {
    lastMove: 0,
    
    execute: function (sprite, context, time) {
      if (this.lastMove !== 0 && !isCatchLetter) {
        if(sprite.left<-LETTER_WIDTH){
            sprite.left=parseInt(Math.random()*canvas.width+canvas.width/3);
            sprite.top=-LETTER_HEIGHT;
        }

        if(sprite.top<=canvas.height-LETTER_HEIGHT-80){
            sprite.top += sprite.velocityY *
                            ((time - this.lastMove) / 1000); 
            sprite.left -= sprite.velocityX *
                            ((time - this.lastMove) / 1000); 
        }else{
            sprite.left -= FAST_TREE_VELOCITY *
                            ((time - this.lastMove) / 1000); 
        }
      }
      this.lastMove = time;
    }
 },
    moveWithBirds = {
    // lastMove: 0,
    
    execute: function (sprite, context, time) {

        sprite.left=bird_Sprite.left+BIRD_WIDTH/2-15;
        sprite.top=bird_Sprite.top+BIRD_HEIGHT-5;
    }
 },
    moveWithSmallerBirds = {
    
    execute: function (sprite, context, time) {

        sprite.left=smallerBird_Sprite.left+SMALL_BIRD_WIDTH/2-15;
        sprite.top=smallerBird_Sprite.top+SMALL_BIRD_HEIGHT-10;
    }
};

 // Sprite....................................................
var letter_Sprite = new Sprite('letter',new SpriteSheetPainter(letterCell,letter_Img),[move]);
var carriedLetter_Sprite = new Sprite('carriedLetter',new SpriteSheetPainter(letterCell,letter_Img),[moveWithBirds]);
var carriedLetter_Sprite2 = new Sprite('carriedLetter',new SpriteSheetPainter(letterCell,letter_Img),[moveWithSmallerBirds]);

// Functions.....................................................

function carryLetter_Animate(time){
    if(animateActive){
        if(!isCatchLetter){//没抓到信
            letter_Sprite.update(context, time);
            letter_Sprite.paint(context);

            var pointBird=new Point(bird_Sprite.left+BIRD_WIDTH/2,bird_Sprite.top+BIRD_HEIGHT/2);

            var pointLetter=new Point(
                letter_Sprite.left+LETTER_WIDTH/2,
                letter_Sprite.top+LETTER_HEIGHT/2);

            var distance=twoPointDistance(pointBird,pointLetter);

            if(distance<=BIRD_RADIUS+LETTER_HEIGHT){
                isCatchLetter=true;
            }
            // setTimeout(function() {         
            //     requestNextAnimationFrame(carryLetter_Animate);
            // },500);
        }else{//已经抓到
            letter_Sprite=null;
            carriedLetter_Sprite.update(context, time);
            carriedLetter_Sprite.paint(context);
        }
        requestNextAnimationFrame(carryLetter_Animate);
    }
}

function endLetter_Animate(time){
    if(endingActive&&isCatchLetter){
        carriedLetter_Sprite2.update(context, time);
        carriedLetter_Sprite2.paint(context);
        requestNextAnimationFrame(endLetter_Animate);
    }
}
  // Initialization................................................
  
function initLetterLoad(){
    letter_Img.src="images/Letter.png";
    letter_Img.onload=onLetterLoad;  
}
function onLetterLoad(){
    LETTER_WIDTH=letter_Img.width;
    LETTER_HEIGHT=letter_Img.height;

    letter_Sprite.velocityX=120;
    letter_Sprite.velocityY=200;
    // letter_Sprite.left=canvas.width;
    // letter_Sprite.top=LETTER_HEIGHT+150;
    letter_Sprite.left=parseInt(Math.random()*canvas.width+canvas.width/3);
    letter_Sprite.top=-50;

    initExplosionSprite();
}