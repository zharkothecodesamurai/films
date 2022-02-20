import {useParams} from 'react-router-dom';

const MovieItemDetails=(props)=>{

const paramMovie= useParams();

 return(
     <h1>{paramMovie.movieId}</h1>
 )
}

export default MovieItemDetails