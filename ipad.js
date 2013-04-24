//JS:master.js

//This looks cool: http://ianli.com/sketchpad/

var App = {
    DRAWING_MODES : {"erase" : 0, "draw": 1},
    syncPage : function () {
        // Push it to the server
        self = this;
        $.ajax({
            url: "get.php?write&data=Movepage:" + self.pageNumber,
            cache: false
        });
    },
    syncDrawing : function () {
        // Push it to the server
        self = App;
        $.ajax({
            url: "get.php?write&data=Draw:" + self.sketchpad.json(),
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
            self.notesArray = data.split("\n\n");
            self.showNotes();
        });
		$.ajax({
            url: "get.php?images",
            cache: false
        }).done(function (data) {
            self.imageArray = data.split("\n");
            $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
        });
		//$("#slide0").css("display", "block");
        this.sketchpad = Raphael.sketchpad("drawing", {
            width: 800,
            height: 600,
            editing: true
        });
        
        this.sketchpad.change(this.syncDrawing);
        
    },
    swipe : function(dir)
    {
        this.annotationArray[this.pageNumber] = this.sketchpad.json(); //Save drawings
        //$("#slide" + this.pageNumber).css("display", "none");
        this.pageNumber += dir;
        this.sketchpad.json(this.annotationArray[this.pageNumber]); //Get drawings back
        //$("#slide" + this.pageNumber).css("display", "block");
        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
        
        
        
        this.syncPage();
        this.showNotes();
    },
    selectTool : function(mode)
    {
        switch (mode)
        {
            case this.DRAWING_MODES['erase']: this.sketchpad.editing("erase");break;
            case this.DRAWING_MODES['draw']: this.sketchpad.editing(true); break;
        }
    },

    /*displayAnnotationmode: function () {
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
    },*/
	pageNumber : 0,
	scale : 1,
	scaleAnnotation : 1,
	notesArray : new Array(),
	imageArray : new Array(),
	sketchpad : null,
	annotationArray : new Array(60)//To automate!
};


$(document).ready(function() {
    App.init("content/slides.pdf", "content/notes.txt");
    $("#slide").touchwipe({
        wipeLeft: function() { App.swipe(1); },
        wipeRight: function() { App.swipe(-1); },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    });/*.dblclick(function() {
        $("#wrapperMain").hide();
        $("#wrapperAnnotate").show();
    });*/
    
    
});

/*function hideAnnotation()
{
    App.display();
    $("#wrapperMain").show();
    $("#wrapperAnnotate").hide();
}*/
