/************************************
 Author      : 青叶
 Email       : chenyanphp@qq.com
 Link        : http://www.phpol.cn
 Version     : 1.0
 File        : 画笔对象
 Description : 一个HTML5的画图板
 ************************************/
function Draw(canvas,setting) {
    this.canvas = canvas;
    this.type = setting.type||"stroke";
    this.color = setting.color||"#000";
    this.width = setting.width||"1";
}
Draw.prototype = {
    init:function(){
        this.canvas.strokeStyle=this.color;
        this.canvas.fillStyle=this.color;
        this.canvas.lineWidth=this.width;
    },
    rect:function(x,y,x1,y1){
        this.init();
        this.canvas.beginPath();
        this.canvas.rect(x,y,x1-x,y1-y);
        if(this.type == "stroke"){
            this.canvas.stroke();
        }else if(this.type == "fill"){
            this.canvas.fill();
        }
    },
    line:function(x,y,x1,y1){
        this.init();
        this.canvas.beginPath();
        this.canvas.moveTo(x,y);
        this.canvas.lineTo(x1,y1);
        this.canvas.stroke();
    },
    circle:function(x,y,x1,y1){
        this.init();
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.canvas.beginPath();
        this.canvas.arc(x,y,r,0,2*Math.PI);
        if(this.type == "stroke"){
            this.canvas.stroke();
        }else if(this.type == "fill"){
            this.canvas.fill();
        }
    },
    poly:function(x,y,x1,y1,n){
        this.init();
        var obj=this.canvas;
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));;
        obj.save();
        obj.translate(x,y);
        obj.rotate(Math.PI/2);
        var nx=r*Math.cos(Math.PI/n);
        var ny=r*Math.sin(Math.PI/n);
        obj.beginPath();
        obj.lineCap="round";
        obj.moveTo(nx,ny);
        for(var i=0;i<=n;i++){
            obj.rotate(Math.PI*2/n);
            obj.lineTo(nx,-ny);
        }
        if(this.type == "stroke"){
            this.canvas.stroke();
        }else if(this.type == "fill"){
            this.canvas.fill();
        }
        obj.restore();
    },
    pen:function(x,y,x1,y1){
        this.init();
        this.canvas.save();
        this.canvas.lineCap="round";
        this.canvas.lineTo(x1,y1);
        this.canvas.stroke();
        this.canvas.restore();
    },
    eraser:function(x,y,x1,y1){
        this.canvas.lineCap="round";
        this.canvas.clearRect(x1-5,y1-5,10,10);
    },
    cut:function(x,y,x1,y1){
        this.init();
        this.canvas.save();
        this.canvas.setLineDash([4,2]);
        this.canvas.beginPath();
        this.canvas.lineWidth=1;
        this.canvas.rect(x,y,x1-x,y1-y);
        this.canvas.stroke();
        this.canvas.restore();
    }
}