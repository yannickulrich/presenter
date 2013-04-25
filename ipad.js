//JS:master.js

//This looks cool: http://ianli.com/sketchpad/

var App = {
    DRAWING_MODES: { "erase": 0, "draw": 1, "none": 2 },
    syncPage: function () {
        // Push it to the server
        self = this;
        $.post("news.php?write", { data: "Movepage|||" + self.pageNumber } );
    },
    syncDrawing: function () {
        // Push it to the server
        self = App;
        $.post("news.php?write", { data: "Draw|||" + App.sketchpad.json() } );
    },
    showNotes: function () {
        $("#notes").html(this.notesArray[this.pageNumber]);
    },
    init: function () {
        var self = this;
        
        
        $.ajax({
            url: "get.php?notes",
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
            if (self.imageArray[self.imageArray.length - 1] == "")
                self.imageArray.pop();

            for (var i = 0; i < self.imageArray.length; i++) {
                var preloadImage = new Image();
                preloadImage.src = self.imageArray[i];

            }

            self.annotationArray = new Array(self.imageArray.length);

            $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
        });
        this.sketchpad = Raphael.sketchpad("drawing", {
            width: 800,
            height: 600,
            editing: true
        });
        this.selectTool(this.DRAWING_MODES["none"]);
        
        this.sketchpad.change(this.syncDrawing);
        this.syncPage();
        this.showNotes();

    },
    swipe: function (dir) {
        this.annotationArray[this.pageNumber] = this.sketchpad.json(); //Save drawings
        this.pageNumber += dir;

        if (this.pageNumber < 0)
            this.pageNumber = 0;
        if (this.pageNumber > this.imageArray.length - 1)
            this.pageNumber = this.imageArray.length - 1;

        if (this.annotationArray[this.pageNumber] != undefined)
            this.sketchpad.json(this.annotationArray[this.pageNumber]); //Get drawings back
        else
            this.sketchpad.clear();

        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
        this.syncPage();
        this.showNotes();
    },
    selectTool: function (mode) {
        this.currentDrawingMode = mode;
        switch (mode) {
            case this.DRAWING_MODES.erase: this.sketchpad.editing("erase"); break;
            case this.DRAWING_MODES.draw: this.sketchpad.editing(true); break;
            case this.DRAWING_MODES.none: this.sketchpad.editing(false); break;
        }
        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
    },
    pageNumber: 0,
    scale: 1,
    scaleAnnotation: 1,
    notesArray: new Array(),
    imageArray: new Array(),
    sketchpad: null,
    annotationArray: [],
    currentDrawingMode: 0
};


$(document).ready(function() {
    App.init();
    $("#drawing").touchwipe({
        wipeLeft: function() { App.swipe(1); },
        wipeRight: function() { App.swipe(-1); },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    }).dblclick(function(){
        if (App.currentDrawingMode != App.DRAWING_MODES.none)
            App.selectTool(App.DRAWING_MODES.none);
        else
            App.selectTool(App.DRAWING_MODES.draw);
        
    });
});
