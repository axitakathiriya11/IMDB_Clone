const router = require('express').Router()
const actorCtrl = require('../controllers/actorCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/actor')
    .get(actorCtrl.getActors)
    .post(auth, authAdmin, actorCtrl.createActor)

router.route('/actor/:id')
    .delete(auth, authAdmin, actorCtrl.deleteActor)
    .put(auth, authAdmin, actorCtrl.updateActor)


module.exports = router