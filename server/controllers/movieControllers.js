const {Film} = require('../models/models')
const {Zhanr} = require('../models/models')
const {FilmMaker} = require('../models/models')
const {Actor} = require('../models/models')
const {Film_Actor} = require('../models/models')
const {Film_FilmMaker} = require('../models/models')
const {Film_Zhanr} = require('../models/models')
const {Request} = require('../models/models')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')

//const token = "6BPY2WX-2RMM7RA-NZW601H-8CC689V"

class MovieController {
    async createPars(req, res, next){
        try {
          const {Name, DataVihoda, Country, AgeRestriction, Description, Rating, Photo} = req.body
          const film = await Film.create({
            Name,
            DataVihoda,
            Country,
            AgeRestriction,
            Description,
            Rating,
            Photo,
            // Другие необходимые свойства
          })
          return res.json(film)
        } catch (error) {
          next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res){
        const films = await Film.findAll()
        return res.json(films)
    }
    async getZhanr(req, res){
        
    }
    async getOne(req, res){

    }

}

module.exports = new MovieController()