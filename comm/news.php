<?php
    /*
    * The notes file:
    *   +-------------------------------------+
    *   |[PAGENUMBER]                         |
    *   |>[LASER X], [LASER Y]                |
    *   |>[JSON DRAWING]                      |
    *   |>[JSON DRAWING]                      |
    *   |               ...                   |
    *   |>[JSON DRAWING]                      |
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
            
            for ($j = 0; $j < $i; $j++) $str .= "\n>[]";
            
            file_put_contents("news.txt", $str);
       }
    }
    if (isset($_GET['read']))
    {
        $file = explode("\n>", file_get_contents('news.txt'));
        echo $file[0] . ">" . $file[intval($file[0])+2] . ">" . $file[1];
    }
    else if (isset($_GET['write']) && isset($_REQUEST['data']) && isset($_REQUEST['mode']))
    {
        session_start();
        include("../tools/config.php");
        if ($_SESSION['passwd'] == $authhash)
        {
            /*$indices = explode(">", file_get_contents('news.txt'), 2);
            
            echo(implode(">", $indices));
            file_put_contents("news.txt", implode(">", $indices));*/
            
            $file = explode("\n>", file_get_contents('news.txt'));
            //print_r($file);
            
            $currentPage = intval($file[0]);
            
            //echo ($_REQUEST['mode']);
            
            if ($_REQUEST['mode'] == 1) $file[0] = $_REQUEST['data'];               //Set current page to requested
            if ($_REQUEST['mode'] == 2) $file[$currentPage+2] = $_REQUEST['data']; //Writing drawing on current page
            if ($_REQUEST['mode'] == 3) $file[1] = $_REQUEST['data'];                //Laser pointer
            
            
            
            //print_r($file);
            
            
            //echo(implode("\n>", $file));
            file_put_contents("news.txt", implode("\n>", $file));
        }
        
    }
?>