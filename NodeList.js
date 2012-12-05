function NodeList(){    
    this.list = [];
}
NodeList.prototype.add = function(node){
    this.list.push(node);
}
NodeList.prototype.connect = function(){
    for (var i = 0;i<this.list.length - 1;i++){
        if(this.list[i +1].input) 
            this.list[i].connect(this.list[i + 1].input);        
        else 
            this.list[i].connect(this.list[i + 1]);
    }
}

NodeList.prototype.disconnect = function(){
    for (var i = 0;i<this.list.length ;i++){
        this.list[i].disconnect();
    }
}