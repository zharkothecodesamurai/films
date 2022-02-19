import { Fragment } from "react";
import "./MovieItem.css"

const MovieItem = props => {
  
    var date = new Date(props.releaseDate);
    let MovieItem = null;
    MovieItem = (
        <Fragment>
            <tr>
                <th scope="row">{props.identifier}</th>
                    <td>{props.title}</td>
                    <td><img  src={"https://image.tmdb.org/t/p/w200/"+props.image}></img> </td>
                    <td><img className="scale" height='120px' width='100px' src={"https://image.tmdb.org/t/p/w200/"+props.poster}></img> </td>
                    <td> {date.toDateString()} </td>
                    <td> {props.popularity}</td>           
            </tr>
        </Fragment>

    )
    return (
        MovieItem
    )
}

export default MovieItem