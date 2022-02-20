import { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from "../../../store/app-context"

import "./MovieItemDetails.css"

import Rating from 'react-simple-star-rating'


const MovieItemDetails = (props) => {
    const [details, setDetails] = useState({});
    const paramMovie = useParams();
    const [errorHttp, setErrorHttp] = useState();
    const [isLoading, setIsLoaading] = useState(false);
    const [rating, setRating] = useState(0);

    const AppCtx = useContext(AppContext);

    // let a = (AppCtx.isLogged === false  ?
    //     <Rating
    //         onClick={ratingChanged}
    //         ratingValue={rating}
    //         size={20}
    //         stars={10}
    //         label
    //         transition
    //         fillColor='orange'
    //         emptyColor='gray'
    //     />: null)


    const ratingChanged = (newRating) => {
        setRating(newRating);
    }

    useEffect(() => {

        const call = async () => {
            setIsLoaading(true);
            const key = process.env.REACT_APP_MOVIE_APP_ID;
            const apiKey = key.replace(/[']+/g, '');

            const response = await fetch(`https://api.themoviedb.org/3/movie/${paramMovie.movieId}?api_key=${apiKey}&language=en-US`);

            if (!response.ok) {
                throw new Error("Fetching went wrong")
            }

            console.log(response);
            const data = await response.json();
            console.log(data);

            setDetails(data);
            setIsLoaading(false);
        }

        call().catch(error => {
            setIsLoaading(false);
            setErrorHttp(error.message);
        })
    }, [])



    return (
        <Fragment>
            <div className='containerRaiting'>
                <div className='contianer'>
               test
                </div>
            </div>
            <div className="containerImage">
                <div className='sectionsContainerImage'>
                    <div className='backdrop'>
                        <img className='img' src={"https://image.tmdb.org/t/p/w200/" + details.poster_path}></img>
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
                        <div class="taglineInfo row ">

                            <h3 >Overview</h3>
                            <h3 class="tagline">{details.tagline}</h3>
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