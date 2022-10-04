import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({movie, deleteMovie}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteMovie(movie._id, movie.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_movie/${movie._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_view" to={`/detail/${movie._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender