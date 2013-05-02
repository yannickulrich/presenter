var App = {
    init: function () {
        var self = this;
        $.ajax({
            url: "comm/get.php?slideimages",
            cache: false
        }).done(function (data) {
            self.imageArray = data.split("\n");
            if (self.imageArray[self.imageArray.length - 1] == "")
                self.imageArray.pop();
            for (var i = 0; i < self.imageArray.length; i++)
                new Image().src = self.imageArray[i];

            self.pageNumber = 0;
            self.rescale();
            self.display();
        });
        window.setInterval("App.update()", 1000);

    },
    update: function () {
        var self = this;
        $.ajax({
            url: "comm/news.php?read",
            cache: false
        }).done(function (msg) {
            var cmd = msg.split(">");
            self.pageNumber = parseInt(cmd[0]);

            var offset = $("#drawing").offset();
            var l = parseFloat(cmd[1].split(",")[0]) * $("#drawing").width() + offset['left'];
            var t = parseFloat(cmd[1].split(",")[1]) * $("#drawing").height() + offset['top'];

            $("#laserpointer").offset({ "top": t, "left": l });

            self.display();
        });
    },
    display: function () {
        $("#drawing").css("background-image", "url('" + this.imageArray[this.pageNumber] + "')");
    },

    rescale: function () {
        var scaleWidth = (window.innerWidth - 3) / 800;
        var scaleHeight = (window.innerHeight - 3) / 600;
        this.scale = ((scaleWidth > scaleHeight) ? scaleHeight : scaleWidth);
        $("#wrapperMain").width(800 * this.scale);
        $("#drawing").css({ "background-image": "url('" + this.imageArray[this.pageNumber] + "')",
            "background-size": "contain",
            "width": 800 * this.scale + "px",
            "height": 600 * this.scale + "px"
        });
    },

    pageNumber: 1,
    scale: 1,
    sketchpad: null,
    imageArray: 0,
    fullscreen: false
};


$(document).ready(function() {
    App.init();
    $("#toolbar").hide();
});
