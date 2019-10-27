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

$products = [];
$sql = "SELECT productId, productName, unitPrice, unit, supplierId, categoryId, imgUrl FROM products";


if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$cr]['productId'] = $row['productId'];
    $products[$cr]['productName'] = $row['productName'];
    $products[$cr]['unitPrice'] = $row['unitPrice'];
    $products[$cr]['unit'] = $row['unit'];
    $products[$cr]['supplierId'] = $row['supplierId'];
    $products[$cr]['categoryId'] = $row['categoryId'];
    $products[$cr]['imgUrl'] = $row['imgUrl'];

    $cr++;
  }

  echo json_encode(['data'=>$products]);
}
else
{
echo "hk";
  http_response_code(404);
}
