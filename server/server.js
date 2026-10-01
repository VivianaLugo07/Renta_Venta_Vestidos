//Código del servidor
require('dotenv').config()
const express = require('express') //constante express que vamos a requerir
const mysql = require('mysql') //constante mysql que vamos a requerir
const myconn = require('express-myconnection') //constante myConnection que vamos a requerir
const userstypes = require('./routes/userstypesRoutes')
// const users = require('./routes/usersRoutes')


const app = express() //constante app que va a ejecutar express
app.set('port', process.env.PORT || 9000) //metodo express que será ejecutado en el puerto 9000
const dbOptiones = { //constante dbOptions que va a contener la configuracion de la base de datos
    host: process.env.DB_HOST, //host de la base de datos
    port: process.env.DB_PORT, //puerto de la base de datos
    user: process.env.DB_USER, //usuario de la base de datos
    password: process.env.DB_PASSWORD, //contraseña de la base de datos
    database: process.env.DB_NAME //nombre de la base de datos  
}


//middlewares-------------------------------
app.use(myconn(mysql, dbOptiones, 'single')) //metodo express  nos permite usar la conexion a la base de datos
app.use(express.json())

// ruoules-------------------------------
app.use('/api/userstypes', userstypes)

app.get('/', (req, res) => { //metodo express que nos permite hacer una peticion get
    res.send('Welcome to my API') //mensaje que nos permite saber si la peticion get funciona
})

//server running
app.listen(app.get('port'), () => {

    console.log('Servidor escuchando en el puerto', app.get('port'))

})