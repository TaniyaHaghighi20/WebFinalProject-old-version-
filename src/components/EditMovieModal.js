import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col,  Modal, Row} from "react-bootstrap";
import axios from "axios";

export default function EditMovieModal(props) {
    const [movie,setMovie] = useState({editId:props.id,editName:"name",editYear:"0",editDesc:"desc",editPoster:"poster"});
    // const [added,setAdded] = useState(false);
    function handleChange(e){
        setMovie({...movie,[e.target.name]:e.target.value});

    }

    const updateMovie= async ()=>{
        console.log(movie);
        const res = await axios.put('http://localhost:8000/src/index.php', {movie})
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                props.reload();
            })
        props.onHide();
    }

    return (
        <Modal
            {...props}
            size="lg"

            centered className={"modal-bg"}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title">
                   EDIT MOVIE
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col >
                            <label htmlFor="editName" className={"label"}> movie name:</label><br/>
                            <input type="text" placeholder={props.name} name={"editName"} className={"p-1  input "} required={true} onChange={handleChange}/><br/>
                            <label htmlFor="editYear" className={"label"}> movie year:</label><br/>
                            <input type="text" placeholder={props.year} name={"editYear"} className={"p-1  input"} required={true} onChange={handleChange}/><br/>
                            <label htmlFor="editPoster" className={"label"}> movie poster:</label><br/>
                            <input type="text" placeholder={props.poster} name={"editPoster"} className={"p-1  input"} required={true} onChange={handleChange}/><br/>
                        </Col>
                        <Col>

                            <label htmlFor="editDesc" className={"label"}> movie description:</label><br/>
                            <textarea name="editDesc" placeholder={props.desc} id="desc" cols="60" rows="6"  className={"p-1  input"} required={true} onChange={handleChange}/>
                            <button type="submit" className={"px-5 py-2 bg-dark text-light submitBtn"} onClick={updateMovie}>Edit</button>
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className={"modal-btn"}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

