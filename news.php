<?php
    include("auth.php");
    session_start();
    if ($_SESSION['passwd'] == $authhash)
    {
        if (isset($_GET['read']))
        {
            require "news.txt";
            file_put_contents("news.txt", "");
        }
        else if (isset($_GET['write']) && isset($_REQUEST['data']))
        {
            file_put_contents("news.txt", $_REQUEST['data'] . ">", FILE_APPEND);
        }
    }
?>