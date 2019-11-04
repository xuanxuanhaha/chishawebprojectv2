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
  $firstname = mysqli_real_escape_string($con, trim($request->data->firstname));
  $lastname = mysqli_real_escape_string($con, trim($request->data->lastname));
  $email = mysqli_real_escape_string($con, trim($request->data->email));
  $phone = mysqli_real_escape_string($con, trim($request->data->phone));
  $address = mysqli_real_escape_string($con, trim($request->data->address));
  $referenceNo = mysqli_real_escape_string($con, trim($request->data->referenceNo));

  // Store.
  $sql = "INSERT INTO `customerinfos`(`id`,`firstname`,`lastname`,`email`,`phone`,`address`,`referenceNo`) VALUES (null,'{$firstname}','{$lastname}','{$email}','{$phone}','{$address}','{$referenceNo}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $customerinfo = [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'email' => $email,
      'phone' => $phone,
      'address' => $address,
      'referenceNo' => $referenceNo,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$customerinfo]);
  }
  else
  {
    http_response_code(422);
  }
}
