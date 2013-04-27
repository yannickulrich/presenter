<?php
    session_start();
    if (isset($_GET['slideimages']))
    {
        if ($handle = opendir('../content/pdfImages/'))
        {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != "..") $i++;
            closedir($handle);
            for ($j = 0; $j < $i; $j++) echo "content/pdfImages/slides-" . $j . ".png\n";
        }
    }
    if (isset($_GET['slides']))
    {
        header("Content-Type: application/pdf");
        echo file_get_contents( "../content/" . $_SESSION['pdf']);

    }
    if (isset($_GET['notes']))
    {
        echo file_get_contents( "../content/" . $_SESSION['notes']);
    }
?>