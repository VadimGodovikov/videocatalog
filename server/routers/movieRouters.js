const Router = require('express')
const router = new Router()
const movieControllers = require('../controllers/movieControllers')

router.post('/upload', movieControllers.createPars)
router.get('/films/:userId', movieControllers.getAll)
router.get('/film/:userId/:filmId', movieControllers.getOne)

module.exports = router