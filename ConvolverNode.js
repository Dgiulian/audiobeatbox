// function ConvolverNode(context,o){
//     o = o || {};
//     this.input = context.createGainNode();
//     this.output = context.createGainNode();    
//     var cnv = context.createConvolver();

//     this.buffer = function(buffer){
//         cnv.buffer = buffer;
//     }
//     if (o.buffer) this.buffer(o.buffer);

//     this.input.connect(cnv);
//     cnv.connect(this.output);
// }
function ConvolverNode(context,o){
    o = o || {};
    this.input  = context.createConvolver();
    // this.output = context.createGainNode();       

    this.setBuffer = function(buffer){
        this.input.buffer = buffer;
    }
    if (o.buffer) this.setBuffer(o.buffer);
}

ConvolverNode.prototype.connect = function(target){
    this.input.connect(target);
}

EchoNode.prototype.disconnect = function(){
    this.output.disconnect();
}