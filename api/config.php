<?php
require_once "vendor/autoload.php";
 
use Omnipay\Omnipay;

$client_id = getenv('CLIENT_ID');
$client_secret = getenv('CLIENT_SECRET');
define('CLIENT_ID', $client_id );
define('CLIENT_SECRET', $client_secret);
 
define('PAYPAL_RETURN_URL', 'http://localhost/e-commerce/success.php');
define('PAYPAL_CANCEL_URL', 'http://localhost/e-commerce/cancel.php');
define('PAYPAL_CURRENCY', 'EUR'); // set your currency here
 
// Connect with the database
$host = getenv('POSTGRES_HOST');
$db   = getenv('POSTGRES_DATABASE');
$user = getenv('POSTGRES_USER');
$pass = getenv('POSTGRES_PASSWORD');
$port = getenv('POSTGRES_PORT');
$dsn = "pgsql:host=$host;port=$port;dbname=$db;user=$user;password=$pass";

try{
    // create a PostgreSQL database connection
    $conn = new PDO($dsn);
    
    // display a message if connected to the PostgreSQL successfully
    if($conn){
        echo "Connected to the <strong>$db</strong> database successfully!";
    }
}catch (PDOException $e){
    // report error message
    echo $e->getMessage();
}
 
$gateway = Omnipay::create('PayPal_Rest');
$gateway->setClientId(CLIENT_ID);
$gateway->setSecret(CLIENT_SECRET);
$gateway->setTestMode(true); //set it to 'false' when go live
?>