<?php
    /*
    * The notes file:
    *   +-------------------------------------+
    *   |[PAGENUMBER]                         |
    *   |>[LASER X], [LASER Y]                |
    *   +-------------------------------------+
    *
    * This means:  - 'master' delimiter is \n>
    *              - The first item is the current page number
    */
    
    
    
    if (file_get_contents('news.txt') == '')
    {
        
       if ($handle = opendir('../content/pdfImages/')) //We need to know how many pages we are dealing with!!
       {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != "..") $i++;
            closedir($handle);
            $str = "0\n>(0,0)";
            file_put_contents("news.txt", $str);
       }
    }
    if (isset($_GET['read']))
    {
        echo file_get_contents('news.txt');
    }
    else if (isset($_GET['write']) && isset($_REQUEST['data']) && isset($_REQUEST['mode']))
    {
        session_start();
        include("../tools/config.php");
        if ($_SESSION['passwd'] == $authhash)
        {
            $file = explode("\n>", file_get_contents('news.txt'));
            
            $currentPage = intval($file[0]);
            
            if ($_REQUEST['mode'] == 1) $file[0] = $_REQUEST['data'];               //Set current page to requested
            if ($_REQUEST['mode'] == 3) $file[1] = $_REQUEST['data'];               //Laser pointer
            file_put_contents("news.txt", implode("\n>", $file));
        }
        
    }
?>