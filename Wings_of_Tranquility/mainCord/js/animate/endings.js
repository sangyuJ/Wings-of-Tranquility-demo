
var letterInterval=60000,
    closingWordsInterval=6000;

// Functions.....................................................
function endSystem(){
    animateActive=false;
    blowUpActive=false;
    endingActive=false;
    
    bird_Sprite=null;
    explode_Sprite=null;
    explode_Sprite2=null;
    smallerBird_Sprite=null;
    restBird_Sprite=null;
    woman_Sprite=null;
    erase();
}

function gameOver(){
    var text=new Text("You Lose",
        {align:"center",baseline:"middle",font:"100px Arial"},
        {x:canvas.width/2,y:canvas.height/2}
        );

    endSystem();

    drawRect(context,movieRect,'black',true);
    drawText(context,text,'#9B5A1A',true);
    drawText(context,text,'#8B0000',false);
    // drawText(context,text,'#80461B',false);
}


function trueEnding(){

    endSystem();

    var text=new Text("The End",
        {align:"center",baseline:"middle",font:"100px Arial"},
        {x:canvas.width/2,y:canvas.height/2}
        );

    if(isCatchLetter){
        drawLetter();

        setTimeout(function() {  
            erase();   
            drawClosingWords();
        },letterInterval);

        setTimeout(function() {      
            erase();   
            drawText(context,text,'lightskyblue',true);
            drawText(context,text,'green',false);
        },letterInterval+closingWordsInterval);

    }else{
        drawClosingWords();

        setTimeout(function() {      
            erase();   
            drawText(context,text,'lightskyblue',true);
            drawText(context,text,'green',false);
        },closingWordsInterval);
    }

    // drawText(context,text,'#ADD8E6',true);
}

function drawClosingWords(){
    context.fillStyle = "#90EE90"; // 文本颜色
    context.font = "30px Arial";
    context.fillText("战争是残酷的悲剧", canvas.width/2, canvas.height/2-70);
    context.fillText("它带来的创伤不会轻易磨灭", canvas.width/2, canvas.height/2-30);

    context.fillStyle = "#ADD8E6"; // 文本颜色
    context.font = "40px Arial";
    context.fillText("愿世界和平", canvas.width/2, canvas.height/2+30);
}

function drawLetter(){
    context.fillStyle = "white"; // 文本颜色
    // context.font = "px FZShuTi";
    // context.font = '33px shuti';
    // context.fillText("一名年轻士兵的独白", canvas.width/2,90);
    context.font = '25px shuti';

    var str=new Array(
        ["“……我很年轻，才二十岁。"],
        ["我对生命的认识，唯有绝望、死亡、恐惧和联结着痛苦深渊的失控的浅薄。"],
        ["我看见民族间被迫为敌。人民沉默、无知、愚蠢、顺从，无辜地互相杀戮。"],
        ["我看见世界上最聪明的头脑在制造武器和言辞，好让这一切更精妙、更持久地延续下去。"],
        ["而在这里、那里，在全世界，我的同龄人都和我一样，看着这一切；"],
        ["我们这一代人都和我一样，经历着这一切。"],
        ["如果有一天我们站起来，走到父辈面前，要求清算，他们该怎么办？"],
        ["如果一个没有战争的年代来临，他们还对我们有什么指望？"],
        ["几年来，我们的工作是杀戮——这是我们人生的第一份职业。"],
        ["我们对生的认识局限于死。"],
        ["以后会发生什么？我们会变成什么样？”"],
        // [""],
        ["                                                                           ————《西线无战事》"]
        )

    var upheight=120;
    for (var i=0;i<str.length;i++){
        context.fillText(str[i], canvas.width/2,upheight);
        upheight+=40;
    }
}