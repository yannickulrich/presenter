<?php   
    session_start();
    include("config.php");
    
    if (!$_SERVER['SERVER_ADDR'] == $_SERVER['REMOTE_ADDR'])
    {
        $this->output->set_status_header(400, 'No Remote Access Allowed');
        exit; //just for good measure
    }

    if (isset($_GET['submit_password']))
    {
        file_put_contents("config.php", "<?php \$_SESSION['pdf'] = '" . $_SESSION['pdf'] . "'; \$_SESSION['notes'] = '" . $_SESSION['notes'] . "'; \$authhash = '" . md5($_POST['passwd']) . "'; ?>");
    }
    else if (isset($_GET['submit_upload']))
    {
        
        if (move_uploaded_file($_FILES['PDFfile']['tmp_name'], "../content/" . $_FILES['PDFfile']['name']) && move_uploaded_file($_FILES['NotesFile']['tmp_name'], "../content/" . $_FILES['NotesFile']['name']) )
        {
            file_put_contents("config.php", "<?php \$_SESSION['pdf'] = '" . $_FILES['PDFfile']['name'] . "'; \$_SESSION['notes'] = '" . $_FILES['NotesFile']['name'] . "'; \$authhash = '" . $authhash . "'; ?>");
        }
        else
        {
            echo "There was an error uploading the file, please try again!";
        }
        
    }
    else if (isset($_GET['submit_convert']))
    {
        if (PHP_OS == "Darwin")//Mac OS X
        {
            exec( "convert -density 150 -quality 100 -resize 800x " . realpath("../content/" . $_SESSION['pdf']) . " " . realpath("../content/pdfImages/") . "/slides.png" );
       }
       exit;
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
                <form action="?submit_password" method="post">
                    Enter a password: <input name="passwd" type="password" size="12" maxlength="12"/>
                    <input type="submit" value="Save" />
                </form>
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
                        <div id="converting">
                            Converting. Please wait...
                        </div>
                        <script>
                            $.ajax({
                                url: "?submit_convert",
                                cache: false
                            }).done(function (data) {
                                $("#converting").html("");
                            });
                        </script>
                        <?php
                    }
                ?>
            </p>
        </div>
    </body>
</html>
