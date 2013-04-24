<?php
    if (isset($_GET['read']))
    {
        require "news.txt";
        file_put_contents("news.txt", "");
    }
    else if (isset($_GET['write']) && isset($_GET['data']))
    {
        echo $_GET['data'];
        file_put_contents("news.txt", $_GET['data'] . ">", FILE_APPEND);
    }
    else if (isset($_GET['images']))
    {
        if ($handle = opendir('./pdfImages/'))
        {
            $i = 0;
            while (false !== ($file = readdir($handle)))
            {
                if ($file != "." && $file != "..")
                {
                    echo "pdfImages/" . $file . "\n";
                    $i++;
                }
            }
            closedir($handle);
        }
    }
?>