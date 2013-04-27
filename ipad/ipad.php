<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - iPad Client</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        
        <script type="text/javascript" src="lib/jquery-min.js"></script>
        <script type="text/javascript" src="lib/raphael.min.js"></script>
        <script type="text/javascript" src="lib/json2.js"></script>
        <script type="text/javascript" src="lib/raphael.sketchpad.js"></script>
        <script type="text/javascript" src="lib/doubletab.js"></script>
        <script type="text/javascript" src="lib/swipe.js"></script>
        
        <script type="text/javascript" src="ipad/ipad.js"></script>
        <link rel="stylesheet" href="ipad/ipad.css" type="text/css"/>

        <script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            extensions: ["tex2jax.js"],
            jax: ["input/TeX","output/HTML-CSS"],
            tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
          });
        </script>
        <script type="text/javascript" src="lib/MathJax/MathJax.js"></script>
        
    </head>
    <body>
        <div id="wrapperMain">
            <table id="mainTable">
                <tr>
                    <td id="prevSlide"></td><td class="spaceH"></td><td id="slide"><div id="drawing"></div></td><td class="spaceH"></td><td id="rightArea"><table><tr><td id="nextSlide" colspan="2"></td></tr><tr><td id="pen"></td></tr><tr><td id="erase"></td></tr></table></td>
                </tr>
                <tr><td id="notes" colspan="5"><div class="inner">$${}$$</div></td></tr>
            </table>
        </div>
    </body>
</html>