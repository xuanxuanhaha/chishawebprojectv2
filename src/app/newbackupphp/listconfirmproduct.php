<?php
/**
 * Returns the list of cars.
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

include 'connect.php';

$customerinfos = [];
$sql = "SELECT referenceNo, productId, productNo FROM confirmproducts";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $customerinfos[$cr]['id']    = $row['id'];
    $customerinfos[$cr]['referenceNo'] = $row['referenceNo'];
    $customerinfos[$cr]['productId'] = $row['productId'];
    $customerinfos[$cr]['productNo'] = $row['productNo'];
    $cr++;
  }

  echo json_encode(['data'=>$customerinfos]);
}
else
{
  http_response_code(404);
}
