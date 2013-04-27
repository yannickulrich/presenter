<?php
    if (!$_SERVER['SERVER_ADDR'] == $_SERVER['REMOTE_ADDR'])
    {
        $this->output->set_status_header(400, 'No Remote Access Allowed');
        exit; //just for good measure
    }

    if (isset($_GET['submit_password']))
    {
        file_put_contents("auth.php", "<?php \$authhash = '" . md5($_POST['passwd']) . "'; ?>");
    }
    else if (isset($_GET['submit_convert']))
    {
        if (PHP_OS == "Darwin")//Mac OS X
        {
            
        }
    }

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Presenter - Tools</title>
        
        <meta id="viewport" name="viewport" content="initial-scale=1.0, user-scalable=no">
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
                <form action="?submit_convert" method="post">
                    <input type="submit" value="Convert document " />
                </form>
            </p>
        </div>
    </body>
</html>
