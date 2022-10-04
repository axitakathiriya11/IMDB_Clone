import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import MovieItem from '../utils/movieItem/MovieItem'


function DetailMovie() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [movies] = state.moviesAPI.movies
    const [detailMovie, setDetailMovie] = useState([])

    useEffect(() =>{
        if(params.id){

            movies.forEach(movie => {
                if(movie._id === params.id) setDetailMovie(movie)
            })
        }
    },[params.id, movies])

    if(detailMovie.length === 0) return null;

    let movieList;
    if(movies.length > 0) {
        movieList = movies.filter((movie) =>{
            return movie.actor.includes(detailMovie.actor);
        })
    }


    return (
        <>
            <div className="detail">
                <img src={detailMovie.images.url} alt="" />
                <div className="box-detail">
                    <h2>{detailMovie.title}</h2>
                    <span style={{color: 'crimson'}}>{detailMovie.year}</span>
                    <p>{detailMovie.plot}</p>
                </div>
            </div>

            <div>
                <h2>Related movies</h2>
                <div className="movies">
                    {


                        movies.map(movie => {
                            return movie.actor === detailMovie.actor 
                                ? <MovieItem key={movie._id} movie={movie} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailMovie