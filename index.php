<?php
    session_start();
    $_SESSION['pdf'] = "slides.pdf";
    $_SESSION['notes'] = "notes.txt";
    
    
    
    // The master doesn't need any auth.    
    if (!((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad')) && !isset($_GET["ipad"]))
    {
        require("viewer/viewer.php");
        exit;
    }
    
    
    include("tools/auth.php");
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
            require("ipad/ipad.php");
        else
            require("viewer/viewer.php");
        exit;
    }
    
    $url = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter<?php 
            if (((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad')) || isset($_GET["ipad"])) echo "";
            else echo " - Master"; ?></title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="http://<?php echo $url; ?>touch-icon.png" />
        
        <link rel="shortcut icon" href="http://<?php echo $url; ?>touch-icon.ico">
        
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="index.css" type="text/css"/>
        <script type="text/javascript" src="lib/jquery-min.js"></script>
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
