import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import MovieItem from '../utils/movieItem/MovieItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Movies() {
    const state = useContext(GlobalState)
    const [movies, setMovies] = state.moviesAPI.movies
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.moviesAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        movies.forEach(movie => {
            if(movie._id === id) movie.checked = !movie.checked
        })
        setMovies([...movies])
    }

    const deleteMovie = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteMovie = axios.delete(`/api/movies/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteMovie
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        movies.forEach(movie => {
            movie.checked = !isCheck
        })
        setMovies([...movies])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        movies.forEach(movie => {
            if(movie.checked) deleteMovie(movie._id, movie.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        {
            (isAdmin && movies.length !== 0)&& 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="movies">
            {
                movies.map(movie => {
                    return <MovieItem key={movie._id} movie={movie}
                    isAdmin={isAdmin} deleteMovie={deleteMovie} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {movies.length === 0 && <div className='emptyList'>Movie List is Empty</div> }
        </>
    )
}

export default Movies