<?php
    //This file is for auth!
    session_start();
    
    if (isset($_GET['submit']))
    {
        include("auth.php");
        if (md5($_POST['passwd']) == $authhash)
        {
            $_SESSION['passwd'] = md5($_POST['passwd']);
        }
    }
    
    if (isset($_SESSION['passwd']))
    {
        if ((bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad'))
        {
            header("Location: iPad.php");
        }
        else
        {
            header("Location: master.php");
        }
        exit;
    }
?>
<form action="?submit" method="post">
    <input name="passwd" type="password" size="12" maxlength="12">
    <input type="submit">
</form>