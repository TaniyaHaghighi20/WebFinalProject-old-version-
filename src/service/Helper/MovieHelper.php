<?php

namespace movie\Helper;

use movie\model\Movie;
use PDO;
use service\Helper\DBConnector;

class MovieHelper
{
    public function insert(Movie $movie)
    {

        $name= trim($movie->getName());
        $poster= trim($movie->getPoster());
        $year= trim($movie->getYearOfCreation());
        $desc= trim($movie->getDescription());

        $connection = new DBConnector();
        $connection->connect();
        $conn=$connection->getConnection();
        $sth=$conn->prepare(
                "insert into movie_info(
                     name,yearOfCreation,poster,description
                    )values ('$name','$year','$poster','$desc');
"
        );
        $sth->execute();
//        $count = $sth->rowCount();
//        if($count>0){
//            $message="<br> firstname: ".$name." lastname: ".$year." username: ".$desc." created successfully.";
//        }else{
//            $message="<br> user was not created maybe because username already exist";
//        }
//        echo $message;
    }

    public function fetch(String $search)
    {
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare("select * from movie_info where name='$search' or yearOfCreation='$search';");
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['phpResult'=>$result]);

        } catch (Exception $e) {
            echo $e->getMessage();
        }


    }

    public function fetchAll()
    {
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare("
                                       select * from movie_info");
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['phpResult'=>$result]);

        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
    public function update(Movie $movie,$id)
    {
        $name= trim($movie->getName());
        $poster= trim($movie->getPoster());
        $year= trim($movie->getYearOfCreation());
        $desc= trim($movie->getDescription());

        $connection = new DBConnector();
        $connection->connect();
        $conn=$connection->getConnection();
        $sth=$conn->prepare("
         UPDATE movie_info
         SET name='$name',yearOfCreation='$year',poster='$poster',description='$desc'
         where id='$id'; 

        ");
        $sth->execute();

//        $count = $sth->rowCount();
//        if($count>0){
//            $message="<br> firstname: ".$fname." lastname: ".$lname." username: ".$uname." updated successfully.";
//        }else{
//            $message="<br> user was not updated maybe because it doesn't exist";
//        }
//        echo $message;
    }

    public function delete($id)
    {
        $connection = new DBConnector();
        $connection->connect();
        $conn=$connection->getConnection();
        $sth=$conn->prepare("delete from movie_info where id='$id'");
        $sth->execute();

//        $count = $sth->rowCount();
//        if($count>0){
//            $message="<br> username: ".$username." deleted successfully.";
//        }else{
//            $message="<br> user was not deleted maybe because it doesn't exist";
//        }
//        echo $message;
    }

}