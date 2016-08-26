/**
 * Created by Administrator on 2016/8/22.
 */
var mainNode=document.getElementById("main");
var lisNode=mainNode.getElementsByTagName("li");//小图
var middleDivNode=document.getElementById("middleDiv");//中图的div
var middleImgNode=middleDivNode.getElementsByTagName("img")[0];//中图的图片节点
var boardNode=middleDivNode.getElementsByTagName("span")[0];
var bigImgNode=document.getElementById("bigImg");//大图的节点

for( var i=0; i<lisNode.length;i++) {//小图换中图也换
    lisNode[i].onmousemove = function () {
        for (var j = 0; j < lisNode.length; j++) {
            lisNode[j].className = "";//将每个li的样式去除
        }
        this.className = "main_imgCur";//当前的li加上样式
        var smallImgSrc = this.getElementsByTagName("img")[0].src;//当前的小图的路径
        middleImgNode.src = smallImgSrc.substring(0, smallImgSrc.length - 5) + "m.jpg";//当前的中图的路径
        bigImgNode.src = smallImgSrc.substring(0, smallImgSrc.length - 5) + "b.jpg";//当前的大图的路径
    }
}

middleDivNode.onmouseenter=function() {//鼠标移入蓝布出现
    boardNode.style.display="block";
    bigImgNode.parentNode.style.display="block";
}
middleDivNode.onmouseleave=function() {//鼠标移出蓝布消失
    boardNode.style.display="none";
    bigImgNode.parentNode.style.display="none";
}
middleDivNode.onmousemove=function(e) {//蓝布移动
    var event = window.event || e;
    var pageX = event.pageX;//鼠标与网页左上角的坐标X
    var pageY = event.pageY;//鼠标与网页左上角的坐标Y
    var middleDivNodeX = middleDivNode.offsetLeft + middleDivNode.parentNode.offsetLeft;//中图div与网页左上角的坐标X
    var middleDivNodeY = middleDivNode.offsetTop + middleDivNode.parentNode.offsetTop;//中图div与网页左上角的坐标Y
    var x = pageX - middleDivNodeX;//鼠标与图片左上角的距离X
    var y = pageY - middleDivNodeY;//鼠标与图片左上角的距离Y
    var boardNodeWidth = boardNode.clientWidth;//蓝布的宽
    var boardNodeHeight = boardNode.clientHeight;//蓝布的高
    var middleDivNodeWidth=middleDivNode.clientWidth;//中图div的宽
    var middleDivNodeHeight=middleDivNode.clientHeight;//中图div的高

    //左边
    if (x<boardNodeWidth/2 && x>0) {
        boardNode.style.left = 0;
        if (y<boardNodeHeight/2 && y>0) {//左上
            boardNode.style.top = 0;
        }
        else if (y > boardNodeHeight / 2 && y < middleDivNodeHeight - (boardNodeHeight/2)) {//左中
            boardNode.style.top =(y-boardNodeHeight/2) + "px";
        }
        else if (y > middleDivNodeHeight - (boardNodeHeight / 2)) {//左下
            boardNode.style.top =middleDivNodeHeight-boardNodeHeight;
        }
    }
    //右边
    else if (x > middleDivNodeWidth - (boardNodeWidth / 2)) {
        boardNode.style.left=middleDivNodeWidth-boardNodeWidth;
        if (y < boardNodeHeight / 2) {//右上
            boardNode.style.top = 0;
        }
        else if (y > boardNodeHeight / 2 && y < middleDivNodeHeight - (boardNodeHeight / 2)) {//右中
            boardNode.style.top = (y- boardNodeHeight / 2) + "px";
        }
        else if (y > middleDivNodeHeight - (boardNodeHeight / 2)) {//右下
            boardNode.style.top =middleDivNodeHeight-boardNodeHeight;
        }
    }
    //中
    if (x > boardNodeWidth / 2 && x < middleDivNodeWidth - (boardNodeWidth / 2)) {
        boardNode.style.left = (x - boardNodeWidth / 2) + "px";
        if (y < boardNodeHeight / 2) {//上
            boardNode.style.top =0;
        }
        else if (y > middleDivNodeHeight - (boardNodeHeight / 2)) {//下
            boardNode.style.top =middleDivNodeHeight-boardNodeHeight;
        }
        else if (y > boardNodeHeight / 2 && y < middleDivNodeHeight - (boardNodeHeight / 2)) {//中
            boardNode.style.top = (y - boardNodeHeight/2) + "px";
        }
    }
    var bigAndMidlleScale=bigImgNode.clientWidth/middleDivNodeWidth;//大图与中图的比例
    var boardNodeX=boardNode.offsetLeft;//蓝色布偏移的横坐标
    var boardNodeY=boardNode.offsetTop;//蓝色布偏移的纵坐标
    bigImgNode.parentNode.scrollLeft=boardNodeX*bigAndMidlleScale;//移动大图外面div的滚动条
    bigImgNode.parentNode.scrollTop=boardNodeY*bigAndMidlleScale;//移动大图外面div的滚动条
}
