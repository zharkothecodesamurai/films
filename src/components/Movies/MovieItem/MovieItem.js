import { Fragment } from "react";
import { NavLink } from 'react-router-dom';

import "./MovieItem.css"

const MovieItem = props => {


    var date = new Date(props.releaseDate);
    const { id } = props

    let movieItem = null;
    movieItem = (

        <Fragment>
            <tr>
                <NavLink to={`/movie/${id}`} style={{ textDecoration: 'none', color: '#8a2b06' }}>
                    <th scope="row">{props.identifier}</th>
                </NavLink>
                <td>{props.title}</td>
                <td><img src={"https://image.tmdb.org/t/p/w200/" + props.image}></img> </td>
                <td><img className="scale" height='120px' width='100px' src={"https://image.tmdb.org/t/p/w200/" + props.poster}></img></td>
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