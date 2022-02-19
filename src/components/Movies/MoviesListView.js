import { Fragment, useEffect, useState,useContext } from "react";
import Card from "../UI/Card"
import MovieItem from "./MovieItem/MovieItem";
import "./MovieListView.css";

import AppContext from "../../store/app-context";

const MoviesListView = () => {
    const [errorHttp, setErrorHttp] = useState();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoaading] = useState(false);

    const appContext = useContext(AppContext);
    const {isLogged} = appContext
    useEffect(() => {

        const call = async () => {
            setIsLoaading(true);
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0b1f1cfedf248f6eeeae23f5d5c24190');

            if (!response.ok) {
                throw new Error("Fetching went wrong")
            }

            console.log(response);
            const data = await response.json();
            console.log(data);

            let responseData = [];
            let { results } = data

            for (let item of results) {
                responseData.push({
                    id: item.id,
                    title: item.title,
                    image: item.backdrop_path,
                    poster: item.poster_path,
                    releaseDate: item.release_date,
                    popularity: item.popularity
                })
            }

            setMovies(responseData);
            setIsLoaading(false);
        }

        call().catch(error => {
            setIsLoaading(false);
            setErrorHttp(error.message);
        })
    }, [])

    let movieItem = movies.map((movie, index) => (
        <MovieItem key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            poster={movie.poster}
            releaseDate={movie.releaseDate}
            popularity={movie.popularity}
            identifier={index}
        />))

    let movieListView = (
        <div>
            <table className="Table">
                <caption><h3>Most Popular Movies</h3></caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" >Title</th>
                        <th scope="col" >Image</th>
                        <th scope="col" >Poster</th>
                        <th scope="col" >Date Release</th>
                        <th scope="col" >Popularity</th>
                    </tr>
                </thead>

                <tbody >


                    {movieItem}

                </tbody>



            </table>
        </div>
    )










    return (
        <Fragment>
            <section className="movies">
                <Card>
                    {movieListView}
                </Card>
            </section>

        </Fragment>
    )
}

export default MoviesListView;