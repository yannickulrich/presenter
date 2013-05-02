//JS:master.js

var App = {
    init: function () {
        // DO SOMETHING!!
        
        this.sketchpad = Raphael.sketchpad("drawing", {
            width: 800,
            height: 600,
            editing: false
        });

        self = this;
        $.ajax({
            url: "comm/get.php?slideimages",
            cache: false
        }).done(function (data) {
            self.imageArray = data.split("\n");
            if (self.imageArray[self.imageArray.length - 1] == "")
                self.imageArray.pop();
            for (var i = 0; i < self.imageArray.length; i++)
                new Image().src = self.imageArray[i];
            
            self.pageNumber = 0;
            self.rescale();
            self.display();
        });
        window.setInterval("App.update()", 100);

    },
    update: function () {
        var self = this;
        $.ajax({
            url: "comm/news.php?read",
            cache: false
        }).done(function (msg) {
            var cmd = msg.split(">");
            self.sketchpad.json(cmd[1]);
            self.pageNumber = parseInt(cmd[0]);
            
            var offset = $("#drawing").offset();     
            
        
            var l = parseFloat(cmd[2].split(",")[0])*$("#drawing").width() +offset['left'];
            var t = parseFloat(cmd[2].split(",")[1])*$("#drawing").height()+offset['top' ];
            
            //$("#laserpointer").offfset( {"left" : , "top" :   } );
            $("#laserpointer").offset( {"top": t, "left":l });
            
            self.display();
        });
    },
    display: function () {
        $("#drawing").css( {"background-image": "url('" + this.imageArray[this.pageNumber] + "')" ,  "background-size": "contain", "width": 800*this.scale+"px", "height" : 600*this.scale+"px"});
        
        var tfm = 'S' + this.scale + ',' + this.scale + ',0,0';
        this.sketchpad.paper().forEach(function(obj){
            obj.transform(tfm);
        });
        
        if (this.fullscreen)
        {
            if (!(document.webkitIsFullScreen || document.mozFullScreen))
                this.rescale(false);
        }
        	
    },
    download : function()
    {
        self = this;
        $.ajax({
            url: "comm/get.php?slideimages",
            cache: false
        }).done(function (data) {
            imageArray = data.split("\n");
            if (imageArray[imageArray.length - 1] == "")
                imageArray.pop();
            
            for (var i = 0; i < self.imageArray.length; i++)
                new Image().src = self.imageArray[i];
            
            var svg = $("#drawing").html().split(">");
            svg.shift();
            svg = svg.join(">");
        
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <image x="0" y="0" width="800" height="600" xlink:href="' + imageArray[self.pageNumber] + '" />' + svg;
            canvg('canvasForOutput', svg);
            
            window.setTimeout('window.location.href=document.getElementById("canvasForOutput").toDataURL("image/png");', 100);
        });
        
    },
    
    rescale : function(fullscreen)
    {
        if (fullscreen == true)
        {
            var scaleWidth = (screen.width - 3) / 800;
            var scaleHeight = (screen.height - 3) / 600;
            window.setTimeout('App.fullscreen = true;', 100);
            
            
        }
        else
        {
            var scaleWidth = (window.innerWidth - 3) / 800;
            var scaleHeight = (window.innerHeight - 3) / 600;
            this.fullscreen = false;
        }
        
        
        this.scale = ((scaleWidth > scaleHeight) ? scaleHeight : scaleWidth);
        $("#wrapperMain").width(800*this.scale);
        this.display();
        $("svg").height($("#drawing").height());
        $("svg").width($("#drawing").width());
    },
    
    pageNumber: 1,
    scale: 1,
    sketchpad: null,
    imageArray : 0,
    fullscreen : false
};


$(document).ready(function() {
	App.init();
	$("#downloadBut").click(App.download);
	$("#fullscreenBut").click(function(){
	   App.rescale(true);
	   var elem = document.getElementById("wrapperMain");
        if (elem.requestFullscreen) {
            window.setTimeout('document.getElementById("wrapperMain").requestFullscreen();', 10);
        } else if (elem.mozRequestFullScreen) {
            window.setTimeout('document.getElementById("wrapperMain").mozRequestFullScreen();', 10);
        } else if (elem.webkitRequestFullscreen) {
            window.setTimeout('document.getElementById("wrapperMain").webkitRequestFullscreen();', 10);
        }
        
	});
	
	var elem = document.getElementById("wrapperMain");
	$("#toolbar").hide();
    if ((elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen))
    {
        $("#toolbar").show();
    }
});
