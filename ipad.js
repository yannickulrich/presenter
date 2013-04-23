//JS:master.js

var App = {
	init: function(notesURL) {
		self = this;
		$.ajax({
            url: notesURL,
            cache: false
        }).done(function( msg )
        {
            self.notesArray = msg.split("\n\n");
            $("#notes").html(self.notesArray[self.pageNumber-1]);
        });
		
		$("#slide0").css("display", "block");
    },
    swipe : function(dir)
    {
        $("#slide" + this.pageNumber).css("display", "none");
        this.pageNumber += dir;
        $("#slide" + this.pageNumber).css("display", "block");
        
        $("#notes").html(this.notesArray[this.pageNumber-1]);
        $.ajax({
            url: "news.php?write&data=Movepage:" + this.pageNumber,
            cache: false
        });
    },
	pageNumber : 0,
	scale : 1,
	scaleAnnotation : 1,
	notesArray : new Array()
};


$(document).ready(function() {
    App.init("notes.txt");
    $("#slide").touchwipe({
        wipeLeft: function() { App.swipe(1); },
        wipeRight: function() { App.swipe(-1); },
        /*wipeUp: function() { alert("up"); },
        wipeDown: function() { alert("down"); },*/
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    }).dblclick(function() {
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