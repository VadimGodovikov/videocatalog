const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('Users', {
    ID_Usera: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Login: { type: DataTypes.STRING, unique: true },
    Password: { type: DataTypes.STRING },
    Birthday: { type: DataTypes.DATE },
    Email: { type: DataTypes.TEXT, unique: true }
})

const Zhanr = sequelize.define('Zhanrs', {
    nameZhanr: { type: DataTypes.STRING, primaryKey: true }
})

const Request = sequelize.define('Requests', {
    ID_Request: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Filma: { type: DataTypes.INTEGER },
    ID_Usera: { type: DataTypes.INTEGER },
    FilePath: { type: DataTypes.STRING }
})

const Film_Zhanr = sequelize.define('Film_Zhanrs', {
    ID_FilmaZhanr: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameZhanr: { type: DataTypes.STRING },
    ID_Filma: { type: DataTypes.INTEGER }
})

const Film_Person = sequelize.define('Film_Persons', {
    ID_FilmPerson: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Filma: { type: DataTypes.INTEGER },
    ID_Person: { type: DataTypes.INTEGER }
})

const Person = sequelize.define('Persons', {
    ID_Person: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Surname: { type: DataTypes.STRING },
    FirstName: { type: DataTypes.STRING },
    Birthday: { type: DataTypes.DATE },
    Post: { type: DataTypes.STRING },
    Sex: { type: DataTypes.STRING },
    Photo: { type: DataTypes.STRING }
})

const Post = sequelize.define('Posts', {
    namePost: { type: DataTypes.STRING, primaryKey: true }
})

const CareerPerson = sequelize.define('CareerPesons', {
    ID_CareerPerson: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Person: { type: DataTypes.INTEGER },
    namePost: { type: DataTypes.STRING }
})

const Film = sequelize.define('Films', {
    ID_Filma: { type: DataTypes.INTEGER, primaryKey: true },
    Name: { type: DataTypes.STRING },
    DataVihoda: { type: DataTypes.INTEGER },
    AgeRestriction: { type: DataTypes.STRING },
    Description: { type: DataTypes.TEXT },
    Rating: { type: DataTypes.DOUBLE },
    Photo: { type: DataTypes.STRING }
})

const Country = sequelize.define('Countries', {
    nameCountry: { type: DataTypes.STRING, primaryKey: true }
})

const Film_Country = sequelize.define('Film_Countries', {
    ID_FilmCountry: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Filma: { type: DataTypes.INTEGER },
    nameCountry: { type: DataTypes.STRING }
})

Post.hasMany(CareerPerson, { foreignKey: 'namePost' })
CareerPerson.belongsTo(Post, { foreignKey: 'namePost' })

Person.hasMany(CareerPerson, { foreignKey: 'ID_Person' })
CareerPerson.belongsTo(Person, { foreignKey: 'ID_Person' })

Country.hasMany(Film_Country, { foreignKey: 'nameCountry' })
Film_Country.belongsTo(Country, { foreignKey: 'nameCountry' })

Film.hasMany(Film_Country, { foreignKey: 'ID_Filma' })
Film_Country.belongsTo(Film, { foreignKey: 'ID_Filma' })

User.hasMany(Request, { foreignKey: 'ID_Usera' })
Request.belongsTo(User, { foreignKey: 'ID_Usera' })

Zhanr.hasMany(Film_Zhanr, { foreignKey: 'ID_Zhanra' })
Film_Zhanr.belongsTo(Zhanr, { foreignKey: 'ID_Zhanra' })

Person.hasMany(Film_Person, { foreignKey: 'ID_FilmMaker' })
Film_Person.belongsTo(Person, { foreignKey: 'ID_FilmMaker' })

Film.hasMany(Film_Zhanr, { foreignKey: 'ID_Filma' })
Film_Zhanr.belongsTo(Film, { foreignKey: 'ID_Filma' })

Film.hasMany(Request, { foreignKey: 'ID_Filma' })
Request.belongsTo(Film, { foreignKey: 'ID_Filma' })

Film.hasMany(Film_Person, { foreignKey: 'ID_Filma' })
Film_Person.belongsTo(Film, { foreignKey: 'ID_Filma' })

module.exports = {
    User,
    Request,
    Film,
    Zhanr,
    Film_Zhanr,
    Film_Person,
    Person,
    Country,
    Film_Country,
    Post,
    CareerPerson
}