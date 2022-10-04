const Actor = require('../models/actorModel')
const Movies = require('../models/movieModel')

const actorCtrl = {
    getActors: async(req, res) =>{
        try {
            const actors = await Actor.find()
            res.json(actors)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createActor: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update actor
            const {name} = req.body;
            const actor = await Actor.findOne({name})
            if(actor) return res.status(400).json({msg: "This actor already exists."})

            const newActor = new Actor({name})

            await newActor.save()
            res.json({msg: "Created a actor"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteActor: async(req, res) =>{
        try {
            const movies = await Movies.findOne({actor: req.params.id})
            if(movies) return res.status(400).json({
                msg: "Please delete all movies with a relationship."
            })

            await Actor.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Actor"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateActor: async(req, res) =>{
        try {
            const {name} = req.body;
            await Actor.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a actor"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = actorCtrl