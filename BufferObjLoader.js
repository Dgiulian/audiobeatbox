/* Carga los sonidos con los archivos del objeto urlObj.
   Creado a partir de http://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
 */
function BufferLoader(context,urlObj,callback){
    this.context=context;
    this.urlObj=urlObj;
    this.onload=callback;
    this.bufferList=new Object();
    this.loadCount = 0;
    var cant = 0;
    for(b in urlObj)  {
        cant++;
    }
    this.size = cant;
}
BufferLoader.prototype.loadBuffer= function(url,index){
var request=new XMLHttpRequest();
request.open("GET",url,true);
request.responseType="arraybuffer";
var loader=this;

request.onload=function(){
    loader.context.decodeAudioData(request.response,function(buffer){
    if(!buffer){
        alert('error decoding file data: '+url);
        return;
    }
    loader.bufferList[index]=buffer; 
        if(++loader.loadCount==loader.size)
            loader.onload(loader.bufferList);
    },function(error){console.error('decodeAudioData error',error);});
    }
    request.onerror=function(){
        alert('BufferLoader: XHR error');
    }
    request.send();
}

BufferLoader.prototype.load=function(){
    for(b in this.urlObj) {
        this.loadBuffer(this.urlObj[b],b);
    }
}