const SCENE_FLAG2=100,
    SCENE_FLAG3=300,
    SUCCESS_FLAG=350;

var endingInterval=25000,
    birdInterval=6500,
    restInterval=8000;

var edaudio=document.getElementById("edAudio");  //获取音频对象


function background_Animate(now) {
    if(animateActive){

        if (now === undefined) {
        now = +new Date;
        }
    
        fps = calculateFps(now);
    
        erase();
        if (score<=SCENE_FLAG2) {//场景一
            drawScene();
        }else if(score<=SCENE_FLAG3){//场景二
            drawScene2();
        }else if(score<=SUCCESS_FLAG){//场景三
            drawScene3();
        }
        drawLifeRect();
        drawScore();
                
        requestNextAnimationFrame(background_Animate);
    }
 }

function stage2_Animate(){
    if(score>SCENE_FLAG2){

        requestNextAnimationFrame(blowUp_Animate2);
        requestNextAnimationFrame(Attacked2);
    }else{
        requestNextAnimationFrame(stage2_Animate);
    }
}

function stage3_Animate(){
    if(score>SCENE_FLAG3){
        blowUpActive=false;
        explode_Sprite=null;

        setTimeout(function() {         
            requestNextAnimationFrame(carryLetter_Animate);
        },3000);

    }else{
        requestNextAnimationFrame(stage3_Animate);
    }
}

function stageEnd_Animate(){
    if(score>SUCCESS_FLAG){
        animateActive=false;
        edaudio.play();

        drawEndingScene();//结尾动画
        requestNextAnimationFrame(endLetter_Animate);
        requestNextAnimationFrame(smallerBird_Animate);
        requestNextAnimationFrame(woman_Animate);

        setTimeout(function() {         
            requestNextAnimationFrame(restBird_Animate);
        },birdInterval);

        setTimeout(function() {         
            requestNextAnimationFrame(setSmallerBird);
        },birdInterval+restInterval);

        setTimeout(trueEnding,endingInterval);
    }else{
        requestNextAnimationFrame(stageEnd_Animate);
    }
}
