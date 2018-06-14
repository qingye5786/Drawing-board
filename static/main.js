/************************************
 Author      : 青叶
 Email       : chenyanphp@qq.com
 Link        : http://www.phpol.cn
 Version     : 1.0
 File        : 主要JS文件
 Description : 一个HTML5的画图板
 ************************************/
$(function(){
    // 数组线条
    $('.dropdown-toggle').dropdown()

    // 选择颜色
    $('.select-color').on('click', function(){
        $(this).find('.color').trigger('click');
    });
    $('.select-color > .color').bind('click', function(event){
        event.stopPropagation();
    });


    // 获取画布及相关大小
    var canvas = $('canvas')[0].getContext('2d');
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;
    var leftMenuWidth = $('aside').width();
    // 设定初始参数
    var params = {
        width : screenWidth-leftMenuWidth,
        height : screenHeight-15,
        color : "#000",
        type : "pen",
        linewidth : "1",
        style : "stroke",
        arr : []
    };
    // 设定画布大小
    $('canvas').attr('width', params.width);
    $('canvas').attr('height', params.height);
    // 画笔事件
    var x,y,w,h;
    var lx,ly,lw,lh;
    var draw;
    var isDown = false;
    // 按下（接触画布）
    $('canvas').on('mousedown',function(e){
        x = e.offsetX;
        y = e.offsetY;
        if(params.type === "pen"){
            canvas.beginPath();
            canvas.moveTo(x,y);
        }
        if(params.type === "eraser"){
            canvas.clearRect(x-5,y-5,10,10);
        }
        draw = new Draw(canvas,{type:params.style,color:params.color,width:params.linewidth});
        isDown = true;
    });
    // 移动（画）
    $('canvas').on('mousemove',function(e){
        if (isDown) {
            w = e.offsetX;
            h = e.offsetY;
            if(params.type != "eraser"){
                canvas.clearRect(0,0,params.width,params.height);
                if(params.arr.length!=0){
                    canvas.putImageData(params.arr[params.arr.length-1],0,0,0,0,params.width,params.height);
                }
            }
            if(params.type=="poly"){
                draw[params.type](x,y,w,h,n);
            }else{
                draw[params.type](x,y,w,h);
            }

        }
    });
    // 松开
    $('canvas').on('mouseup',function() {
        if (isDown) {
            canvas.onmousemove = null;
            document.onmouseup = null;
            params.arr.push(canvas.getImageData(0, 0, params.width, params.height));
            isDown = false;
        }
    });
    // 选择工具
    $('#paint-brush > li').on('click', function(){
        $('#paint-brush > li').removeClass("active");
        $('#shape > li').removeClass("active");
        $(this).toggleClass("active");
        params.type = $(this).data("type");
    });
    // 选择形状
    $('#shape > li').on('click', function(){
        $('#paint-brush > li').removeClass("active");
        $('#shape > li').removeClass("active");
        $(this).toggleClass("active");
        params.type = $(this).data("type");
    });
    // 选择改变颜色
    $('#line-color').on('change', function(){
        params.color = $(this).val();
    });
    // 改变粗细
    $('#line-width > li').on('click', function(){
        console.log($(this).data('value'));
        params.linewidth = $(this).data('value');
    });
    // 撤销操作
    $('#back-op').on('click', function(){
        params.arr.pop();
        canvas.clearRect(0,0,params.width,params.height);
        if(params.arr.length>0){
            canvas.putImageData(params.arr[params.arr.length-1],0,0,0,0,params.width,params.height);
        }
    });
    // 清空画布
    $('#clear-canvas').on('click', function(){
        if (confirm('确定要清空画布吗？')) {
            params.arr=[];
            canvas.clearRect(0,0,params.width,params.height);
        }
    })
});