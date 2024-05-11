const Router = require('express')
const router = new Router()
const movieRouters = require('./movieRouters')
const userRouters = require('./userRouters')
const personRouters = require('./personRouters')

router.use('/user', userRouters)
router.use('/movie', movieRouters)
router.use('/person', personRouters)

module.exports = router