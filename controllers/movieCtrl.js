const Movies = require('../models/movieModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const movieCtrl = {
    getMovies: async(req, res) =>{
        try {
            const features = new APIfeatures(Movies.find(), req.query)
            .filtering().paginating()

            const movies = await features.query

            res.json({
                status: 'success',
                result: movies.length,
                movies: movies
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createMovies: async(req, res) =>{
        try {
            const {movie_id, title, year, plot, images, actor} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const movie = await Movies.findOne({movie_id})
            if(movie)
                return res.status(400).json({msg: "This movie already exists."})

            const newMovie = new Movies({
                movie_id: new Date(), title: title.toLowerCase(), year, plot, images, actor
            })

            await newMovie.save()
            res.json({msg: "Created a movie"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteMovies: async(req, res) =>{
        try {
            await Movies.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Movie"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMovies: async(req, res) =>{
        try {
            const {title, year, plot, images, actor} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Movies.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), year, plot, images, actor
            })

            res.json({msg: "Updated a Movie"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = movieCtrl