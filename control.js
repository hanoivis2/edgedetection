document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas')
    var backcontext = back.getContext('2d');
 
    var cw,ch;
 
    v.addEventListener('play', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);
 
},false);
 
function draw(v,c,bc,cw,ch) {
    if(v.paused || v.ended) return false;
    
    bc.drawImage(v,0,0,cw,ch);
    
    var idata = bc.getImageData(0,0,cw,ch);            //mảng 1 chiều thông tin theo thứ tự R,G,B,A của từng điểm ảnh 
    var data = idata.data;
    var w = idata.width;
    var limit = data.length                             //tổng số pixel của khung hình
    
    for(var i = 0; i < limit; i++) {
        if( i%4 == 3 ) continue;        //giữ nguyên kênh alpha
        data[i] = 
                    (data[i - w*4 -4] + data[i - w*4]*2 +data[i - w*4 + 4]) - (data[i + w*4 -4] + data[i + w*4]*2 +data[i + w*4 + 4])
                   + (data[i - 4 - w*4] + data[i - 4]*2 +data[i - 4 + w*4]) - (data[i + 4 - w*4] + data[i + 4]*2 +data[i + 4 + w*4]);
    }
    
    c.putImageData(idata,0,0);
    
    setTimeout(draw,20,v,c,bc,cw,ch);
}
