<?php
  $name = $_GET['name'];
  $surname = $_GET['surname'];
  $age = $_GET['age'];
  $address = $_GET['address'];
  $mail_address = $_GET['mail'];

  // part for validating all the data <3

  try {
    $db = new PDO('mysql:host=localhost;dbname=NAZWA_BAZY', 'USER', 'PSWRD');

    $query = $db->prepare('INSERT INTO tabela(name, surname, age, address, mail) VALUES(?, ?, ?, ?, ?)');
    $query->execute([$name, $surname, $age, $address, $mail_address]);
  } catch(PDOException $e) {
    die('Could connect with database!');
  }
?>
