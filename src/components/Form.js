import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormCss.css'
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import MoviesContainer from "./MoviesContainer";

export default function Form(props){

    const [movies, setMovies] = useState([]);

    const loadMovies= async ()=>{
        const res=await axios.get("http://localhost:8000/src/index.php");
        setMovies(res.data.phpResult);
        // console.log("all");
        //console.log(typeof res.data);

    }

    useEffect(() => {
        loadMovies();
    }, []);

    const [movie,setMovie] = useState({name:"name",yearOfCreation:"0",description:"desc",poster:"poster"});
    function handleChange(e){
        setMovie({...movie,[e.target.name]:e.target.value});
    }

    const AddMovie= async (e)=>{
        e.preventDefault();
        console.log(movie);
        await axios.post("http://localhost:8000/src/index.php", {
            movie
        })
        .then(res => {
            loadMovies();
        })
    }




    // const editMovie = () => {
    //
    // }

    return(
            <>
                <form className={"black text-light"} onSubmit={AddMovie} >
                    <Container>
                        <h6 className={"py-1"}>Add new Movie</h6>

                        <Row>
                            <Col >
                                <label htmlFor="name" className={"label"}> movie name:</label><br/>
                                <input type="text" placeholder={"name "} name={"name"} className={"p-1  input "} required={true} onChange={handleChange}/><br/>
                                <label htmlFor="year" className={"label"}> movie year:</label><br/>
                                <input type="text" placeholder={"year "} name={"year"} className={"p-1  input"} required={true} onChange={handleChange}/><br/>
                                <label htmlFor="poster" className={"label"}> movie poster:</label><br/>
                                <input type="text" placeholder={"poster "} name={"poster"} className={"p-1  input"} required={true} onChange={handleChange}/><br/>
                            </Col>
                            <Col>
                                <label htmlFor="desc" className={"label"}> movie description:</label><br/>
                                <textarea name="desc" id="desc" placeholder={"description"} cols="60" rows="6"  className={"p-1  input"} required={true} onChange={handleChange}/>
                                <button type="submit" className={"px-5 py-2 bg-dark text-light submitBtn"} >Add</button>
                            </Col>
                        </Row>
                    </Container>
                </form>
                <MoviesContainer
                    list={props.list}
                    grid={props.grid}
                    movies = {movies}
                    reload={loadMovies}
                />
            </>
    )
}