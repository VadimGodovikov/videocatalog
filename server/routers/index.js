const Router = require('express')
const router = new Router()
const movieRouters = require('./movieRouters')
const userRouters = require('./userRouters')

router.use('/user', userRouters)
router.use('/movie', movieRouters)

module.exports = router