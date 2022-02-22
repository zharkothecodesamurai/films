import { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent from '../../UI/ErrorComponent';
import Modal from '../../UI/Modal';
import AppContext from "../../../store/app-context"
import Succes from '../../UI/Succes';

import "./MovieItemDetails.css"

import { Rating } from 'react-simple-star-rating'


const MovieItemDetails = (props) => {
    const [details, setDetails] = useState({});
    const paramMovie = useParams();
    const [errorHttp, setErrorHttp] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRated, setIsRated] = useState(false);
    const [rating, setRating] = useState(0);

    const AppCtx = useContext(AppContext);

    const ratingChanged = (newRating) => {
        let ratingToAdd = newRating / 10;

        setRating(ratingToAdd);
    }

    let resultRate = null;
    if (AppCtx.isLogged) {
        resultRate = (
            <div className='container'>
                <div className='row' style={{ paddingLeft: '3rem' }} >
                    <div className='col'>
                        <h4>Rate me</h4>
                    </div>
                </div>
                <div className='row'>
                    <Rating
                        onClick={ratingChanged}
                        ratingValue={rating}
                        size={40}
                        stars={1}
                        label
                        transition
                        fillColor='orange'
                        emptyColor='gray'
                    />
                </div>
            </div>
        );
    }

    const errorHandler = () => {
        setErrorHttp();
    }

    useEffect(() => {

        const call = async () => {
            setIsLoading(true);
            const key = process.env.REACT_APP_MOVIE_APP_ID;
            const apiKey = key.replace(/[']+/g, '');

            const response = await fetch(`https://api.themoviedb.org/3/movie/${paramMovie.movieId}?api_key=${apiKey}&language=en-US`);

            if (!response.ok) {
                throw new Error("Fetching went wrong")
            }

            const data = await response.json();
       
            setDetails(data);
            setIsRated(false);
        }

        call().catch(error => {
            setIsLoading(false);
            setErrorHttp(error.message);
        })
    }, [])

    useEffect(() => {
        const call = async () => {
            if (rating === 0) {
                return;
            }
            setIsLoading(true);
            const key = process.env.REACT_APP_MOVIE_APP_ID;
            const apiKey = key.replace(/[']+/g, '');
            // const movieId = parseInt(paramMovie.movieId,10);
            const movieId = paramMovie.movieId.replace(/[']+/g, '')
            let url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&session_id=${AppCtx.sessionId}`

            const Options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                    value: rating
                })
            }

            const response = await fetch(url, Options);

            if (!response.ok) {
                throw new Error("Rating movie failed")
            }

            const data = await response.json();
            if(data.success){
                setIsRated(true);
            }
            setIsLoading(false);
        }

        call().catch(error => {
            setIsLoading(false);
            setErrorHttp(error.message);
        })
    }, [rating])

    const succesHandler = () => {
        setIsRated(false);
    }


    return (
        <Fragment>
            {isRated && <Modal onHide={succesHandler}>
                <Succes succesMessaage={"Movie rated!!"}></Succes>
            </Modal>}
            {errorHttp && <Modal onHide={errorHandler}>
                <ErrorComponent errorMessage={errorHttp}></ErrorComponent>
            </Modal>}
            <div className='containerRaiting'>
                <div className='contianer'>
                    {resultRate}
                </div>
            </div>
            <div className="containerImage">
                <div className='sectionsContainerImage'>
                    <div className='backdrop'>
                        <img alt="poster" className='img' src={"https://image.tmdb.org/t/p/w200/" + details.poster_path}></img>
                    </div>
                </div>
                <div className='sectionsContainerDetails'>
                    <div className='container centered'>
                        <div className='row'>
                            <div className='col'>
                                <p ><span className='bold'>Title :</span> <span>{details.title}</span></p></div>
                            <div className='col'>
                                <p> <span className='bold'>Budget :</span> <span>{details.budget}</span></p>
                            </div>
                            <div className='col'>
                                <p><span className='bold'>Vote status :</span><span>{details.vote_average}</span></p>
                            </div>
                            <div className='col'>
                                <p ><span className='bold'>Revenue :</span> <span>{details.revenue}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='container centered'>
                        <div className="taglineInfo row ">

                            <h3 >Overview</h3>
                            <h3 className="tagline">{details.tagline}</h3>
                            <div>
                                <p>{details.overview}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div>

                </div>
            </div>
        </Fragment>
    )
}

export default MovieItemDetails