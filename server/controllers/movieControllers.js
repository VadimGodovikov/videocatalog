const { Film } = require('../models/models')
const { Zhanr } = require('../models/models')
const { Person } = require('../models/models')
const { Film_Person } = require('../models/models')
const { Country } = require('../models/models')
const { Film_Country } = require('../models/models')
const { Film_Zhanr } = require('../models/models')
const { Request } = require('../models/models')
const { User } = require('../models/models')
const ApiError = require('../error/ApiError')

//const token = "6BPY2WX-2RMM7RA-NZW601H-8CC689V"

class MovieController {
  async createPars(req, res, next) {
    try {
      const { ID_Usera, FilePath, ID_Filma, Name, DataVihoda, AgeRestriction, Description, Rating, Photo, nameCountry, nameZhanr } = req.body

      // Проверка на существование ID_Filma
      const existingFilm = await Film.findOne({ where: { ID_Filma } })
      if (!existingFilm) {
        const film = await Film.create({
          ID_Filma,
          Name,
          DataVihoda,
          AgeRestriction,
          Description,
          Rating,
          Photo
        })
        
        const existingZhanr = await Zhanr.findOne({ where: { nameZhanr } })
        let zhanr
        if (!existingZhanr) {
          zhanr = await Zhanr.create({
            nameZhanr
          })
        } else {
          zhanr = existingZhanr
        }

        const existingCountry = await Country.findOne({ where: { nameCountry } })
        let country
        if (!existingCountry) {
          country = await Country.create({
            nameCountry
          })
        } else {
          country = existingCountry
        }

        const filmZhanr = await Film_Zhanr.create({
          nameZhanr: zhanr.nameZhanr,
          ID_Filma
        })

        const filmCountry = await Film_Country.create({
          ID_Filma,
          nameCountry
        })

        const request = await Request.create({
          ID_Usera,
          ID_Filma,
          FilePath,
        })

        return res.json({ film, zhanr, filmZhanr, country, filmCountry, request })
      } else {
        const request = await Request.create({
          ID_Usera,
          ID_Filma,
          FilePath,
        })

        return res.json({ request })
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res) {
    const userId = req.params.userId;

    try {
      const films = await Film.findAll({
        include: [{ model: Film_Zhanr, include: [{ model: Zhanr }] },
        { model: Film_Country, include: [{ model: Country }] },
        { model: Request, where: { ID_Usera: userId } }]
      });
      res.json(films);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
  async getZhanr(req, res) {

  }
  async getOne(req, res) {

  }

}

module.exports = new MovieController()