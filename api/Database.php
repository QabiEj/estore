<?php

class Database {
    private static $instance = null;
    private $connection = null;

    public function __construct() {
        $host = getenv('POSTGRES_HOST');
        $dbname = getenv('POSTGRES_DATABASE');
        $user = getenv('POSTGRES_USER');
        $password = getenv('POSTGRES_PASSWORD');
        $port = getenv('POSTGRES_PORT');

        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";

        try {
            $this->connection = new PDO($dsn);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    function getConnection() {
        return $this->connection;
    }
}