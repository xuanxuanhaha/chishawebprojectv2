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
  $paymentId = mysqli_real_escape_string($con, trim($request->data->paymentId));
  $paymentStatus = mysqli_real_escape_string($con, trim($request->data->paymentStatus));
  $paymentTime = mysqli_real_escape_string($con, trim($request->data->paymentTime));
  $referenceNo = mysqli_real_escape_string($con, trim($request->data->referenceNo));

  // Store.
  $sql = "INSERT INTO `paymentinfos`(`id`,`paymentId`,`paymentStatus`,`paymentTime`,`referenceNo`) VALUES (null,'{$paymentId}','{$paymentStatus}','{$paymentTime}','{$referenceNo}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $customerinfo = [
      'paymentId' => $paymentId,
      'paymentStatus' => $paymentStatus,
      'paymentTime' => $paymentTime,
      'referenceNo' => $referenceNo,
      'id' => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$paymentinfos]);
  }
  else
  {
    http_response_code(422);
  }
}
