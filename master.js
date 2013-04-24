//JS:master.js

PDFJS.workerSrc = 'PDFJS/worker_loader.js';
var App = {
    init: function () {
        // DO SOMETHING!!
        var self = this;
        PDFJS.getDocument("get.php?slides").then(function (pdf) {
            self.pdfObj = pdf;
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
            url: "news.php?read",
            cache: false
        }).done(function (msg) {
            var cmds = msg.split(">");
            for (var i = 0; i < cmds.length; i++) {
                var cmd = cmds[i].split("|||");
                if (cmd[0] == "Movepage") {
                    self.pageNumber = parseInt(cmd[1]) + 1;
                    self.pdfObj.getPage(self.pageNumber).then(function (page) { self.pageObj = page; self.display() });
                }
                else if (cmd[0] == "Draw") {
                    self.sketchpad.json(cmd[1]);
                }
            }
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
    sketchpad: null
};


$(document).ready(function() {
	App.init();
});
