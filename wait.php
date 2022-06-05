<?php
    $default_wait_milliseconds = 500;
    $max_wait_milliseconds = 50000;

    $milliseconds_parameter = array_key_exists($'milliseconds', $_GET) ? $_GET['milliseconds'] : $default_wait_milliseconds;
    // If the user provided a valid number for milliseconds use it, otherwise use the default wait milliseconds.
    $milliseconds = parse_int_or_null($milliseconds_parameter) ?? $default_wait_milliseconds;

    // If the user entered a negative number, use 0 milliseconds.
    if ($milliseconds < 0){
        $milliseconds = 0;
    }

    // If the user entered a value over the max wait milliseconds, use the max wait milliseconds.
    if ($milliseconds > $max_wait_milliseconds){
        $milliseconds = $max_wait_milliseconds;
    }

    sleep_milliseconds($milliseconds);
    print("Waited $milliseconds millisecond(s).");

    function parse_int_or_null($string){
        $possible_int = (int)$string;
        if ((string)$possible_int === ($string)){
            return $possible_int;
        }
        else{
            return null;
        }
    }

    function sleep_milliseconds($milliseconds){
        // 1000 microseconds in a millisecond.
        usleep($milliseconds * 1000);
    }
?>