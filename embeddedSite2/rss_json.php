<?php
  $BASE_URL = "http://query.yahooapis.com/v1/public/yql";


  if ($_GET['rssFeedSource']) {
    $rssFeedURL = $_GET['rssFeedSource'];
  }


  $yql_query = 'select * from rss where url="'.$rssFeedURL.'"';
  // $yql_query = 'select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text="chicago, il")';
  $yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
  // Make call with cURL
  $session = curl_init($yql_query_url);
  curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
  $json = curl_exec($session);
  // Convert JSON to PHP object
  //  $phpObj =  json_decode($json);
  // var_dump($phpObj);

  header('Content-Type: application/json');

  print($_GET['callback'] ? $_GET['callback'].'('.$json.')' : $json);


?>