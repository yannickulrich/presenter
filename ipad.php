<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>iPad</title>
        <script type="text/javascript" src="jquery-min.js"></script>
        
        <script type="text/javascript" src="PDFJS/core.js"></script>
        <script type="text/javascript" src="PDFJS/util.js"></script>
        <script type="text/javascript" src="PDFJS/api.js"></script>
        <script type="text/javascript" src="PDFJS/canvas.js"></script>
        <script type="text/javascript" src="PDFJS/obj.js"></script>
        <script type="text/javascript" src="PDFJS/function.js"></script>
        <script type="text/javascript" src="PDFJS/charsets.js"></script>
        <script type="text/javascript" src="PDFJS/cidmaps.js"></script>
        <script type="text/javascript" src="PDFJS/colorspace.js"></script>
        <script type="text/javascript" src="PDFJS/crypto.js"></script>
        <script type="text/javascript" src="PDFJS/evaluator.js"></script>
        <script type="text/javascript" src="PDFJS/fonts.js"></script>
        <script type="text/javascript" src="PDFJS/glyphlist.js"></script>
        <script type="text/javascript" src="PDFJS/image.js"></script>
        <script type="text/javascript" src="PDFJS/metrics.js"></script>
        <script type="text/javascript" src="PDFJS/parser.js"></script>
        <script type="text/javascript" src="PDFJS/pattern.js"></script>
        <script type="text/javascript" src="PDFJS/stream.js"></script>
        <script type="text/javascript" src="PDFJS/worker.js"></script>
        <script type="text/javascript" src="PDFJS/jpx.js"></script>
        <script type="text/javascript" src="PDFJS/jbig2.js"></script>


        <script src="swipe.js"></script>
        <script type="text/javascript" src="ipad.js"></script>
        
        <link rel="stylesheet" href="ipad.css" type="text/css" charset="utf-8" />
        
    </head>
    <body>
        <div id="wrapperMain">
        
            <canvas id="slide" style="border:1px solid black;"></canvas>
            <a href="javascript:App.swipe(-1)">&lt;&lt;</a><a href="javascript:App.swipe(1)">&gt;&gt;</a>
            <div id="notes">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </div>
        </div>
        <div id="wrapperAnnotate" style="display:none">
            <a href="javascript:hideAnnotation()">Back</a>
            <canvas id="annotation" style="border:1px solid black;"></canvas>
        </div>
    </body>
</html>