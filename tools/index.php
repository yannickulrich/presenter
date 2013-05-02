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
            
            $str = "0\n>0,0";

            
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
        {
            /*$apps = "/Applications/Inkscape.app/Contents/Resources/bin/inkscape /usr/texbin/pdflatex";
            exec("python " .dirname($_SERVER['SCRIPT_FILENAME']) . "/saveAnnotations.py ". realpath("../content/" . $_SESSION['pdf']) . " " . realpath("../comm/news.txt") . " " . $apps);*/
            
            $texFile = "\\documentclass[10pt]{article}\n" . 
                       "\\usepackage[a4paper]{geometry}\n" . 
                       "\\usepackage[final]{pdfpages}\n" . 
                       "\\usepackage{graphicx}\n".
                       "\\begin{document}\n".
                       "\\unitlength1cm\n";
            $file = explode("\n>", file_get_contents('../comm/news.txt'));
            array_shift($file);
            array_shift($file);
            
            foreach ($file as $i => $JSONpath) 
            {
                $tempfile = '<svg height="600" version="1.1" width="800" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; -webkit-user-select: text; ">';
                $paths = json_decode($JSONpath, true);
                
                foreach ($paths as $path) 
                    $tempfile .= '<path style="stroke-opacity: ' . $path['stroke-opacity'] . '; stroke-linecap: ' . $path['stroke-linecap'] . '; stroke-linejoin: ' . $path['stroke-linejoin'] . '; " fill="' . $path['fill'] . '" stroke="' . $path['stroke'] . '" d="' . $path['path'] . '" stroke-opacity="' . $path['stroke-opacity'] . '" stroke-width="' . $path['stroke-width'] . '" stroke-linecap="' . $path['stroke-linecap'] . '" stroke-linejoin="' . $path['stroke-linejoin'] . '" transform="matrix(1,0,0,1,0,0)"></path>';
                    
                $tempfile .= "</svg>";
                
                
                file_put_contents("temp/file" . $i . ".svg", $tempfile);
                
                $inkscape = "/Applications/Inkscape.app/Contents/Resources/bin/inkscape";
                
                exec( $inkscape .  " " . dirname($_SERVER['SCRIPT_FILENAME']) . "/temp/file" . $i . ".svg -z -A " . dirname($_SERVER['SCRIPT_FILENAME']) . "/temp/file" .  $i . ".pdf" );
                
                
                $texFile .= "\\begin{picture}(20,20)\n".
                            "\\put(0,0){\\includegraphics[width=10cm,page=" . ($i+1) . "]{" . realpath("../content/" . $_SESSION['pdf'])  . "}}\n" . 
                            "\\put(0,0){\\includegraphics[width=10cm]{" . dirname($_SERVER['SCRIPT_FILENAME']) . "/temp/file" . $i . ".pdf}}\n" . 
                            "\\end{picture}\n";

            }
            
            
            
        }
        $texFile .= "\\end{document}";
        
        file_put_contents("temp/annotations.tex", $texFile);
        
        exec("/usr/texbin/pdflatex -interaction=batchmode -output-directory=" . dirname($_SERVER['SCRIPT_FILENAME']) . "/temp " . dirname($_SERVER['SCRIPT_FILENAME']) . "/temp/annotations.tex");
        
        
        if ($handle = opendir('temp/'))
        {
            $i = 0;
            while (false !== ($file = readdir($handle)))
                if ($file != "." && $file != ".." && $file != "annotations.pdf")
                {
                    unlink("temp/".$file);
                }
        }
        
        echo "Done <a href='temp/annotations.pdf'>Download</a>";
        exit();
    }
    

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - Tools</title>
        
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
        
        <script type="text/javascript" src="../lib/jquery-min.js"></script>
        <link rel="stylesheet" href="index.css" type="text/css"/>
    </head>
    <body>
        <div id="wrapperMain">
            <h1>PRESENTER</h1>
            <h2>TOOLs</h2>
            <div class="tool" id="passwdTool">
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
            </div>
            <div class="tool">
                <form action="?submit_upload" method="post" enctype="multipart/form-data">
                    <table>
                        <tr>
                            <td>PDF: </td><td><input name="PDFfile" type="file" /></td>
                        </tr>
                        <tr>
                            <td>Notes: </td><td><input name="NotesFile" type="file" /></td>
                        </tr>
                            <td colspan="2"><input type="submit" value="Upload & Convert document " /></td>
                    </table>
                </form>
            </div>
            <div class="tool">
                <form id="clearAnnotations" action="?submit_clear" method="post">
                    <input type="submit" value="Clear all annotations" />
                    
                </form>
                <script>
                    $("#clearAnnotations").submit(function() {
                        $.post("?submit_clear", {}, function(data){ if (data == "200") $("#log").html("Annotations cleared"); else $("#log").html("An error occured during clearing");} );
                        return false;
                    });
                </script>
            </div>
            <div class="tool">
                <form id="submit_saveAnnotations" action="?submit_saveAnnotations" method="post">
                    Requires Inkscape & pdflatex installed<br>
                    <input type="submit" value="Add annotations to slides" />
                    
                </form>
                <script>
                    $("#submit_saveAnnotations").submit(function() {
                        $("#log").html("Saving! Please wait.");
                        $.post("?submit_saveAnnotations", {}, function(data){ $("#log").html(data);});
                        return false;
                    });
                </script>
                
            </div>
            
            
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
            
            <p id="log">
                ABC
            </p>
        </div>
    </body>
</html>
