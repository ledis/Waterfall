window.onload=function(){
    waterfall('main','box');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkScrollSlide){
            //将数据块渲染到底部
            var oParent=document.getElementById('main');
            for(var i=0;i<dataInt.data.length;i++){
                var oBoxs=document.createElement("div");
                oBoxs.className='box';
                oParent.appendChild(oBoxs);
                var oPic=document.createElement("div");
                oPic.className='picBox';
                oBoxs.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src="images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}
function waterfall(parent,box){
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    //获取所有的box的盒子
    var oBoxs=getByClass(oParent,box);
    //计算整个页面现实的列数（页面宽/box的宽）
    //offset=padding+width+border
    var oBoxW=oBoxs[0].offsetWidth;
    //console.log(oBoxW);
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //console.log(cols);
    //设置main的宽度
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    //存放每列高度的数组
    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        //判断前几张
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            //console.log(minH);
            var index=getMinHIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            //方法一
            //oBoxs[i].style.left=oBoxW*index+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    //console.log(hArr);
}
//根据class获取元素
function getByClass(parent,clsName){
    var boxArr=new Array();//用来存储取到的class为box的元素
    var oElements=parent.getElementsByTagName("*");
    for (var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getMinHIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
//检测是否具备滚动加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById("main");
    var oBoxs=getByClass(oParent,'box');
    var lastBoxHeight=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    var height=document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxHeight<scrollTop+height)?true:false;
}
