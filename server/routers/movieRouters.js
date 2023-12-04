const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieControllers')
const movieControllers = require('../controllers/movieControllers')

router.post('/', movieController.createPars)
router.get('/', movieControllers.getAll)
router.get('/:zhanr', movieControllers.getZhanr)
router.get('/:id', movieControllers.getOne)

module.exports = router