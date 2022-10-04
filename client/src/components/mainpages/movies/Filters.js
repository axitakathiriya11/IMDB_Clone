import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [actors] = state.actorsAPI.actors

    const [actor, setActor] = state.moviesAPI.actor
    const [sort, setSort] = state.moviesAPI.sort
    const [search, setSearch] = state.moviesAPI.search


    const handleActor = e => {
        setActor(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="actor" value={actor} onChange={handleActor} >
                    <option value=''>All Actors</option>
                    {
                        actors.map(actor => (
                            <option value={"actor=" + actor._id} key={actor._id}>
                                {actor.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

        </div>
    )
}

export default Filters