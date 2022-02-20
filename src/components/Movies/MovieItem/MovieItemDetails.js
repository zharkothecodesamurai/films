import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./MovieItemDetails.css"

const MovieItemDetails = (props) => {
    const [details, setDetails] = useState({});
    const paramMovie = useParams();
    const [errorHttp, setErrorHttp] = useState();
    const [isLoading, setIsLoaading] = useState(false);

    const { id } = paramMovie.movieId

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
            <div className="container2">
                <div className='sectionsContainer'>
                    <div>
                        <img src={"https://image.tmdb.org/t/p/w200/" + details.poster_path}></img>
                    </div>
                </div>
                <div className='sectionsContainer'>
                    <div className='row'><div className='col'><p >Title : <span>{details.title}</span></p></div>
                        <div className='col'><p >Budget : <span>{details.budget}</span></p></div>
                        <div className='col'> <p>Vote status : <span>{details.vote_average}</span></p></div>
                        <div className='col'><p >Revenue : <span>{details.revenue}</span></p></div></div>





                    <div class="taglineInfo">

                        <h3 class="tagline" dir="auto">{details.tagline}</h3>


                        <h3 >Overview</h3>
                        <div>

                            <p>{details.overview}</p>

                        </div>




                    </div>
                    {/* OverView : <span>{details.title}</span>
                   Rezhiser : <span>{details.title}</span>
                   Title : <span>{details.title}</span> */}
                </div>
                <div>

                </div>
            </div>
        </Fragment>
    )
}

export default MovieItemDetails