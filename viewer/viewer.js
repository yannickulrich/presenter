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
    pdfObj: 0,
    pageNumber: 1,
    pageObj: 0,
    scale: 1,
    sketchpad: null,
    listOfPageObj : null
};


$(document).ready(function() {
	App.init();
});
