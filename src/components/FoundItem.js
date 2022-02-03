import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Modal, Row} from "react-bootstrap";
import GridItem from "./GridItem";
import MovieInfo from "./MovieInfo";


export default function FoundItem(props){
    return(
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered className={"modal-bg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        MOVIES FOUND
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.movies.map((movie, index) =>
                        <Row key={movie.id}>
                            <Card className={" p-3 border-dark"}>
                                <Card.Img variant="top" src={movie.poster}  className={"mx-auto d-block w-50"}/>
                                <Card.Body>
                                    <Card.Title>{movie.name}</Card.Title>
                                    <Card.Text>
                                        {movie.yearOfCreation}
                                        <br/>
                                        {movie.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                         onClick={props.onHide}
                        className={"modal-btn"}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}