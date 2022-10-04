import {useState, useEffect} from 'react'
import axios from 'axios'

function ActorsAPI() {
    const [actors, setActors] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getActors = async () =>{
            const res = await axios.get('/api/actor')
            setActors(res.data)
        }

        getActors()
    },[callback])
    return {
        actors: [actors, setActors],
        callback: [callback, setCallback]
    }
}

export default ActorsAPI