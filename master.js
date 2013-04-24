//JS:master.js

PDFJS.workerSrc = 'PDFJS/worker_loader.js';
var App = {
	init: function(pdfURL) {
		// DO SOMETHING!!
		var self = this;
        PDFJS.getDocument(pdfURL).then(function(pdf)
        {
            self.pdfObj = pdf;
            pdf.getPage(self.pageNumber).then(function(page) {
                self.pageObj = page;
                
                var viewport = page.getViewport(1);
                
                var scaleWidth  = window.innerWidth / viewport.width;
                var scaleHeight = window.innerHeight / viewport.height;
                
                self.scale = ((scaleWidth > scaleHeight) ? scaleHeight : scaleWidth);
                self.display();
            });
        });
    },
    update : function()
    {
        self = this;
        $.ajax({
            url: "news.php?read",
            cache: false
        }).done(function( msg )
        {
            var cmds = msg.split(">");
            for (var i = 0; i < cmds.length; i++)
            {
                var cmd = cmds[i].split(":");
                if (cmd[0] == "Movepage")
                {
                    self.pageNumber = parseInt(cmd[1]);
                    self.pdfObj.getPage(self.pageNumber).then(function(page) { self.pageObj = page; self.display() });
                }
            }
        });
    },
    display : function()
    {
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
    pdfObj : 0,
	pageNumber : 1,
	pageObj : 0,
	scale : 1
};


$(document).ready(function() {
	App.init("content/slides.pdf");
	window.setInterval("App.update()", 500);
});
