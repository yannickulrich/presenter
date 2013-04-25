<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - iPad Client</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        
        <script type="text/javascript" src="jquery-min.js"></script>
        <script type="text/javascript" src="raphael.min.js"></script>
        <script type="text/javascript" src="json2.js"></script>
        <script type="text/javascript" src="raphael.sketchpad.js"></script>

        <script type="text/javascript" src="doubletab.js"></script>
        <script type="text/javascript" src="swipe.js"></script>
        <script type="text/javascript" src="ipad.js"></script>
        
        <link rel="stylesheet" href="ipad.css" type="text/css"/>

        
        
    </head>
    <body>
        <div id="wrapperMain">
            <table id="mainTable">
                <tr>
                    <td id="prevSlide"></td><td class="spaceH"></td><td id="slide"><div id="drawing"></div></td><td class="spaceH"></td><td id="rightArea"><table><tr><td id="nextSlide" colspan="2"></td></tr><tr><td id="pen"></td></tr><tr><td id="erase"></td></tr></table></td>
                </tr>
                <tr><td id="notes" colspan="5"><div class="inner"></div></td></tr>
            </table>
    </body>
</html>