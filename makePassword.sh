#!/bin/bash

echo "Please enter a password: "
read -s passwd
hash="$(echo -n "$passwd" | md5 )"
echo "<?php \$authhash = '$hash'; ?>" > auth.php