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
$db = new mysqli('localhost', 'username', 'password', 'databasename'); 
 
if ($db->connect_errno) {
    die("Connect failed: ". $db->connect_error);
}
 
$gateway = Omnipay::create('PayPal_Rest');
$gateway->setClientId(CLIENT_ID);
$gateway->setSecret(CLIENT_SECRET);
$gateway->setTestMode(true); //set it to 'false' when go live?>