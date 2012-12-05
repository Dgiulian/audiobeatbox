/*
** Efecto de eco utilizando un DelayNode y un GainNode.
** La idea basica es crear un ciclo entre el Delay y el Gain (La salida de uno a la entrada de otro) y a su vez conectar la entrada con la salida.
** 
** Parametros: context: instancia de AudioContext.
**             o: Objeto de configuracion. o.gain la ganancia del eco y o.delay es el delay.   
** El valor de la ganancia no puede ser mayor que 1     
**
*/
function EchoNode(context,o){
    if (!o) o={};

    this.input  =  context.createGainNode();
    this.output = context.createGainNode();
    var     gn = context.createGainNode(),
            dn = context.createDelayNode();
    
    this.delay = function (d){
        dn.delayTime.value = d;
    }
    this.gain = function (g){ // Setea el valor de la ganancia. Este valor no puede ser mayor que 1 
        g = (g>1)? g % 1: g;
        gn.gain.value = g;
    }
    this.gain(o.gain   || 0.4);
    this.delay(o.delay || 0.1); 

    dn.connect(gn);
    gn.connect(dn);    
    dn.connect(this.output);
    this.input.connect(dn);
    this.input.connect(this.output);  
}

EchoNode.prototype.connect = function(target){
     this.output.connect(target);
}
EchoNode.prototype.disconnect = function(){
    this.output.disconnect();
}