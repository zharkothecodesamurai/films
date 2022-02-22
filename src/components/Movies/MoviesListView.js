import { Fragment, useEffect, useState } from "react";
import Card from "../UI/Card"
import MovieItem from "./MovieItem/MovieItem";
import Modal from "../UI/Modal";
import ErrorComponent from "../UI/ErrorComponent";
import "./MovieListView.css";


import Pagination from "../UI/Pagination";
import MovieListViewTable from "./MovieListViewTable";

const MoviesListView = () => {
    const [errorHttp, setErrorHttp] = useState();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoaading] = useState(false);
    const [paginationPage, setPaginationPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const call = async () => {
            setIsLoaading(true);
            const key = process.env.REACT_APP_MOVIE_APP_ID;
            const apiKey = key.replace(/[']+/g, '');
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${paginationPage}`);

            if (!response.ok) {
                throw new Error("Fetching went wrong")
            }

            const data = await response.json();

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
    }, [paginationPage])

    const errorHandler = () => {
        setErrorHttp();
    }


    const currentPageChangeHandler = (currentPage) => {
        setPaginationPage(currentPage)
    }

    let movieListView = (movies.length > 0 ? (
        <Pagination
            data={movies}
            RenderComponent={MovieItem}
            RenderComponentWrapper={MovieListViewTable}
            title="Movies"
            pageLimit={5}
            dataLimit={20}
            onCurrentPageChange={currentPageChangeHandler} />
    ) : (
        <h1>No Posts to display</h1>
    ))

    const handleOnChangeSerch = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_APP_ID}&language=en-US&query=${searchTerm}&include_adult=false`
        
        if(searchTerm){
            let results=[];
            fetch(url).then(res => res.json()).then(data => data.results.forEach(item => {
                results.push({
                    id: item.id,
                    title: item.title,
                    image: item.backdrop_path,
                    poster: item.poster_path,
                    releaseDate: item.release_date,
                    popularity: item.popularity
                })
                setMovies(results);
            })          
            )
            
            setSearchTerm('')
        }   
    }

    return (
        <Fragment>
            {errorHttp && <Modal onHide={errorHandler}>
                <ErrorComponent errorMessage={errorHttp}></ErrorComponent>
            </Modal>}
            <div className="searchWrapper">
                <form onSubmit={handleSearchSubmit}>
                    <input type={"search"}
                     placeholder={"Search movie..."}
                      className="search"
                      value={searchTerm}
                      onChange={handleOnChangeSerch}></input>
                </form>
            </div>
            <section className="movies">
                <Card>
                    {movieListView}
                </Card>
            </section>

        </Fragment>
    )
}

export default MoviesListView;