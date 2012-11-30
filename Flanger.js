function FlangerNode(context,o){
    this.dn = context.createDelayNode();
    this.dn = o.dn || 0.01;    
}
FlangerNode.prototype.in = function(input){
    input.connect(this.dn);    
}
FlangerNode.prototype.out = function(out){
    this.dn.connect(out);
}