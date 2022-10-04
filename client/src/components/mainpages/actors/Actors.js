import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Actors() {
    const state = useContext(GlobalState)
    const [actors] = state.actorsAPI.actors
    const [actor, setActor] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.actorsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createActor = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/actor/${id}`, {name: actor}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/actor', {name: actor}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setActor('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editActor = async (id, name) =>{
        setID(id)
        setActor(name)
        setOnEdit(true)
    }

    const deleteActor = async id =>{
        try {
            const res = await axios.delete(`/api/actor/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="actors">
            <form onSubmit={createActor}>
                <label htmlFor="actor">Actor</label>
                <input type="text" name="actor" value={actor} required
                onChange={e => setActor(e.target.value)} />

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
            <br/>
            <div className="col">
                {
                    actors.map(actor => (
                        <div className="row" key={actor._id}>
                            <p>{actor.name}</p>
                            <div>
                                <button onClick={() => editActor(actor._id, actor.name)}>Edit</button>
                                <button onClick={() => deleteActor(actor._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Actors