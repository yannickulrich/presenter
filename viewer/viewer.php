<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Master</title>
        <script type="text/javascript" src="lib/jquery-min.js"></script>
        <script type="text/javascript" src="lib/raphael.min.js"></script>
        <script type="text/javascript" src="lib/raphael.sketchpad.js"></script>

        
        <script type="text/javascript" src="lib/PDFJS/core.js"></script>
        <script type="text/javascript" src="lib/PDFJS/util.js"></script>
        <script type="text/javascript" src="lib/PDFJS/api.js"></script>
        <script type="text/javascript" src="lib/PDFJS/canvas.js"></script>
        <script type="text/javascript" src="lib/PDFJS/obj.js"></script>
        <script type="text/javascript" src="lib/PDFJS/function.js"></script>
        <script type="text/javascript" src="lib/PDFJS/charsets.js"></script>
        <script type="text/javascript" src="lib/PDFJS/cidmaps.js"></script>
        <script type="text/javascript" src="lib/PDFJS/colorspace.js"></script>
        <script type="text/javascript" src="lib/PDFJS/crypto.js"></script>
        <script type="text/javascript" src="lib/PDFJS/evaluator.js"></script>
        <script type="text/javascript" src="lib/PDFJS/fonts.js"></script>
        <script type="text/javascript" src="lib/PDFJS/glyphlist.js"></script>
        <script type="text/javascript" src="lib/PDFJS/image.js"></script>
        <script type="text/javascript" src="lib/PDFJS/metrics.js"></script>
        <script type="text/javascript" src="lib/PDFJS/parser.js"></script>
        <script type="text/javascript" src="lib/PDFJS/pattern.js"></script>
        <script type="text/javascript" src="lib/PDFJS/stream.js"></script>
        <script type="text/javascript" src="lib/PDFJS/worker.js"></script>
        <script type="text/javascript" src="lib/PDFJS/jpx.js"></script>
        <script type="text/javascript" src="lib/PDFJS/jbig2.js"></script>
        
        <script type="text/javascript" src="lib/rgbcolor.js"></script> 
        <script type="text/javascript" src="lib/canvg.js"></script> 

        <script type="text/javascript" src="viewer/viewer.js"></script>
        
        <style type="text/css">
            #laserpointer
{
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    
    
    background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 2%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.98) 22%, rgba(255,0,0,0.74) 41%, rgba(255,0,0,0) 100%);
background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(2%,rgba(255,255,255,1)), color-stop(20%,rgba(255,255,255,1)), color-stop(22%,rgba(255,255,255,0.98)), color-stop(41%,rgba(255,0,0,0.74)), color-stop(100%,rgba(255,0,0,0)));
background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 2%,rgba(255,255,255,1) 20%,rgba(255,255,255,0.98) 22%,rgba(255,0,0,0.74) 41%,rgba(255,0,0,0) 100%);
background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 2%,rgba(255,255,255,1) 20%,rgba(255,255,255,0.98) 22%,rgba(255,0,0,0.74) 41%,rgba(255,0,0,0) 100%);
background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 2%,rgba(255,255,255,1) 20%,rgba(255,255,255,0.98) 22%,rgba(255,0,0,0.74) 41%,rgba(255,0,0,0) 100%);
background: radial-gradient(ellipse at center, rgba(255,255,255,1) 2%,rgba(255,255,255,1) 20%,rgba(255,255,255,0.98) 22%,rgba(255,0,0,0.74) 41%,rgba(255,0,0,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ff0000',GradientType=1 );

}
        </style>
    </head>
    <body style="margin:0;padding:0;">
        <a href="javascript:App.download()">Download this slide</a>
        <div id="drawing"></div>
        <canvas id="slide" style="border:1px solid black;"></canvas>
        <div id="laserpointer" ></div>
        
        <canvas style="display:none;" id="canvasForOutput" width="1000px" height="600px"></canvas> 
        
    </body>
</html>