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

class PersonController {
    async getPersonFilm(req, res) {
        const filmId = req.params.filmId;
        try {
            const persons = await Person.findAll({
                include: [{
                    model: Film,
                    through: {
                        where: { ID_Filma: filmId }
                    },
                    required: true
                }]
            });
            res.json(persons);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ошибка сервера')
        }
    }
    async getPerson(req, res) {
        const personId = req.params.personId;
        try {
            const person = await Person.findOne({
                where: { ID_Person: personId }
            });
            res.json(person);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ошибка сервера')
        }
    }

    async getFilmTop(req, res) {
        const personId = req.params.personId;
        const userId = req.params.userId;
        try {
            const films = await Film.findAll({
                include: [{
                    model: Person,
                    where: { ID_Person: personId }
                }, {
                    model: Request,
                    where: { ID_Usera: userId }
                }],
                order: [['Rating', 'DESC']],
                limit: 5
            });
            res.json(films);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ошибка сервера');
        }
    }

    async getAllFilmPerson(req, res) {
        const personId = req.params.personId;
        const userId = req.params.userId;
        try {
            const films = await Film.findAll({
                include: [{
                    model: Person,
                    where: { ID_Person: personId }
                }, {
                    model: Request,
                    where: { ID_Usera: userId }
                }],
                order: [['Rating', 'DESC']]
            });
            res.json(films);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ошибка сервера');
        }
    }
}

module.exports = new PersonController()