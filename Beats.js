var context,
    bufferList,
    outputNode;
var keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 186,187, 188, 189, 190, 191, 192, 219, 221, 222, 226];
var config = {
    "echo": {"enable":false,"delay":0.1,"gain":0.4},
    "convolver":{"enable":false,"buffer":null},
    "volume":{gain:1},
}

var init = {
    start:function(){
       this.context();
       this.buffers();
       this.convolvers();
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
    convolvers:function(){
        
        var RL = new BufferLoader(context,convolverUrls,function(){
            convolverList = RL.bufferList;
            config.convolver.buffer = convolverList['Trig_Room'];
        });
        RL.load();
    },
    handlers:function(){
        //Cargamos los handlers de las teclas que reproduciran los sonidos

        var beats = document.querySelectorAll(".beat");        
        for(var i =0; i< beats.length;i++){            
            beats[i].onclick = handlers.click;
            beats[i].onmousedown = handlers.mousedown;
            beats[i].onmouseup = handlers.mouseup;
            beats[i].onmouseout = handlers.mouseout;

        }
        window.addEventListener('keydown',handlers.keydown);
        window.addEventListener('keyup',handlers.keyup);
        document.getElementById('echo_enable').onchange    = handlers.echo_enable;
        document.getElementById('echo_delay').onchange     = handlers.echo_delay;
        document.getElementById('echo_gain').onchange      = handlers.echo_gain;
        document.getElementById('volume_gain').onchange    = handlers.volume_gain;
        document.getElementById('convolver_type').onchange = handlers.convolver_change;
        document.getElementById('convolver_enable').onchange = handlers.convolver_enable;
    }
};


var handlers = {
    mouseOver:function(e){
    },
    click:function(e){        
    },
    mousedown:function(e){
        this.style.backgroundColor = "#d00";        
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
        if(keyCodes.indexOf(e.keyCode) == -1) return; 

        var element = document.querySelector("#k" + e.keyCode);        
        if(element)
            element.onmousedown();
    },
    keyup:function(e){
        if(keyCodes.indexOf(e.keyCode) == -1) {
            return; 
        }        
        var element = document.querySelector("#k" + e.keyCode);        
        if(element)
            element.onmouseup();                
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
    convolver_change:function(){       
        if(convolverList[this.value]){
            config.convolver.buffer = convolverList[this.value];       
        }else {
            console.log("Null buffer");
            config.convolver.buffer = null;
        }

    },
    convolver_enable:function(){
        config.convolver.enable = this.checked;
        document.getElementById('convolver_type').onchange();
    }

}
function showValue(id,value){
    var elem = document.getElementById(id);
    if(elem){elem.innerText = value}
}

function playSound(buffer){
    var soundSource    = context.createBufferSource();
    var volume         = context.createGainNode();    
    var nl             = new NodeList();
    soundSource.buffer = buffer;
    volume.gain.value  = config.volume.gain;

    nl.add(soundSource);
    if(config.echo.enable){
        var echo = new EchoNode(context,{'delay':config.echo.delay,'gain':config.echo.gain});    
        nl.add(echo);
    }
    if(config.convolver.enable){
        var convolver = new ConvolverNode(context,{'buffer':config.convolver.buffer});
        nl.add(convolver);
    }

    nl.add(volume);
    nl.add(context.destination);
    nl.connect();
    soundSource.noteOn(0);
}
