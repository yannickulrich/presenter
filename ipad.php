<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>iPad</title>
        
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
            <div id="drawing"></div>
            <!--<div id="slide" style="border:1px solid black;">
                <?php
                    if ($handle = opendir('./pdfImages/'))
                    {
                        $i = 0;
                        while (false !== ($file = readdir($handle)))
                        {
                            if ($file != "." && $file != "..")
                            {
                                echo "<img style='display: none; height: 300px;' id='slide" . $i . "' src='pdfImages/" . $file . "' />";
                                $i++;
                            }
                        }
                        closedir($handle);
                    }
                ?>
                
            </div>-->
            <a href="javascript:App.swipe(-1)">&lt;&lt;</a><a href="javascript:App.swipe(1)">&gt;&gt;</a><br>
            <a href="javascript:App.selectTool(App.DRAWING_MODES['erase'])">Eraser</a>&nbsp;<a href="javascript:App.selectTool(App.DRAWING_MODES['draw'])">Pen</a>
            <div id="notes">
            </div>
        </div>
    </body>
</html>