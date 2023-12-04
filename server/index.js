require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработка ошибок, послдений Middleware
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порте ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start()