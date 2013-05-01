//JS:master.js

//This looks cool: http://ianli.com/sketchpad/

var App = {
    DRAWING_MODES: { "erase": 0, "draw": 1, "none": 2, "laserpointer" : 3 },
    
    
    syncPage: function () {
        $.post("comm/news.php?write", { data: App.pageNumber, mode: 1 }, function(data){});
    },
    syncDrawing: function () {
        $.post("comm/news.php?write", { data: App.sketchpad.json(), mode: 2 }, function(data){});
    },
    syncLaserpointer : function() {
        $.post("comm/news.php?write", { data: App.laserpointer.join(","), mode: 3 }, function(data){});
    },
    /*
    sync : function() {
        $.post("comm/news.php?write", { image: App.sketchpad.json(), pageNumber: App.pageNumber }, function(data){alert(data);});
    },*/
    
    
    showNotes: function () {
        if (this.notesArray[this.pageNumber] != undefined)
        {
            //MathJax.Hub.queue.Push(["Text", MathJax.Hub.getAllJax()[0],"\\displaystyle{\\text{" + this.notesArray[this.pageNumber] + "}}"]);
            $("#notes .inner").html(this.notesArray[this.pageNumber]);
            M.parseMath($("#notes .inner")[0]);
            
        }
        //$("#notes .inner").html(this.notesArray[this.pageNumber]);
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
            url: "comm/get.php?notes",
            cache: false
        }).done(function (data) {
            self.notesArray = data.split("\n> ");
            self.showNotes();
        });
        $.ajax({
            url: "comm/get.php?slideimages",
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
        this.syncDrawing();
        window.setTimeout("App.showNotes()", 1000);
        $(window).resize(this.updateDesign);
        this.updateDesign();

        $("#prevSlide").on("mouseup", function () { self.swipe(-1); });
        $("#nextSlide").on("mouseup", function () { self.swipe(1); });
        
        $("#pen").on("mousedown", function(){
            self.strokeWindowTimer = +new Date();
        }).on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.draw)
            {
                self.selectTool(self.DRAWING_MODES.draw);
                $("#strokePalette").css("display", "block" );
            }
            else self.selectTool(self.DRAWING_MODES.none);            
        });
        
        
        
        $("#erase").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.erase) self.selectTool(self.DRAWING_MODES.erase);
            else self.selectTool(self.DRAWING_MODES.none);
        });
        $("#startLaserPointer").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.laserpointer) self.selectTool(self.DRAWING_MODES.laserpointer);
            else
                self.selectTool(self.DRAWING_MODES.none);
        });
        
        this.setPalmRest(0);
        
        $(".strokeColor").click(function(){
            var rgb = $(this).css('background-color');
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
            App.sketchpad.pen().color( "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]) );
        });
        $(".strokeSize").click(function(){
            App.sketchpad.pen().width( $(this).width() );
        });
        
        
        var pen = $("#pen").offset();
        $("#strokePalette").offset({"top" : pen.top-25, 'left': pen.left-170 });
        $("#strokePalette").css("display", "none");
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
        this.syncPage();// Syncing will be done by the sketchpad's change function
        this.showNotes();
    },
    selectTool: function (mode) {
        this.currentDrawingMode = mode;
        $(".active").removeClass("active");
        this.setLaserpointer(1000,1000);
        switch (mode) {
            case this.DRAWING_MODES.erase: this.sketchpad.editing("erase"); $("#erase").addClass("active"); break;
            case this.DRAWING_MODES.draw: this.sketchpad.editing(true); $("#pen").addClass("active"); break;
            case this.DRAWING_MODES.laserpointer: $("#startLaserPointer").addClass("active");
            case this.DRAWING_MODES.none: this.sketchpad.editing(false);   break;
        }

        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
    },
    
    setLaserpointer : function(x,y)
    {
        $("#laserpointer").offset({"top":y, "left": x});
        this.laserpointer = [(x-$("#drawing").offset()['left'])/$("#drawing").width(), (y-$("#drawing").offset()['top'])/$("#drawing").height()  ];
        App.syncLaserpointer();
    },
    
    click : function(e)
    {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            App.setLaserpointer(e.clientX, e.clientY);
            
        }
    },
    setPalmRest : function(height)
    {
        if (typeof(height) == "object")
        {
            if ($("#strokePalette").css("display") == "block")
            {
                $("#strokePalette").css("display", "none");
                return;
            }
            height = $("#drawing").height()-height.clientY;
        }
        
        $("#palmRest").height(height);
        
        $("#palmRest").offset( {top: $('#drawing').offset()['top']+( $('#drawing').height()-height ) , 'left': $('#drawing').offset()['left']} );
    },
    
    
    
    
    pageNumber: 0,
    scale: 1,
    scaleAnnotation: 1,
    notesArray: new Array(),
    imageArray: new Array(),
    sketchpad: null,
    annotationArray: [],
    currentDrawingMode: 0,
    laserpointer : [0,0],
    strokeWindowTimer : 0
    
    
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
    }).click(App.click);
    
    $(".spaceH").click(App.setPalmRest);
});
