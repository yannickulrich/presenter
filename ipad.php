<?php

?>
<!DOCTYPE html>
<html>
    <head>
        <title>iPad</title>
        <script type="text/javascript" src="jquery-min.js"></script>

        <script src="swipe.js"></script>
        <script type="text/javascript" src="ipad.js"></script>
        
        <link rel="stylesheet" href="ipad.css" type="text/css" charset="utf-8" />
        
    </head>
    <body>
        <div id="wrapperMain">
        
            <div id="slide" style="border:1px solid black;">
                <?php
                    if ($handle = opendir('./pdfImages/'))
                    {
                        $i = 0;
                        while (false !== ($file = readdir($handle)))
                        {
                            if ($file != "." && $file != "..")
                            {
                                echo "<img style='display: none;' id='slide" . $i . "' src='pdfImages/" . $file . "' />";
                                $i++;
                            }
                        }
                        closedir($handle);
                    }
                ?>
            </div>
            <a href="javascript:App.swipe(-1)">&lt;&lt;</a><a href="javascript:App.swipe(1)">&gt;&gt;</a>
            <div id="notes">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </div>
        </div>
        <div id="wrapperAnnotate" style="display:none">
            <a href="javascript:hideAnnotation()">Back</a>
        </div>
    </body>
</html>