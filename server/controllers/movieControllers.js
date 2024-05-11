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

const { Op } = require('sequelize');

class MovieController {
  async createPars(req, res, next) {
    try {
      const { ID_Usera, FilePath, ID_Filma, Name, DataVihoda, AgeRestriction, Description, Rating, Photo, nameCountry, nameZhanr, persons } = req.body

      // проверка на существование фильма
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
          FilePath
        })

        if (persons && persons.length > 0) {
          for (let person of persons) {
            try {
              let filmPerson;
              const { ID_Person, Name, Photo, Post } = person;
              const existingPerson = await Person.findOne({ where: { ID_Person: person.id } });
              
              let newPerson;
              
              if (!existingPerson) {
                newPerson = await Person.create({
                  ID_Person: person.id,
                  Name: person.name,
                  Photo: person.photo,
                  Post: person.profession
                });
              } else {
                newPerson = existingPerson;
              }
              filmPerson = await Film_Person.create({
                ID_Filma: film.ID_Filma,
                ID_Person: newPerson.ID_Person
              });
            } catch (error) {
              console.log(error)
            }
          }
        }

        return res.json({ persons, film, zhanr, filmZhanr, country, filmCountry, request })
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
    const { name, zhanr, year, rating, country } = req.query;

    try {
      const films = await Film.findAll({
        include: [
          {
            model: Film_Zhanr,
            include: [{ model: Zhanr }],
            where: {
              nameZhanr: {
                [Op.like]: `%${zhanr}%`
              }
            }
          },
          {
            model: Film_Country,
            include: [{ model: Country }],
            where: {
              nameCountry: {
                [Op.iLike]: `%${country}%`
              }
            }
          },
          { model: Request, where: { ID_Usera: userId } }
        ],
        where: {
          Name: {
            [Op.iLike]: `%${name}%`
          },
          ...year && {
            DataVihoda: year
          },
          ...rating && {
            Rating: {
              [Op.gte]: rating
            }
          }
        }
      });
      res.json(films);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  }
  async getOne(req, res) {
    const filmId = req.params.filmId;
    const userId = req.params.userId;
    try {
      const film = await Film.findOne({
        where: { ID_Filma: filmId },
        include: [
          { model: Film_Zhanr, include: [{ model: Zhanr }] },
          { model: Film_Country, include: [{ model: Country }] },
          { model: Request, where: { ID_Usera: userId } }
        ]
      });
      res.json(film);
    } catch (error) {
      console.log(error);
      res.status(500).send('Ошибка сервера');
    }
  }

}

module.exports = new MovieController()