var context,
    bufferList,
    outputNode;
var keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 186,187, 188, 189, 190, 191, 192, 219, 221, 222, 226];
var urlList = [];
var config = {
    "echo": {"enable":true,"delay":0.1,"gain":0.4},
    "volume":{gain:1},
}

var init = {
    start:function(){
       this.context();
       this.buffers();
       this.handlers();
    },
    context:function(){
        if (window.AudioContext){
            context = new AudioContext();
        }else if(window.webkitAudioContext){
            context = new webkitAudioContext();
        }else{
        throw new Error("Sorry, but your browser doesn't support the Web Audio API");
        }
    },
    buffers:function(){
        // Cargamos los buffers correspondientes a los sonidos que vamos a reproducir
        var BL = new BufferLoader(context,soundFiles,function(){ // onLoad callback
            var elem = document.getElementById("loading");
                elem.parentNode.removeChild(elem);
            bufferList = BL.bufferList;
        });
        BL.load();

    },
    handlers:function(){
        //Cargamos los handlers de las teclas que reproduciran los sonidos

        var beats = document.querySelectorAll(".beat");        
        for(var i =0; i< beats.length;i++){            
            //beats[i].addEventListener("click",handlers.click);
            beats[i].onclick = handlers.click;
            beats[i].onmousedown = handlers.mousedown;
            beats[i].onmouseup = handlers.mouseup;
            beats[i].onmouseout = handlers.mouseout;

        }
        window.addEventListener('keydown',handlers.keydown);
        window.addEventListener('keyup',handlers.keyup);
        document.getElementById('echo_enable').addEventListener('change',handlers.echo_enable);
        document.getElementById('echo_delay').addEventListener('change',handlers.echo_delay);
        document.getElementById('echo_gain').addEventListener('change',handlers.echo_gain);
        document.getElementById('volume_gain').addEventListener('change',handlers.volume_gain);

        
    }
};


var handlers = {
    mouseOver:function(e){
    },
    click:function(e){        
    },
    mousedown:function(e){
        this.style.backgroundColor = "#d00";        
        // var i =  randInt(0,bufferList.length);
        if (bufferList[this.id]) { 
            playSound(bufferList[this.id]);
        }
    },
    mouseup:function(e){
         this.removeAttribute("style");
    },
    mouseout:function(){
         this.removeAttribute("style");        
    },
    keydown:function(e){
        //Buscar si el keyCode de la tecla presionada esta dentro de las teclas definidas.
        // Si no, hacer un return
        if(keyCodes.indexOf(e.keyCode) == -1) {
            return; 
        }
        
        var element = document.querySelector("#k" + e.keyCode);        
        if(e){ 
            element.onmousedown();
        }
    },
    keyup:function(e){
        if(keyCodes.indexOf(e.keyCode) == -1) {
            return; 
        }        
        var element = document.querySelector("#k" + e.keyCode);        
        if(e){         
            element.onmouseup();        
        }
    },
    echo_enable:function(){
        config.echo.enable = this.checked;
    },
    echo_delay:function(){
        config.echo.delay = this.value / 100 ;
        showValue(this.id + '_value',config.echo.delay + "ms");
    },
    echo_gain:function(){this.id + '_value'
        config.echo.gain = this.value / 10;
        showValue(this.id + '_value',config.echo.gain + "db");
    },
    volume_gain:function(){
        config.volume.gain = this.value / 100;
        showValue(this.id + '_value',config.volume.gain * 100 + "%");
    },

}
function showValue(id,value){
    var elem = document.getElementById(id);
    if(elem){elem.innerText = value}
}


function playSound(buffer){
    var soundSource = context.createBufferSource();
    var volume = context.createGainNode();
    
    soundSource.buffer = buffer;
    volume.gain.value = config.volume.gain;
    outputNode = volume;
    
    if(config.echo.enable) {
        var echo = new EchoNode(context,{'delay':config.echo.delay,'gain':config.echo.gain});        
        echo.in(soundSource);
        echo.out(outputNode);
    } else{
        soundSource.connect(outputNode);            
    }
    
    volume.connect(context.destination);
    soundSource.noteOn(0);

}
function randInt(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}