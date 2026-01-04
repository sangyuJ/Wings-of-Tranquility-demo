/*
	Module  :Wings of Tranquility（宁静之翼）
    Description:像素小游戏，以战争与和平为主题，
                玩家通过键盘的空格和箭头按键操纵小鸟躲避随机出现的爆炸轰击。
	Author    :周二上午班-季桑羽
	Build_Date:2023-11-28
	Version   :6.0
 */

//1. 公共变量声明块........................................................

//常量声明区
const BACKGROUND_COLOR="black";
const WIDTH=1088;
const HEIGHT=640;//movieCanvas长、宽

//变量声明区
var canvas,hiddenCanvas,
    context,hiddenContext,
    img=new Image(),
    controls = document.getElementById('controls'),
    movieRect=new Rect();

    paused = false,
    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps = 60;

var f_animate,
    f_bird,
    f_explode,
    f_attack;

var buttonX,
    buttonY,
    buttonWidth = 100,
    buttonHeight = 50;

//2. 函数定义块...........................................................
function initCanvas(){
    canvas=getCanvas('canvas');
    context=getContext(canvas);
    canvas.width=WIDTH;
    canvas.height=HEIGHT;
    canvas.style.background=BACKGROUND_COLOR;
    movieRect.setRectCord(0,0);
    movieRect.setRectSize(canvas.width,canvas.height);

    var text=new Text("Wings of Tranquility",
    {align:"center",baseline:"middle",font:"100px Arial"},
    {x:canvas.width/2,y:canvas.height/2}
    );
    drawText(context,text,'#90EE90',true);
    drawText(context,text,'#ADD8E6',false);

    var notice=new Text("帮助小鸟躲避爆炸，逃离战场吧！",
    {align:"center",baseline:"middle",font:"25px Arial"},
    {x:canvas.width/2,y:canvas.height-55}
    );
    drawText(context,notice,'white',true);

    var notice2=new Text("空格向上移动 箭头左右移动 脱离画面视为游戏结束",
    {align:"center",baseline:"middle",font:"20px Arial"},
    {x:canvas.width/2,y:canvas.height-20}
    );
    drawText(context,notice2,'white',true);

    drawButton();
}

function initImage(){
    img.src=IMG;
    img.onload=onImageLoad;
}

// 绘制按钮外观
function drawButton() {
    // 绘制按钮矩形
    buttonX=canvas.width/2-buttonWidth/2;
    buttonY=canvas.height/2-buttonHeight/2+150;

    var rect=new Rect(buttonX, buttonY,buttonWidth, buttonHeight);

    var text=new Text("PLAY",
    {align:"center",baseline:"middle",font:"20px Arial"},
    {x:canvas.width/2,y:canvas.height/2+150}
    );

    drawRect(context,rect,'blue',true);
  
    drawText(context,text,'white',true);

  }

//3. 事件注册块...........................................................
// 监听鼠标点击事件
window.addEventListener("click", function(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
  
    // 检查鼠标点击位置是否在按钮范围内
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
            animateActive=true;  //绘制scene和开始sprite动画
    }
});


function onImageLoad(){
    initBirdSprite();
}

// 初始化块............................................................
function init(){
    
    initCanvas();
    initImage();
    window.onkeydown=onCanvasKeydown;

    
}
init();  //程序入口