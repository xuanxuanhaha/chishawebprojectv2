<?php
/**
 * Returns the list of cars.
 */
//  Header always set Access-Control-Max-Age "1000"
//  Header always set Access-Control-Allow-Headers "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"
//  Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
//  Header always set Access-Control-Allow-Origin "http://localhost:4200"

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

include 'connect.php';

$cars = [];
$sql = "SELECT id, model, price FROM cars";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cars[$cr]['id']    = $row['id'];
    $cars[$cr]['model'] = $row['model'];
    $cars[$cr]['price'] = $row['price'];
    $cr++;
  }

  echo json_encode(['data'=>$cars]);
}
else
{
echo "hk";
  http_response_code(404);
}
