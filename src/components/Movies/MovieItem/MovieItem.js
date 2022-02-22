import { Fragment } from "react";
import { Link } from 'react-router-dom';

import "./MovieItem.css"

const MovieItem = props => {


    var date = new Date(props.releaseDate);
    const { id } = props

    let movieItem = null;
    movieItem = (

        <Fragment>
            <tr>
                
                    <th scope="row"><Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: '#8a2b06' }}>{props.identifier}</Link></th>
                
                <td>{props.title}</td>
                <td><img alt="backdrop" src={"https://image.tmdb.org/t/p/w200/" + props.image}></img> </td>
                <td><img alt="poster" className="scale" height='120px' width='100px' src={"https://image.tmdb.org/t/p/w200/" + props.poster}></img></td>
                <td> {date.toDateString()} </td>
                <td> {props.popularity}</td>
            </tr>
        </Fragment>

    )
    return (
        movieItem
    )
}

export default MovieItem