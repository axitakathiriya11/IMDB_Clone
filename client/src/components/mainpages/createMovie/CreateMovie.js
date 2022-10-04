import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useNavigate, useParams} from 'react-router-dom'

const initialState = {
    movie_id: '',
    title: '',
    year: '',
    plot: '',
    actor: '',
    _id: ''
}

function CreateMovie() {
    const state = useContext(GlobalState)
    const [movie, setMovie] = useState(initialState)
    const [actors] = state.actorsAPI.actors
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const navigate = useNavigate()
    const param = useParams()

    const [movies] = state.moviesAPI.movies
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.moviesAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            movies.forEach(movie => {
                if(movie._id === param.id) {
                    setMovie(movie)
                    setImages(movie.images)
                }
            })
        }else{
            setOnEdit(false)
            setMovie(initialState)
            setImages(false)
        }
    }, [param.id, movies])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setMovie({...movie, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/movies/${movie._id}`, {...movie, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/movies', {...movie, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            navigate("/movies")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_movie">
        
            <div className="upload">
                
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>
                   
                    :<div id="file_img" style={styleUpload}>
                        
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="title">Name</label>
                    <input type="text" name="title" id="title" required
                    value={movie.title} onChange={handleChangeInput} />
                </div>

                <br/>

                <div className="row">
                    <label htmlFor="year">Year of Release</label>
                    <input type="text" name="year" id="year" required
                    value={movie.year} onChange={handleChangeInput} />
                </div>

                <br/>

                <div className="row">
                    <label htmlFor="plot">Plot</label>
                    <textarea type="text" name="plot" id="plot" required
                    value={movie.plot} rows="5" onChange={handleChangeInput} />
                </div>

                <br/>
    
                <div className="row">
                    <label htmlFor="actors">Actors: </label>
                    <select name="actor" value={movie.actor} onChange={handleChangeInput} >
                        <option value="">Please select a actor</option>
                        {
                            actors.map(actor => (
                                <option value={actor._id} key={actor._id}>
                                    {actor.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <br/>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateMovie