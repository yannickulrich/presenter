<?php
    // The master doesn't need any auth.    
    if (!((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad')) && !isset($_GET["ipad"]))
    {
        require("viewer.php");
        exit;
    }
    session_start();
    include("auth.php");
    if (isset($_GET['submit']) && isset($_POST['passwd']))
    {
        
        if (md5($_POST['passwd']) == $authhash)
        {
            $_SESSION['passwd'] = md5($_POST['passwd']);
        }
    }
    if (isset($_SESSION['passwd']) && $_SESSION['passwd'] == $authhash)
    {
        if (((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad')) || isset($_GET["ipad"]))
            require("ipad.php");
        else
            require("viewer.php");
        exit;
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter<?php 
            if (((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad')) || isset($_GET["ipad"])) echo "";
            else echo " - Master"; ?></title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="touch-icon.png" />
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="index.css" type="text/css"/>
        <script type="text/javascript" src="jquery-min.js"></script>
        <script type="text/javascript">$(function(){$(document).bind('touchmove', false);})</script>
    </head>
    <body>
        <div id="wrapperMain">
            <h1>PRESENTER</h1><br/>
            <form action="?submit<?php if (isset($_GET["ipad"])) echo "&ipad";?>" method="post">
                <input name="passwd" type="password" size="12" maxlength="12"/>
                <input type="submit" value="Login" />
            </form> 
        </div>
    </body>
</html>
