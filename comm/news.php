<?php

    if (file_get_contents('news.txt') == '') file_put_contents('news.txt', "0>{}");
    if (isset($_GET['read']))
        echo file_get_contents('news.txt');
    else if (isset($_GET['write']) && isset($_REQUEST['data']) && isset($_REQUEST['mode']))
    {
        session_start();
        include("../tools/auth.php");
        if ($_SESSION['passwd'] == $authhash)
        {
            $indices = explode(">", file_get_contents('news.txt'), 2);
            if ($_REQUEST['mode'] == 1) $indices[0] = $_REQUEST['data'];
            if ($_REQUEST['mode'] == 2) $indices[1] = $_REQUEST['data'];
            echo(implode(">", $indices));
            file_put_contents("news.txt", implode(">", $indices));
        }
    }
?>