
/*
Ryvan Prabhu
ImageGoPlus JS Script
Pinheads Pte Ltd @ 2017
*/

/* things you don't really bother about starts */
(function(){

var ImageGoPlus = window.ImageGoPlus || {};

    ImageGoPlus = (function(){

        Core = function(){
            var _ = this;

            _.elem = document.getElementById("imagegoplus");

            _.setting = {
                imgUrl: _.elem.getAttribute("img-src"),
                pattern: _.elem.getAttribute("pattern"),
                endAt: _.elem.getAttribute("frames"),
                finish: _.elem.getAttribute("end"),
                rows: _.elem.getAttribute("rows"),
                startx: _.elem.getAttribute("startx"),
                starty: _.elem.getAttribute("starty"),
                interval: _.elem.getAttribute("interval"),
                jx: _.elem.getAttribute("jumpx"),
                jy: _.elem.getAttribute("jumpy")
            }


        }

        return Core;

    })();

    ImageGoPlus.prototype.play = function(x,y,mpos,npos){

      console.log(x+":"+y);
        var _ = this.setting;
        var m = 0;
        var imgElem = this.elem;
        var n = 0;
        var $this = this;

        // if(ncount !== undefined){
        //     n = ncount
        // }else{
        //     n = _.startAt;
        // }


        //var x =0,y=0;

        var ix = _.jx;
        var jy = _.jy;

        var firstx = 0;

                if(npos !== undefined){
                    n = npos
                }

                if(mpos !== undefined){
                    m = mpos
                }

        window.timeline = setInterval(function(){




          if(n >= (_.finish)){
              clearInterval(timeline);
              $this.reset();

          }

            if(m >= _.endAt){

                 y = y - parseInt(jy);
                 m = 0;
                 x = firstx;


            }



            console.log(x+"px "+y+"px");

            imgElem.style.backgroundPosition = x+"px "+y+"px"; // promise

            x = x - parseInt(ix);



            m++;
            n++;

            window.xpos = x;
            window.ypos = y;
            window.mcount = m;
            window.ncount = n;


        console.log("m : "+m+",n :"+n);
           // window.frame = n;

        },_.interval);

    }

    ImageGoPlus.prototype.pause = function(){
        clearInterval(timeline)
        return this;
    }

    ImageGoPlus.prototype.reset = function(){
        console.log("reseted");
        var _ = this.setting;
        var imgElem = this.elem;

        imgElem.style.backgroundImage = "url("+_.imgUrl+")"; //
        imgElem.style.backgroundPosition = _.startx+"px "+_.starty+"px"; //

        document.getElementById("play").setAttribute("action","start");
        document.getElementById("play").innerHTML = "Play";
    }

    ImageGoPlus.prototype.init = function(){

        this.reset();

    }

    window.ImageGoPlus = new ImageGoPlus();

}());

/* things you don't really bother about ends*/

/* initializing script */
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

