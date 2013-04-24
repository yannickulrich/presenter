<?php
    if (isset($_GET['slideimages']))
    {
        if ($handle = opendir('./pdfImages/'))
        {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != "..") $i++;
            closedir($handle);
            for ($j = 0; $j < $i; $j++) echo "pdfImages/slides-" . $j . ".png\n";
        }
    }
?>