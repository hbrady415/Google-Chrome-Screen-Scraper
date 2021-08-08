<?php
echo($_SERVER["REMOTE_ADDR"]);
//exit($_SERVER["REMOTE_ADDR"]);
/*
    include_once "../util/functions.php";
    
    readInputVariables(false);
    if(isset($token)){
        if($token==$exceltoken){
            connectToDatabases();
            setHQIPAddress();
            echo("OK|");
            echo(getHQIPAddress());
            exit();
        } else {
            exit("Invalid token");
        }
    }
    echo("No token found<br>");
    echo($_SERVER["REMOTE_ADDR"]);

//foreach($_SERVER as $key_name => $key_value) {
//print $key_name . " = " . $key_value . "<br>";
//}

function getHQIPAddress(){
    global $slave;
    $s = "";
    $s = sAnswer($slave,"SELECT value FROM globalsettings WHERE client = 0 AND id = 1");
    return $s;
}
function setHQIPAddress(){
    global $slave;    
    $ipaddress = $_SERVER["REMOTE_ADDR"];    
    $sql = "UPDATE globalsettings SET value = '$ipaddress' WHERE client = 0 AND id = 1";
    $retval = mysqli_query($slave,$sql);
    if(!$retval) die("Could not update ipaddress: <br>" . mysqli_error($slave));    
}
*/

?>