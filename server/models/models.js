const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('Users', {
    ID_Usera: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Login: {type: DataTypes.STRING, unique: true},
    Password: {type: DataTypes.STRING},
    Birthday: {type: DataTypes.DATE},
    Email: {type: DataTypes.TEXT, unique: true}
})

const Zhanr = sequelize.define('Zhanrs', {
    ID_Zhanra: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING}
})

const Request = sequelize.define('Requests', {
    ID_Request: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Filma: {type: DataTypes.INTEGER},
    ID_Usera: {type: DataTypes.INTEGER},
    FilePath: {type: DataTypes.STRING}
})

const Film_Zhanr = sequelize.define('Film_Zhanrs', {
    ID_FilmaZhanr: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Zhanra: {type: DataTypes.INTEGER},
    ID_Filma: {type: DataTypes.INTEGER}
})

const Film_FilmMaker = sequelize.define('Film_FilmMakers', {
    ID_FilmFMaker: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Filma: {type: DataTypes.INTEGER},
    ID_FilmMaker: {type: DataTypes.INTEGER}
})

const Film_Actor = sequelize.define('Film_Actors', {
    ID_FilmActor: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ID_Actora: {type: DataTypes.INTEGER},
    ID_Filma: {type: DataTypes.INTEGER}
})

const FilmMaker = sequelize.define('Film_Makers', {
    ID_FilmMaker: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Surname: {type: DataTypes.STRING},
    FirstName: {type: DataTypes.STRING},
    Birthday: {type: DataTypes.DATE},
    Post: {type: DataTypes.STRING},
    Sex: {type: DataTypes.STRING},
    Photo: {type: DataTypes.STRING}
})

const Film = sequelize.define('Films', {
    ID_Filma: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name: {type: DataTypes.STRING},
    DataVihoda: {type: DataTypes.INTEGER},
    Country: {type: DataTypes.STRING},
    AgeRestriction: {type: DataTypes.STRING},
    Description: {type: DataTypes.TEXT},
    Rating: {type: DataTypes.DOUBLE},
    Photo: {type: DataTypes.STRING}
})

const Actor = sequelize.define('Actors', {
    ID_Actora: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Surname: {type: DataTypes.STRING},
    FirstName: {type: DataTypes.STRING},
    Birthday: {type: DataTypes.DATE},
    Sex: {type: DataTypes.STRING},
    Photo: {type: DataTypes.STRING}
})

User.hasMany(Request, {foreignKey: 'ID_Usera'})
Request.belongsTo(User, {foreignKey: 'ID_Usera'})

Zhanr.hasMany(Film_Zhanr, {foreignKey: 'ID_Zhanra'})
Film_Zhanr.belongsTo(Zhanr, {foreignKey: 'ID_Zhanra'})

Actor.hasMany(Film_Actor, {foreignKey: 'ID_Actora'})
Film_Actor.belongsTo(Actor, {foreignKey: 'ID_Actora'})

FilmMaker.hasMany(Film_FilmMaker, {foreignKey: 'ID_FilmMaker'})
Film_FilmMaker.belongsTo(FilmMaker, {foreignKey: 'ID_FilmMaker'})

Film.hasMany(Film_Zhanr, {foreignKey: 'ID_Filma'})
Film_Zhanr.belongsTo(Film, {foreignKey: 'ID_Filma'})

Film.hasMany(Request, {foreignKey: 'ID_Filma'})
Request.belongsTo(Film, {foreignKey: 'ID_Filma'})

Film.hasMany(Film_Actor, {foreignKey: 'ID_Filma'})
Film_Actor.belongsTo(Film, {foreignKey: 'ID_Filma'})

Film.hasMany(Film_FilmMaker, {foreignKey: 'ID_Filma'})
Film_FilmMaker.belongsTo(Film, {foreignKey: 'ID_Filma'})

module.exports = {
    User,
    Request,
    Film,
    Zhanr,
    Film_Zhanr,
    Film_Actor,
    Film_FilmMaker,
    FilmMaker,
    Actor
}