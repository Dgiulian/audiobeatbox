<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Beat box</title>
    <link rel="stylesheet" href="css/style.css">

    <script type="text/javascript" src="BufferObjLoader.js"></script>
    <script type="text/javascript" src="soundFiles.js"></script>
    <script type="text/javascript" src="EchoNode.js"></script>
    <script type="text/javascript" src="ConvolverNode.js"></script>
    <script type="text/javascript" src="NodeList.js"></script>
    <script type="text/javascript" src="Beats.js"></script>
</head>

<body>
    <h1>Web Audio Beatbox </h1>
    <div id="loading"><h2><img src="loader.gif" alt="loading" width="30" height="30"> Loading Sounds. Please wait.</h2></div>
    <div id="beats">
        <div id="k49"  class="beat">1</div>
        <div id="k50"  class="beat">2</div>
        <div id="k51"  class="beat">3</div>
        <div id="k52"  class="beat">4</div>
        <div id="k53"  class="beat">5</div>
        <div id="k54"  class="beat">6</div>
        <div id="k55"  class="beat">7</div>
        <div id="k56"  class="beat">8</div>
        <div id="k57"  class="beat">9</div>
        <div id="k48"  class="beat">0</div>
        <div id="k219" class="beat">?</div>
        <div id="k221" class="beat">¡</div>

        <div id="k81"  class="beat">Q</div>
        <div id="k87"  class="beat">W</div>
        <div id="k69"  class="beat">E</div>
        <div id="k82"  class="beat">R</div>
        <div id="k84"  class="beat">T</div>
        <div id="k89"  class="beat">Y</div>
        <div id="k85"  class="beat">U</div>
        <div id="k73"  class="beat">I</div>
        <div id="k79"  class="beat">O</div>
        <div id="k80"  class="beat">P</div>
        <div id="k186" class="beat">^</div>
        <div id="k187" class="beat">*</div>

        <div id="k65"  class="beat">A</div>
        <div id="k83"  class="beat">S</div>
        <div id="k68"  class="beat">D</div>
        <div id="k70"  class="beat">F</div>
        <div id="k71"  class="beat">G</div>
        <div id="k72"  class="beat">H</div>
        <div id="k74"  class="beat">J</div>
        <div id="k75"  class="beat">K</div>
        <div id="k76"  class="beat">L</div>
        <div id="k192" class="beat">Ñ</div>
        <div id="k222" class="beat">¨</div>
        <div id="k191" class="beat">ç</div>
        
        <div           class="spacer"></div>
        <div id="k226" class="beat">&lt;</div>
        <div id="k90"  class="beat">Z</div>
        <div id="k88"  class="beat">X</div>
        <div id="k67"  class="beat">C</div>
        <div id="k86"  class="beat">V</div>
        <div id="k66"  class="beat">B</div>
        <div id="k78"  class="beat">N</div>
        <div id="k77"  class="beat">M</div>
        <div id="k188" class="beat">,</div>
        <div id="k190" class="beat">.</div>
        <div id="k189" class="beat">-</div>
        
    </div>
    <div id="controls">

        <div class="control" id="echo">
            <h2 class="name" >
                <labelfor="echo_enable">Echo</label>
                <input type="checkbox" name="echo_enable" id="echo_enable" >
            </h2> 
            <label for="echo_delay">Delay: </label>
            <input type="range" name="echo_delay" id="echo_delay" min="1" max="100" value="10" > 
            <span id="echo_delay_value">0.5ms</span>
            <br>
            <label for="echo_gain">Gain:</label>
            <input type="range" name="echo_gain" id="echo_gain" min="1" max="9" value="5" >
            <span id="echo_gain_value">0.5dB</span> <br>
        </div>
          
        <div class="control" id="convolver">
            <h2 class="name" >
                <labelfor="convolver_enable">Convolver</label>
                <input type="checkbox" name="convolver_enable" id="convolver_enable" >
            </h2> 
            <br>
            <label for="convolver_type">Tipo</label>
            <select name="convolver_type" id="convolver_type" >
                <option value="Trig_Room">Trig Room</option>
                <option value="Rays">Rays</option>
                <option value="Parking_Garage">Parking Garage</option>
                <option value="Nice_Drum_Room">Nice Drum Room</option>
                <option value="Narrow_Bumpy_Space">Narrow Bumpy Space</option>
                <option value="Going_Home">Going Home</option>
                <option value="Five_Columns">Five Columns</option> 
                <option value="Five_Columns_Long">Five Columns Long</option>
                <option value="French_18th_Century_Salon">French 18th Century Salon</option>
                <option value="In_The_Silo_Revised">In The Silo Revised</option>
            </select>
        </div>

        <div class="control" id="volume">
            <h2 class="name" >
                <labelfor="volume_enable">Volumen</label>
                <!-- <input type="checkbox" name="volume_enable" id="volume_enable" checked> -->
            </h2> 
            <br>
            <label for="volume_gain">Gain:</label>
            <input type="range" name="volume_gain" id="volume_gain" min="0" max="200" value="100" >
            <span id="volume_gain_value">100%</span> <br>
        </div>

    </div>
    <div id="descripcion">
        Beatbox muy simple que utiliza la API de Audio de Chrome. <br/>
        Utilize el teclado o el mouse para reproducir los sonidos.
        <br/>
        Proximamente:
         <ul>
            <li>Control de Volumen</li>
            <li>Efectos de sonido(Delay,Eco, etc.)</li>
            <li>Cambio de orden de sonidos (Teclas)</li>
            <li>Carga de nuevos sonidos</li>
        </ul>
    </div>
    <div id="footer">Creado por <a href="https://github.com/Dgiulian">dgiulian</a> - Nov 2012</div>
</body>
<script type="text/javascript">
    window.onload = function(){
        document.onselectstart = function(){return false;};
        init.start();
    }
</script>
</html>