//JS:master.js

//This looks cool: http://ianli.com/sketchpad/

var App = {
    DRAWING_MODES: { "erase": 0, "draw": 1 },
    syncPage: function () {
        // Push it to the server
        self = this;
        $.ajax({
            url: "news.php?write&data=Movepage:" + self.pageNumber,
            cache: false
        });
    },
    syncDrawing: function () {
        // Push it to the server
        self = App;
        $.ajax({
            url: "news.php?write&data=Draw:" + self.sketchpad.json(),
            cache: false
        });
    },
    showNotes: function () {
        $("#notes").html(this.notesArray[this.pageNumber]);
    },
    init: function (pdfURL, notesURL) {
        var self = this;

        $.ajax({
            url: notesURL,
            cache: false
        }).done(function (data) {
            self.notesArray = data.split("\n> ");
            self.showNotes();
        });
        $.ajax({
            url: "get.php?slideimages",
            cache: false
        }).done(function (data) {
            self.imageArray = data.split("\n");
            $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
        });
        this.sketchpad = Raphael.sketchpad("drawing", {
            width: 800,
            height: 600,
            editing: true
        });

        this.sketchpad.change(this.syncDrawing);
        this.syncPage();
        this.showNotes();

    },
    swipe: function (dir) {
        if (this.pageNumber + dir + 1 >= this.imageArray.length || this.pageNumber + dir < 0) return;
        this.annotationArray[this.pageNumber] = this.sketchpad.json(); //Save drawings
        this.pageNumber += dir;
        this.sketchpad.json(this.annotationArray[this.pageNumber]); //Get drawings back
        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
        this.syncPage();
        this.showNotes();
    },
    selectTool: function (mode) {
        switch (mode) {
            case this.DRAWING_MODES.erase: this.sketchpad.editing("erase"); break;
            case this.DRAWING_MODES.draw: this.sketchpad.editing(true); break;
        }
    },
    pageNumber: 0,
    scale: 1,
    scaleAnnotation: 1,
    notesArray: new Array(),
    imageArray: new Array(),
    sketchpad: null,
    annotationArray: []
};


$(document).ready(function() {
    App.init("content/slides.pdf", "content/notes.txt");
    $("#slide").touchwipe({
        wipeLeft: function() { App.swipe(1); },
        wipeRight: function() { App.swipe(-1); },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    });
});