const Router = require('express')
const router = new Router()
const personController = require('../controllers/personControllers')

router.get('/persons/:filmId', personController.getPersonFilm)
router.get('/:personId', personController.getPerson)
router.get('/film/top/:personId/:userId', personController.getFilmTop)
router.get('/film/:personId/:userId', personController.getAllFilmPerson)

module.exports = router