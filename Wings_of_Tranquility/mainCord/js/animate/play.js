// Initialization................................................

var backGroundOffset = 0,
    treeOffset = 0,
    nearTreeOffset = 0,
    lightOffset = 0,
    skyOffset = 0,

    BACK_GROUND_VELOCITY = 16,
    TREE_VELOCITY = 40,
    FAST_TREE_VELOCITY = 80,
    SKY_VELOCITY = 20;

var animateActive=false,
    blowUpActive=true,
    endingActive=true;

// Functions.....................................................

function erase() {
    context.clearRect(0,0,canvas.width,canvas.height);
 }
/**
 * 绘制图像
 * @param {Object} context 绘制的目标context
 * @param {Object} img 绘制的图像对象
 * @param {Object} imgArrs 绘制的图像数组信息
 * @param {Number} index 数组索引
 * @param {Number} x 绘制起始点(x,y)
 * @param {Number} y 绘制起始点(x,y)
 */
function drawItem(context,img,imgArrs,index,x,y){
    context.drawImage(img, 
       imgArrs[index].x,  imgArrs[index].y, imgArrs[index].width,  imgArrs[index].height,
       x,y,imgArrs[index].width,  imgArrs[index].height);
 }

// Animation.....................................................
 function play(){
    if(animateActive){
        drawScene();
        requestNextAnimationFrame(background_Animate);

        requestNextAnimationFrame(bird_Animate);
        requestNextAnimationFrame(blowUp_Animate);

        requestNextAnimationFrame(Attacked);

        requestNextAnimationFrame(stage2_Animate);
        requestNextAnimationFrame(stage3_Animate);
        requestNextAnimationFrame(stageEnd_Animate);
    }else
        requestNextAnimationFrame(play);
}

function calculateFps(now) {
    var fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps; 
 }

function drawScene(){
    context.save();

    backGroundOffset = backGroundOffset < canvas.width ?
    backGroundOffset + BACK_GROUND_VELOCITY/fps : 0;

    treeOffset = treeOffset < canvas.width ?
        treeOffset + TREE_VELOCITY/fps : 0;

    nearTreeOffset = nearTreeOffset < canvas.width ?
            nearTreeOffset + FAST_TREE_VELOCITY/fps : 0;

    context.save();
    context.translate(-backGroundOffset, 0);
    drawItem(context,img,SPRITE_IMGS,0,0,0);
    drawItem(context,img,SPRITE_IMGS,0,SPRITE_IMGS[0].width-2,0);
    context.restore();

    context.save();
    context.translate(-treeOffset, 0);
    drawItem(context,img,SPRITE_IMGS,1,0,0);
    drawItem(context,img,SPRITE_IMGS,1,SPRITE_IMGS[1].width-2,0);
    context.restore();

   context.save();
   context.translate(-nearTreeOffset, 0);
   drawItem(context,img,SPRITE_IMGS,2,0,0);
   drawItem(context,img,SPRITE_IMGS,2,SPRITE_IMGS[2].width-2,0);

   context.restore();

}

function drawScene2(){
    context.save();

    backGroundOffset = backGroundOffset < canvas.width ?
    backGroundOffset + BACK_GROUND_VELOCITY/fps : 0;

    treeOffset = treeOffset < canvas.width ?
        treeOffset + TREE_VELOCITY/fps : 0;

    nearTreeOffset = nearTreeOffset < canvas.width ?
            nearTreeOffset + FAST_TREE_VELOCITY/fps : 0;

    context.save();
    context.translate(-backGroundOffset, 0);
    drawItem(context,img,SPRITE_IMGS,0,0,0);
    drawItem(context,img,SPRITE_IMGS,0,SPRITE_IMGS[0].width-2,0);
    context.restore();

    context.save();
    context.translate(-treeOffset, 0);
    drawItem(context,img,SPRITE_IMGS,1,0,0);
    drawItem(context,img,SPRITE_IMGS,1,SPRITE_IMGS[1].width-2,0);
    context.restore();

   context.save();
   context.translate(-nearTreeOffset, 0);
   drawItem(context,img,SPRITE_IMGS,4,0,0);
   drawItem(context,img,SPRITE_IMGS,4,SPRITE_IMGS[4].width-2,0);

   context.restore();
}

function drawScene3(){
    context.save();

    backGroundOffset = backGroundOffset < canvas.width ?
    backGroundOffset + BACK_GROUND_VELOCITY/fps : 0;

    treeOffset = treeOffset < canvas.width ?
        treeOffset + TREE_VELOCITY/fps : 0;

    nearTreeOffset = nearTreeOffset < canvas.width ?
        nearTreeOffset + FAST_TREE_VELOCITY/fps : 0;            

    context.save();
    context.translate(-backGroundOffset, 0);
    drawItem(context,img,SPRITE_IMGS,0,0,0);
    drawItem(context,img,SPRITE_IMGS,0,SPRITE_IMGS[0].width-2,0);
    context.restore();

    context.save();
    context.translate(-treeOffset, 0);
    drawItem(context,img,SPRITE_IMGS,3,0,0);
    drawItem(context,img,SPRITE_IMGS,3,SPRITE_IMGS[3].width-4,0);
    context.restore();

   context.save();
   context.translate(-nearTreeOffset, 0);
   drawItem(context,img,SPRITE_IMGS,4,0,0);
   drawItem(context,img,SPRITE_IMGS,4,SPRITE_IMGS[4].width-2,0);
   context.restore();

}

function drawEndingScene(){

    if(endingActive){
    context.save();


    skyOffset = skyOffset < canvas.width ?
            skyOffset + SKY_VELOCITY/fps : 0;

   context.save();
   context.translate(-skyOffset, 0);
   drawItem(context,img,SPRITE_IMGS,6,0,0);
   drawItem(context,img,SPRITE_IMGS,6,SPRITE_IMGS[6].width-2,0);
   context.restore();
    
   context.save();
   drawItem(context,img,SPRITE_IMGS,7,0,0);

   requestNextAnimationFrame(drawEndingScene);
    }
}
