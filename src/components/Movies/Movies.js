import { Fragment } from "react"
import MoviesListView from "./MoviesListView"
import MoviesSummary from "./MoviesSummary"

const  Movies= () => {
    return <Fragment>
        <MoviesSummary/>
        <MoviesListView/>
    </Fragment>
}

export default Movies