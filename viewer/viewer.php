<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Viewer</title>
        <script type="text/javascript" src="lib/jquery-min.js"></script>
        
        
        
        <script type="text/javascript" src="lib/raphael.min.js"></script>
        <script type="text/javascript" src="lib/raphael.sketchpad.js"></script>

        
        <!--<script type="text/javascript" src="lib/PDFJS/core.js"></script>
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
        <script type="text/javascript" src="lib/PDFJS/jbig2.js"></script>-->
        
        <script type="text/javascript" src="lib/rgbcolor.js"></script> 
        <script type="text/javascript" src="lib/canvg.js"></script> 
        <script type="text/javascript" src="lib/canvg.js"></script> 
        
        
        
        <script type="text/javascript" src="viewer/viewer.js"></script> 
        
        <link rel="stylesheet" href="viewer/viewer.css" type="text/css"/>
    </head>
    <body >
        <div id="toolbar">
            <div class="toolbarButton" id="downloadBut"></div>
            <div class="toolbarButton" id="fullscreenBut"></div>
        </div>
        <div id="wrapperMain">
            <div id="drawing"></div>
            <div id="laserpointer" ></div>
        </div>
        <canvas style="display:none;" id="canvasForOutput" width="1000px" height="600px"></canvas> 
        
    </body>
</html>