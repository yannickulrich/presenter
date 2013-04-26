//JS:master.js

//This looks cool: http://ianli.com/sketchpad/

var App = {
    DRAWING_MODES: { "erase": 0, "draw": 1, "none": 2 },
    syncPage: function () {
        $.post("news.php?write", { data: App.pageNumber, mode: 1 });
    },
    syncDrawing: function () {
        $.post("news.php?write", { data: App.sketchpad.json(), mode: 2 });
    },
    showNotes: function () {
        $("#notes .inner").html(this.notesArray[this.pageNumber]);
    },
    updateDesign: function () {
        var totalw = window.innerWidth;
        var totalh = window.innerHeight;
        var spaceH = (totalw - 800 - 160) / 2;
        $(".spaceH").css("width", spaceH);
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
            for (var i = 0; i < self.imageArray.length; i++)
                new Image().src = self.imageArray[i];
            self.annotationArray = new Array(self.imageArray.length);
            $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
        });
        this.sketchpad = Raphael.sketchpad("drawing", {
            width: 800,
            height: 600,
            editing: true
        });
        this.selectTool(this.DRAWING_MODES.none);

        this.sketchpad.change(this.syncDrawing);
        this.syncPage();
        this.showNotes();
        $(window).resize(this.updateDesign);
        this.updateDesign();

        $("#prevSlide").on("mouseup", function () { self.swipe(-1); });
        $("#nextSlide").on("mouseup", function () { self.swipe(1); });
        $("#pen").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.draw) self.selectTool(self.DRAWING_MODES.draw);
            else self.selectTool(self.DRAWING_MODES.none);
        });
        $("#erase").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.erase) self.selectTool(self.DRAWING_MODES.erase);
            else self.selectTool(self.DRAWING_MODES.none);
        });
    },
    swipe: function (dir, swiping) {
        if (swiping && this.currentDrawingMode != this.DRAWING_MODES.none) return;
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
        $(".active").removeClass("active");
        switch (mode) {
            case this.DRAWING_MODES.erase: this.sketchpad.editing("erase"); $("#erase").addClass("active"); break;
            case this.DRAWING_MODES.draw: this.sketchpad.editing(true); $("#pen").addClass("active"); break;
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


$(document).ready(function () {
    $(document).bind('touchmove', false);
    App.init();
    $("#drawing").touchwipe({
        wipeLeft: function () { App.swipe(1, true); },
        wipeRight: function () { App.swipe(-1, true); },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    })
});
