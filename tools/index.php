<?php   
    session_start();
    include("config.php");
    //print_r($_SERVER);
    if (!($_SERVER['SERVER_ADDR'] == $_SERVER['REMOTE_ADDR']))
    {
        header('HTTP/1.1 403 Forbidden');
        echo "403: This file is <b>not</b> public. You can't access it!";
        exit; //just for good measure
    }

    if (isset($_GET['submit_password']))
    {
        file_put_contents("config.php", "<?php \$_SESSION['pdf'] = '" . $_SESSION['pdf'] . "'; \$_SESSION['notes'] = '" . $_SESSION['notes'] . "'; \$authhash = '" . md5($_POST['passwd']) . "'; ?>");
        echo "200";
        exit();
    }
    else if (isset($_GET['submit_upload']))
    {
        
        if (move_uploaded_file($_FILES['PDFfile']['tmp_name'], "../content/" . $_FILES['PDFfile']['name']) && move_uploaded_file($_FILES['NotesFile']['tmp_name'], "../content/" . $_FILES['NotesFile']['name']) )
        {
            file_put_contents("config.php", "<?php \$_SESSION['pdf'] = '" . $_FILES['PDFfile']['name'] . "'; \$_SESSION['notes'] = '" . $_FILES['NotesFile']['name'] . "'; \$authhash = '" . $authhash . "'; ?>");
            
        }
        else
        {
            echo "Error uploading files";
        }
    }
    else if (isset($_GET['submit_convert']))
    {
        if (PHP_OS == "Darwin")//Mac OS X
        {
            exec( "convert -density 150 -quality 100 -resize 800x " . realpath("../content/" . $_SESSION['pdf']) . " " . realpath("../content/pdfImages/") . "/slides.png" );
            
            
       }
       
       if ($handle = opendir('../content/pdfImages/')) //We need to know how many pages we are dealing with!!
       {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != "..") $i++;
            closedir($handle);
            
            $str = "0\n>(0,0)";
            
            for ($j = 0; $j < $i; $j++) $str .= "\n>[]";
            
            file_put_contents("../comm/news.txt", $str);
       }
       echo "200";
       exit();
    }
    else if (isset($_GET['submit_clear']))
    {
        if ($handle = opendir('../content/pdfImages/')) //We need to know how many pages we are dealing with!!
        {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != "..") $i++;
            closedir($handle);
            
            $str = "0\n>(0,0)";
            
            for ($j = 0; $j < $i; $j++) $str .= "\n>[]";
            
            file_put_contents("../comm/news.txt", $str);
            echo "200";
        }
        else
            echo "500";
        exit();
    }
    else if (isset($_GET['submit_saveAnnotations']))
    {
        if (PHP_OS == "Darwin")
            $apps = "/Applications/Inkscape.app/Contents/Resources/bin/inkscape /usr/texbin/pdflatex";
        else
            $apps = "inkscape pdflatex";
        
        exec("python " .dirname($_SERVER['SCRIPT_FILENAME']) . "/saveAnnotations.py ". realpath("../content/" . $_SESSION['pdf']) . " " . realpath("../comm/news.txt") . " " . $apps);
        echo "Done <a href='temp/annotations.pdf'>Download</a>";
        exit();
        //exec( dirname($_SERVER['SCRIPT_FILENAME']) . "/saveAnnotations.py " . realpath("../content/" . $_SESSION['pdf']) . " " . realpath("../comm/news.txt") . " " . $inkscape . " 2> " . dirname($_SERVER['SCRIPT_FILENAME']) . "/error.txt");
        //echo("bash -c echo test > " . dirname($_SERVER['SCRIPT_FILENAME']) . "/error.txt");
    }
    

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - Tools</title>
        
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        
        <script type="text/javascript" src="../lib/jquery-min.js"></script>
        <link rel="stylesheet" href="../index.css" type="text/css"/>
    </head>
    <body>
        <div id="wrapperMain">
            <h1>PRESENTER</h1><br/>
            <p>
                <form id="passwdForm" action="?submit_password" method="post">
                    Enter a password: <input name="passwd" id="passwd" type="password" size="12" maxlength="12"/>
                    <input type="submit" value="Save" />
                </form>
                <script>
                    $("#passwdForm").submit(function() {
                        $.post("?submit_password", { passwd: $("#passwd").val() }, function(data){ if (data == "200") $("#log").html("Password saved"); else $("#log").html("An error occured during saving"); $("#passwd").val(""); });
                        return false;
                    });
                </script>
            </p>
            <p>
                <form action="?submit_upload" method="post" enctype="multipart/form-data">
                    PDF: <input name="PDFfile" type="file" /><br />
                    Notes: <input name="NotesFile" type="file" /><br />
                    <input type="submit" value="Upload & Convert document " />
                </form>
                <?php
                    if (isset($_GET['submit_upload']))
                    {
                        ?>
                        <script>
                            $(document).ready(function () { $("#log").html("Converting. Please wait!"); });
                            $.ajax({
                                url: "?submit_convert",
                                cache: false
                            }).done(function (data) {
                                $("#log").html("Converting done");
                            });
                        </script>
                        <?php
                    }
                ?>
            </p>
            <p>
                <form id="clearAnnotations" action="?submit_clear" method="post">
                    <input type="submit" value="Clear all annotations" />
                    
                </form>
                <script>
                    $("#clearAnnotations").submit(function() {
                        $.post("?submit_clear", {}, function(data){ if (data == "200") $("#log").html("Annotations cleared"); else $("#log").html("An error occured during clearing");} );
                        return false;
                    });
                </script>
            </p>
            <p>
                <form id="submit_saveAnnotations" action="?submit_saveAnnotations" method="post">
                    Requires Inkscape & pdflatex installed
                    <input type="submit" value="Add annotations to slides" />
                    
                </form>
                <script>
                    $("#submit_saveAnnotations").submit(function() {
                        $("#log").html("Saving! Please wait.");
                        $.post("?submit_saveAnnotations", {}, function(data){ $("#log").html(data);});
                        return false;
                    });
                </script>
                
            </p>
            <p id="log">
                
            </p>
        </div>
    </body>
</html>
