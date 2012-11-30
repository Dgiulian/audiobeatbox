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
    this.gn = context.createGainNode();
    this.dn = context.createDelayNode();
    this.dn.connect(this.gn);
    this.gn.connect(this.dn);
    this.input = null;
    this.output = null;
    this.gain(o.gain || 0.4);
    this.delay(o.delay || 0.1);     
}

EchoNode.prototype.in = function(input){
    input.connect(this.dn);
    this.input = input;   
    if (this.output) { input.connect(this.output);}

}
EchoNode.prototype.out = function(output){
    if(this.input) { this.input.connect(output);}
    this.dn.connect(output);
    this.output = output;
}
EchoNode.prototype.delay = function(d){
    this.dn.delayTime.value = d;
}
EchoNode.prototype.gain = function(g){
    /* Setea el valor de la ganancia. Este valor no puede ser mayor que 1 */
    g = (g>1)? g % 1: g;
    this.gn.gain.value = g;
}