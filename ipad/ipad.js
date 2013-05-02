var App = {
    DRAWING_MODES: { erase: 0, draw: 1, none: 2, laserpointer: 3 },

    syncPage: function () {
        $.post("comm/news.php?write", { data: App.pageNumber, mode: 1 });
    },
    syncDrawing: function () {
        $.post("comm/news.php?write", { data: App.sketchpad.json(), mode: 2 });
    },
    syncLaserpointer: function () {
        $.post("comm/news.php?write", { data: App.laserpointer.join(","), mode: 3 });
    },
    showNotes: function () {
        if (this.notesArray[this.pageNumber]) {
            $("#notes .inner").html(this.notesArray[this.pageNumber]);
            M.parseMath($("#notes .inner")[0]);
        }
    },

    updateDesign: function () {
        var totalw = window.innerWidth;
        var totalh = window.innerHeight;
        var pen = $("#pen").offset();
        var spaceH = (totalw - 800 - 160) / 2;
        $(".spaceH").css("width", spaceH);
        $("#strokePalette").offset({ top: pen.top - 25, left: pen.left - 170 });
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
            
            self.getImage(0);
            
            
            
                
            self.annotationArray = new Array(self.imageArray.length);
            
            
            $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
        });
        
        

        this.sketchpad = Raphael.sketchpad("drawing", { width: 800, height: 600, editing: true });
        this.sketchpad.change(this.syncDrawing);
        this.selectTool(this.DRAWING_MODES.none);
        
        
        
        this.syncDrawing();
        this.syncPage();
        this.showNotes();
        
        

        $(window).resize(this.updateDesign);
        this.updateDesign();

        $("#prevSlide").on("mouseup", function () { self.swipe(-1); });
        $("#nextSlide").on("mouseup", function () { self.swipe(1); });

        $("#drawing").touchwipe({
            wipeLeft: function () { App.swipe(1, true); },
            wipeRight: function () { App.swipe(-1, true); },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: true
        }).click(App.click);
    
        $(".spaceH").click(App.setPalmRest);


        if (enableDrawing)
            self.initDrawFeatures();
        else
        {
            $("#pen").hide();
            $("#erase").hide();
            $("#startLaserPointer").hide();
            $("#nextSlide").css("height", "600px");
        }
        self.initLaserpointer();
    },
    initDrawFeatures: function () {
        var self = this;
        $("#pen").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.draw)
                self.selectTool(self.DRAWING_MODES.draw);
            else self.selectTool(self.DRAWING_MODES.none);
        });
        $("#erase").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.erase) self.selectTool(self.DRAWING_MODES.erase);
            else self.selectTool(self.DRAWING_MODES.none);
        });

        this.setPalmRest(0);

        $(".strokeColor").click(function () {
            App.sketchpad.pen().color($(this).css('background-color'));
            $("#strokePalette").hide();
        });
        $(".strokeSize").click(function () {
            App.sketchpad.pen().width($(this).width());
            $("#strokePalette").hide();
        });
        $("#strokePalette").click(function(){ $("#strokePalette").hide();});
    },
    initLaserpointer: function () {
        var self = this;
        $("#drawing").on("mousemove touchmove mouseup", this.updateLaserpointer);
        $("#startLaserPointer").on("mouseup", function () {
            if (self.currentDrawingMode != self.DRAWING_MODES.laserpointer)
                self.selectTool(self.DRAWING_MODES.laserpointer);
            else self.selectTool(self.DRAWING_MODES.none);
        });
    },
    swipe: function (dir, swiping) {
        if (swiping && this.currentDrawingMode != this.DRAWING_MODES.none) return;
        this.annotationArray[this.pageNumber] = this.sketchpad.json(); //Save drawings
        this.pageNumber += dir;

        if (this.pageNumber < 0) this.pageNumber = 0;
        if (this.pageNumber > this.imageArray.length - 1)
            this.pageNumber = this.imageArray.length - 1;

        if (this.annotationArray[this.pageNumber] != undefined)
            this.sketchpad.json(this.annotationArray[this.pageNumber]); //Get drawings back
        else this.sketchpad.clear();


        //$("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
        $("#drawing")[0].style.background="url(" + localStorage.getItem('image' + this.pageNumber) + ")";
        
        this.syncPage();
        this.showNotes();
    },
    selectTool: function (mode) {
        
    
        this.currentDrawingMode = mode;
        $(".active").removeClass("active");
        
        this.setLaserpointer(-100,-100);
        
        
        
        switch (mode) {
            case this.DRAWING_MODES.erase:
                this.sketchpad.editing("erase");
                $("#erase").addClass("active");
                $("#strokePalette").hide();
                break;
            case this.DRAWING_MODES.draw:
                this.sketchpad.editing(true);
                $("#pen").addClass("active");
                $("#strokePalette").show();
                break;
            case this.DRAWING_MODES.laserpointer:
                this.sketchpad.editing(false);
                $("#startLaserPointer").addClass("active");
                $("#strokePalette").hide();
                break;
            case this.DRAWING_MODES.none:
                this.sketchpad.editing(false);
                $("#strokePalette").hide();
                break;
        }
        
        if (this.imageArray[this.pageNumber] != undefined)
            $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
        
        
    },

    setLaserpointer: function (x, y) {
        $("#laserpointer").offset({ top: y, left: x });
        this.laserpointer = [(x - $("#drawing").offset().left) / $("#drawing").width(), (y - $("#drawing").offset()['top']) / $("#drawing").height()];
        App.syncLaserpointer();
    },

    updateLaserpointer: function (e) {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer)
            App.setLaserpointer(e.clientX, e.clientY);
    },
    
    
    setPalmRest: function (height) {
        if (App.currentDrawingMode != App.DRAWING_MODES.draw)
            return;
            
        if (typeof (height) == "object") {
            if ($("#strokePalette").css("display") == "block") {
                $("#strokePalette").css("display", "none");
                return;
            }
            height = $("#drawing").height() - height.clientY;
        }

        $("#palmRest").height(height);

        $("#palmRest").offset({ top: $('#drawing').offset()['top'] + ($('#drawing').height() - height), 'left': $('#drawing').offset()['left'] });
        
    },
    
    getImage : function(n)
    {
        self = this;
        $.ajax({
            cache: false,
            type: "GET",
            url: "comm/get.php?slideimageByURL&url=" + self.imageArray[n],
        
        }).done(function (data) {
            if (n > 40)
                return;
            //$("#drawing")[0].style.background="url(data:image/png;base64," + data + ")";
            localStorage.setItem("image" + n, "data:image/png;base64," + data);
            App.getImage(n+1);
        });
    },




    pageNumber: 0,
    scale: 1,
    scaleAnnotation: 1,
    notesArray: new Array(),
    imageArray: new Array(),
    sketchpad: null,
    annotationArray: [],
    currentDrawingMode: 0,
    laserpointer: [0, 0],
    strokeWindowTimer: 0


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
    }).mousemove(function(e){
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            $("*").css("-webkit-user-select", "none");
			$("*").css("-moz-user-select", "none");
			if (jQuery.browser.msie) {
				$("body").attr("onselectstart", "return false;");
			}
            if (e.which == 1)
                App.setLaserpointer(e.clientX, e.clientY);
            else
                App.setLaserpointer(-100,-100);
        }   
    }).bind("touchmove", function(e)
    {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            e = e.originalEvent;
			e.preventDefault();
            var touch = e.touches[0];
            App.setLaserpointer(touch.clientX, touch.clientY);
        }
    }).bind("touchstart", function(e)
    {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            e = e.originalEvent;
			e.preventDefault();
            var touch = e.touches[0];
            App.setLaserpointer(touch.clientX, touch.clientY);
        }
    }).bind("touchend", function(e)
    {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            e = e.originalEvent;
			e.preventDefault();
            App.setLaserpointer(-100,-100);
        }
    });
    
    $(".spaceH").click(App.setPalmRest);

});
