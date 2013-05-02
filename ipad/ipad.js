var App = {
    DRAWING_MODES: { none: 2, laserpointer: 3 },

    syncPage: function () {
        $.post("comm/news.php?write", { data: App.pageNumber, mode: 1 });
    },
    syncLaserpointer: function () {
        $.post("comm/news.php?write", { data: App.laserpointer.join(","), mode: 3 });
    },
    showNotes: function () {
        if (this.notesArray[this.pageNumber])
            $("#notes .inner").html(this.notesArray[this.pageNumber]);
    },

    updateDesign: function () {
        var totalw = window.innerWidth;
        var totalh = window.innerHeight;
        var pen = $("#pen").offset();
        var spaceH = (totalw - 800 - 160) / 2;
        $(".spaceH").css("width", spaceH);
    },
    init: function () {
        var self = this;
        $("#wrapperMain").hide();
        $.ajax({
            url: "comm/get.php?notes",
        }).done(function (data) {
            self.notesArray = data.split("\n> ");
            self.showNotes();
        });
        $.ajax({
            url: "comm/get.php?slideimages",
        }).done(function (data) {
            self.imageArray = data.split("\n");
            if (self.imageArray[self.imageArray.length - 1] == "")
                self.imageArray.pop();
            var toLoad = self.imageArray.length;
            for (var i = 0; i < self.imageArray.length; i++)
                $.ajax({
                    type: "GET",
                    url: "comm/get.php?slideimageByURL&url=" + self.imageArray[i]
                }).done(function (data) {
                    self.imageArray[i] = "data:image/png;base64," + data;
                    toLoad--;$("#l2").html((self.imageArray.length-toLoad) + " out of " + self.imageArray.length);
                    if (toLoad == 1) {
                        $("#drawing").css("background-image", "url('" + self.imageArray[0] + "')");
                        
                        $("#loading, #l2").fadeOut(1000, function() {$("#wrapperMain").fadeIn(1000);});
                    }
                });
        });
        this.selectTool(this.DRAWING_MODES.none);
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


        $("#nextSlide").css("height", "520px");
        self.initLaserpointer();

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
        this.pageNumber += dir;

        if (this.pageNumber < 0) this.pageNumber = 0;
        if (this.pageNumber > this.imageArray.length - 1)
            this.pageNumber = this.imageArray.length - 1;

        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");

        this.syncPage();
        this.showNotes();
    },
    selectTool: function (mode) {
        this.currentDrawingMode = mode;
        $(".active").removeClass("active");
        this.setLaserpointer(-100, -100);
        if (mode == this.DRAWING_MODES.laserpointer)
            $("#startLaserPointer").addClass("active");
        if (this.imageArray[this.pageNumber])
            $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
    },

    setLaserpointer: function (x, y) {
        if (App.currentDrawingMode != App.DRAWING_MODES.laserpointer && x > -10) return;
        $("#laserpointer").offset({ top: y, left: x });
        this.laserpointer = [(x - $("#drawing").offset().left) / $("#drawing").width(), (y - $("#drawing").offset()['top']) / $("#drawing").height()];
        App.syncLaserpointer();
    },

    updateLaserpointer: function (e) {
        App.setLaserpointer(e.clientX, e.clientY);
    },

    pageNumber: 0,
    scale: 1,
    notesArray: new Array(),
    imageArray: new Array(),
    currentDrawingMode: 0,
    laserpointer: [0, 0]
};


$(document).ready(function () {
    $(document).bind('touchmove', false);

    App.init();
    $("#drawing").on("mousemove touchmove touchstart", function (e) {
        if (App.currentDrawingMode == App.DRAWING_MODES.laserpointer) //Laserpointer
        {
            e = e.originalEvent;
            e.preventDefault();
            var x = e;
            if (e.touches)
                x = e.touches[0];
            App.setLaserpointer(x.clientX, x.clientY);
        }
    })

    $(".spaceH").click(App.setPalmRest);

});
