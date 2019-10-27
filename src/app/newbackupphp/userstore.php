<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
include 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


//   // INValidate.
//   if(trim($request->data->email) === '' || $request->data->phone) === '' || (int)$request->data->address === '')
//   {
//     return http_response_code(400);
//   }

  // Sanitize.
  $userID = rand(10000000,99999999);
  $firstName = mysqli_real_escape_string($con, trim($request->data->firstName));
  $middleName = mysqli_real_escape_string($con, trim($request->data->middleName));
  $lastName = mysqli_real_escape_string($con, trim($request->data->lastName));
  $sex = mysqli_real_escape_string($con, trim($request->data->sex));
  $phone = mysqli_real_escape_string($con, trim($request->data->phone));
  $email = mysqli_real_escape_string($con, trim($request->data->email));
  $address = mysqli_real_escape_string($con, (int)$request->data->address);


  // Store.
  $sql = "INSERT INTO `users`(`userID`,`firstName`,`middleName`,`lastName`,`sex`,`email`,`phone`,`address`) VALUES ('{$userID}','{$firstName}','{$middleName}','{$lastName}','{$sex}','{$email}','{$phone}','{$address}')";

  if(mysqli_query($con,$sql))
  {
  echo 'hhh';
    http_response_code(201);
    echo 'lll';
    $user = [
      'userID' => $userID,
      'firstName' => $firstName,
      'middleName' => $middleName,
      'lastName'    => $lastName,
      'sex' => $sex,
      'email' => $email,
      'phone' => $phone,
      'address'=>$address
    ];
    echo json_encode(['data'=>$user]);
    $sql = mysqli_query($con,"SELECT * FROM users");
    echo $sql;
  }
  else
  {
    http_response_code(422);
  }
}


