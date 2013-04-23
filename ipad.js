//JS:master.js

PDFJS.workerSrc = 'PDFJS/worker_loader.js';
var App = {
    syncPage: function () {
        // Push it to the server
        $.ajax({
            url: "news.php?write&data=Movepage:" + this.pageNumber,
            cache: false
        });
    },
    showNotes: function () {
        $("#notes").html(this.notesArray[(this.pageNumber*2) -2]);
    },
    init: function (pdfURL, notesURL) {
        var self = this;

        $.ajax({
            url: notesURL,
            cache: false
        }).done(function (data) {
            self.notesArray = data.split("\n");
            self.showNotes();
        });

        var self = this;
        PDFJS.getDocument(pdfURL).then(function (pdf) {
            self.pdfObj = pdf;
            pdf.getPage(self.pageNumber).then(function (page) {
                self.pageObj = page;

                var viewport = page.getViewport(1);

                var scaleWidth = 700 / viewport.width;
                var scaleHeight = 700 / viewport.height;

                self.scale = ((scaleWidth > scaleHeight) ? scaleHeight : scaleWidth);
                self.scaleAnnotation = self.scale;
                self.display();
            });
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
    displayAnnotationmode: function () {
        var viewport = this.pageObj.getViewport(this.scaleAnnotation);
        var canvas = document.getElementById('annotation');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        this.pageObj.render(renderContext);
    },
    swipe: function (dir) { 
        this.pageNumber += dir;
        self = this;
        this.pdfObj.getPage(this.pageNumber).then(function (page) {
            self.pageObj = page;
            self.display()
        });
        this.syncPage();
        this.showNotes();
    },
    pdfObj: 0,
    pageNumber: 1,
    pageObj: 0,
    scale: 1,
    scaleAnnotation: 1,
    notesArray: []
};


$(document).ready(function() {
    App.init("content/slides.pdf", "content/notes.txt");
    $("#slide").touchwipe({
        wipeLeft: function() { App.swipe(1); },
        wipeRight: function() { App.swipe(-1); },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    }).dblclick(function() {
        App.displayAnnotationmode();
        $("#wrapperMain").hide();
        $("#wrapperAnnotate").show();
    });
});

function hideAnnotation()
{
    App.display();
    $("#wrapperMain").show();
    $("#wrapperAnnotate").hide();
}
