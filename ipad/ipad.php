<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - iPad Client</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        
        <script type="text/javascript" src="lib/rgbcolor.js"></script> 
        <script type="text/javascript" src="lib/canvg.js"></script> 
        
        <script type="text/javascript" src="lib/jquery-min.js"></script>
        <script type="text/javascript" src="lib/raphael.min.js"></script>
        <script type="text/javascript" src="lib/raphael.sketchpad.js"></script>
        <script type="text/javascript" src="lib/doubletab.js"></script>
        <script type="text/javascript" src="lib/swipe.js"></script>
        
        <script type="text/javascript" src="ipad/ipad.js"></script>
        <link rel="stylesheet" href="ipad/ipad.css" type="text/css"/>


        <link rel="stylesheet" href="lib/jqMath/UnifrakturMaguntia.css">
        <link rel="stylesheet" href="lib/jqMath/jqmath-0.4.0.css">
        <script src="lib/jqMath/jqmath-etc-0.4.0.min.js"></script>
        
        <!--<script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            extensions: ["tex2jax.js"],
            jax: ["input/TeX","output/HTML-CSS"],
            tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
          });
        </script>
        <script type="text/javascript" src="lib/MathJax/MathJax.js"></script>-->
        
    </head>
    <body>
        <div id="wrapperMain">
            
            <table id="mainTable">
                <tr>
                    <td id="prevSlide"></td>
                    <td class="spaceH"></td>
                    
                    <td id="slide">
                        <div id="drawing"></div>
                        <div id="palmRest"></div>
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
                            <tr>
                                <td id="pen"></td>
                            </tr>
                            <tr>
                                <td id="erase"></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td id="notes" colspan="5"><div class="inner">$${}$$</div></td></tr>
            </table>
            <div id="laserpointer"></div>
        </div>
        <canvas style="display:none;" id="canvasForOutput" width="1000px" height="600px"></canvas> 
    </body>
</html>