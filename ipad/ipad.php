<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - iPad Client</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
                
        <script type="text/javascript" src="lib/jquery-min.js"></script>
        <script type="text/javascript" src="lib/swipe.js"></script>
        
        <script type="text/javascript" src="ipad/ipad.js"></script>
        <link rel="stylesheet" href="ipad/ipad.css" type="text/css"/>
        
    </head>
    <body>
        <div id="loading">LOADING</div><div id='l2'></div>
        <div id="wrapperMain">
            
            <table id="mainTable">
                <tr>
                    <td id="prevSlide"></td>
                    <td class="spaceH"></td>
                    
                    <td id="slide">
                        <div id="drawing"></div>
                    </td>
                    <td class="spaceH"></td>
                    <td id="rightArea">
                        <table>
                            <tr>
                                <td id="nextSlide" colspan="2"></td>
                            </tr>
                            <tr>
                                <td id="startLaserPointer"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td id="notes" colspan="5"><div class="inner">$${}$$</div></td></tr>
            </table>
            <div id="laserpointer"></div>
        <canvas style="display:none;" id="canvasForOutput" width="1000px" height="600px"></canvas> 
        </div>
    </body>
</html>
