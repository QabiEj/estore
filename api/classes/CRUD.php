<?php

include 'Database.php';

class CRUD {
    private $pdo;

    public function __construct() {
        $db = Database::getInstance();
        $this->pdo = $db->getConnection();
    }

    public function create($table, $data) {
        $columns = implode(", ", array_keys($data));
        $values  = ":".implode(", :", array_keys($data));

        $sql = "INSERT INTO $table ($columns) VALUES ($values)";

        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }

        return $stmt->execute() ? true : $stmt->errorInfo();
    }

    public function read($table, $condition = [], $limit = null, $order = []) {
        $sql = "SELECT * FROM $table";

        if(!empty($condition)) {
            $sql .= " WHERE ".$condition['column']." = :value";
        }

        if(!empty($order)) {
            $sql .= " ORDER BY " .$order['column'] ." " .$order['order'];
        }

        if(!is_null($limit)) {
            $sql .= " LIMIT " .$limit;
        }

        $stmt = $this->pdo->prepare($sql);

        if(!empty($condition)) {
            $stmt->bindParam(':value', $condition['value']);
        }

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($table, $data, $condition = []) {
        $columns = "";

        foreach($data as $key => $value) {
            $columns .= "$key = :$key, ";
        }

        $columns = rtrim($columns, ", ");

        $sql = "UPDATE $table SET $columns";

        if(!empty($condition)) {
            $sql .= " WHERE ".$condition['column']." = :condition_value";
        }

        $stmt = $this->pdo->prepare($sql);

        foreach ($data as $key => &$val) {
            $stmt->bindParam(":$key", $val);
        }

        if(!empty($condition)) {
            $stmt->bindParam(':condition_value', $condition['value']);
        }

        return $stmt->execute() ? true : $stmt->errorInfo();
    }

    public function delete($table, $condition = [], $limit = null) {
        $sql = "DELETE FROM $table";

        if(!empty($condition)) {
            $sql .= " WHERE ".$condition['column']." = :value";
        }

        if(!is_null($limit)) {
            $sql .= " LIMIT " .$limit;
        }

        $stmt = $this->pdo->prepare($sql);

        if(!empty($condition)) {
            $stmt->bindParam(':value', $condition['value']);
        }

        return $stmt->execute() ? true : $stmt->errorInfo();
    }

    public function search($table, $column, $value) {
        $sql = "SELECT * FROM $table WHERE $column LIKE :value";
        $value = "%$value%";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':value', $value);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}