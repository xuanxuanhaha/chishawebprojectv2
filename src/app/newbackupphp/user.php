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

$users = [];
$sql = "SELECT userID, firstName, middleName, lastName, phone,email, sex, address FROM users";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$cr]['userID']    = $row['userID'];
    $users[$cr]['firstName'] = $row['firstName'];
    $users[$cr]['middleName'] = $row['middleName'];
    $users[$cr]['lastName']    = $row['lastName'];
    $users[$cr]['phone'] = $row['phone'];
    $users[$cr]['sex'] = $row['sex'];
    $users[$cr]['email'] = $row['email'];
    $users[$cr]['address'] = $row['address'];
    $cr++;
  }

  echo json_encode(['data'=>$users]);
}
else
{
echo "hk";
  http_response_code(404);
}
