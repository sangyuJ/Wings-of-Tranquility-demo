var LIFE_VALUE=100,
    ATTACK_VALUE=10,
    
    RECT_X=10,
    RECT_Y=10,
    RECT_HEIGHT=15,
    RECT_WIDTH=200,


    INVINCIBLE_INTERNAL=500;
    
var cellRadius=[43,73,83,90,95,100,103],
    BIRD_RADIUS=30;

var lifeRect=new Rect(RECT_X,RECT_Y,RECT_WIDTH,RECT_HEIGHT),
    currentLifeRect=new Rect(RECT_X,RECT_Y,RECT_WIDTH,RECT_HEIGHT),
    currentLifeValue = LIFE_VALUE,
    invincibleFlag=false,
    catchFlag=false,
    catchFlag2=false;
    score=0;   

// Functions.....................................................
function Attacked(){
    if(animateActive&&blowUpActive){

    var pointBird=new Point(bird_Sprite.left+BIRD_WIDTH/2,bird_Sprite.top+BIRD_HEIGHT/2);

    var pointExplosion=new Point(
        explode_Sprite.left+explosionCells[index].width/2,
        explode_Sprite.top+explosionCells[index].top/2+40);

    var distance=twoPointDistance(pointBird,pointExplosion);

    if(distance<=BIRD_RADIUS+cellRadius[index]/2
        && !invincibleFlag){
        currentLifeValue-=ATTACK_VALUE;
        catchFlag=true;  //进入这次爆炸范围
        invincibleFlag=true;  //无敌时间
        setTimeout(setInvincibleFlag,INVINCIBLE_INTERNAL);  //无敌失效
        UpdateCurrentLifeRect();
    
        // score-=20;
    }
    if(currentLifeValue==0){
        gameOver();
    }
    requestAnimationFrame(Attacked);
    }
}

function Attacked2(){
    if(animateActive){

    var pointBird=new Point(bird_Sprite.left+BIRD_WIDTH/2,bird_Sprite.top+BIRD_HEIGHT/2);

    var pointExplosion=new Point(
        explode_Sprite2.left+explosionCells[index2].width/2,
        explode_Sprite2.top+explosionCells[index2].top/2+40);

    var distance=twoPointDistance(pointBird,pointExplosion);

    if(distance<=BIRD_RADIUS+cellRadius[index2]/2
        && !invincibleFlag){
        currentLifeValue-=ATTACK_VALUE;
        catchFlag2=true;  //进入这次爆炸范围
        invincibleFlag=true;  //无敌时间
        setTimeout(setInvincibleFlag,INVINCIBLE_INTERNAL);  //无敌失效
        UpdateCurrentLifeRect();

    }
    if(currentLifeValue==0){
        gameOver();
    }
    requestAnimationFrame(Attacked2);
    }
}

function setInvincibleFlag(){
    invincibleFlag=false;
}

function drawLifeRect(){
    drawRect(context,lifeRect,"darkred",true);
    drawRect(context,currentLifeRect,"red",true);
}
function drawScore(){
    var scoreText=new Text("得分:"+score,
        {align:"center",baseline:"middle",font:"20px Arial"},
        {x:canvas.width-100,y:canvas.height-30})
    drawText(context,scoreText,'white',true);
}

function UpdateCurrentLifeRect(){
    currentLifeRect.setRectSize((currentLifeValue/LIFE_VALUE)*RECT_WIDTH,RECT_HEIGHT);
}

function twoPointDistance(p1,p2){
    let dep = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    return dep;
}
