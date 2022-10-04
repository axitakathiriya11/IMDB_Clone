const router = require('express').Router()
const movieCtrl = require('../controllers/movieCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/movies')
    .get(movieCtrl.getMovies)
    .post(auth, authAdmin, movieCtrl.createMovies)


router.route('/movies/:id')
    .delete(auth, authAdmin, movieCtrl.deleteMovies)
    .put(auth, authAdmin, movieCtrl.updateMovies)



module.exports = router