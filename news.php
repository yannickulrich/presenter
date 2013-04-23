<?php
    if (isset($_GET['read']))
    {
        require "news.txt";
        file_put_contents("news.txt", "");
    }
    else if (isset($_GET['write']) && isset($_GET['data']))
    {
        file_put_contents("news.txt", $_GET['data'] . ">", FILE_APPEND);
    }
?>