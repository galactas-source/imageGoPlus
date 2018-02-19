# imageGoPlus
A simple javascript player which can turn your image frames (preferably in grid layout)  into playable sequence for your browser.

# Demo
Soon - actually its pretty easy for you to try it out by yourself.

#### Dependencies
Works With Any Modern Broser

#### Initialization

Add this into the <body> tag, try not to change the structure unless you know what you are doing but feel free to style it.
  
```html
<div class='player'>
<div id="imagegoplus" frames=10 rows=10 end=99 interval="100" jumpx="375" jumpy="375" startx="0" starty="0" img-src="./images/ssTest1.png" ></div>
</div>

<div class='action'>
  <button id="play" action="start" >Play</button><button id="restart">Restart</button>
</div>


<script type='text/javascript' src='js/imagegoplus.js'>
```

Add this into the <script> tag just before the </body>,this part actually controls how the player should work.As you can see the player and the imageplusgo.js library both two different setups.

```javascript

window.onload = function(){

    ImageGoPlus.init();
    var button = document.getElementById("play");
    document.getElementById("play").addEventListener("click",function(){

        if(this.getAttribute("action") == "start"){
            var x = ImageGoPlus.setting.startx;
            var y = ImageGoPlus.setting.starty;
            ImageGoPlus.play(x,y);
            this.innerHTML = "Pause";
            this.setAttribute("action","playing");

        }else if(this.getAttribute("action") == "paused"){

            ImageGoPlus.play(window.xpos,window.ypos,window.mcount,window.ncount);
            this.innerHTML = "Pause";
            this.setAttribute("action","playing");
        }else{
            ImageGoPlus.pause();
            this.innerHTML = "Play";
            this.setAttribute("action","paused");
        }

    });

    document.getElementById("restart").addEventListener("click",function(){
        ImageGoPlus.pause().reset();

    });

    document.addEventListener("visibilitychange", function() {
    if(button.getAttribute("action") != "start"){
      if(this.visibilityState == "hidden"){
        ImageGoPlus.pause();
        button.innerHTML = "Play";
        button.setAttribute("action","paused");
      }else{
        ImageGoPlus.play(window.xpos,window.ypos,window.mcount,window.ncount);
        button.innerHTML = "Pause";
        button.setAttribute("action","playing");
      };
    }
    });
}
```


#### License

Copyright (c) 2016 Ryvan Prabhu

Licensed under the MIT license.
