//JS:master.js

PDFJS.workerSrc = 'lib/PDFJS/worker_loader.js';
var App = {
    init: function () {
        // DO SOMETHING!!
        var self = this;
        PDFJS.getDocument("comm/get.php?slides").then(function (pdf) {
            self.pdfObj = pdf;
            
            self.listOfPageObj = new Array(pdf.pdfInfo.numPages);
            
            for(var i = 1; i<= pdf.pdfInfo.numPages; i++)
            {
                pdf.getPage(i).then(function (page) { 
                    self.listOfPageObj[page.pageNumber-1] = page;
                });
            }
            pdf.getPage(self.pageNumber).then(function (page) {
                self.pageObj = page;

                var viewport = page.getViewport(1);

                var scaleWidth = (window.innerWidth - 3) / viewport.width;
                var scaleHeight = (window.innerHeight - 3) / viewport.height;

                self.scale = ((scaleWidth > scaleHeight) ? scaleHeight : scaleWidth);
                self.display();
                self.sketchpad = Raphael.sketchpad("drawing", {
                    width: 800,
                    height: 600,
                    editing: false
                });
                $("#drawing").attr("style", "").css("-webkit-transform", "scaleX(" + (viewport.width * self.scale / 800.0) + ") scaleY(" + (viewport.height * self.scale / 600.0) + ")");
                $("#drawing, #drawing svg").css("position", "absolute");
                window.setInterval("App.update()", 100);
                $("body").css("width", viewport.width * self.scale).css("margin", "0 auto").css("overflow", "hidden").css("background", "#000");
                $("#slide").css("border", "none");
            });

        });


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
            
            var offset = $("#slide").offset();     
            
        
            var l = parseFloat(cmd[2].split(",")[0])*$("#slide").width() +offset['left'];
            var t = parseFloat(cmd[2].split(",")[1])*$("#slide").height()+offset['top' ];
            
            //$("#laserpointer").offfset( {"left" : , "top" :   } );
            $("#laserpointer").offset( {"top": t, "left":l });
            
            self.pageObj = self.listOfPageObj[self.pageNumber];
            self.display();
        });
    },
    display: function () {
        var viewport = this.pageObj.getViewport(this.scale);
        var canvas = document.getElementById('slide');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;


        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        this.pageObj.render(renderContext);
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
            
            var svg = $("#drawing").html().split(">");
            svg.shift();
            svg = svg.join(">");
        
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <image x="0" y="0" width="800" height="600" xlink:href="' + imageArray[self.pageNumber] + '" />' + svg;
            canvg('canvasForOutput', svg);
            
            window.setTimeout('window.location.href=document.getElementById("canvasForOutput").toDataURL("image/png");', 100);
        });
        
    },
    pdfObj: 0,
    pageNumber: 1,
    pageObj: 0,
    scale: 1,
    sketchpad: null,
    listOfPageObj : null
};


$(document).ready(function() {
	App.init();
	$("#downloadBut").click(App.download);
	$("#fullscreenBut").click(function(){
	   var elem = document.getElementById("wrapperMain");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
	});
});
