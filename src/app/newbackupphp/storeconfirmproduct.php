<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
//   if(trim($request->data->firstname) === '' || (int)$request->data->price < 1)
//   {
//     return http_response_code(400);
//   }

  // Sanitize.
  $productId = mysqli_real_escape_string($con, (int)$request->data->productId);
  $productNo = mysqli_real_escape_string($con, (int)$request->data->productNo);
  $referenceNo = mysqli_real_escape_string($con, trim($request->data->referenceNo));

  // Store.
  $sql = "INSERT INTO `confirmproducts`(`id`,`productId`,`productNo`,`referenceNo`) VALUES (null,'{$productId}','{$productNo}','{$referenceNo}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $customerinfo = [
      'productId' => $productId,
      'productNo' => $productNo,
      'referenceNo' => $referenceNo,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$confirmproducts]);
  }
  else
  {
    http_response_code(422);
  }
}
