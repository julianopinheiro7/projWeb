const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
//middlewares
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: 'abc123',
//     port: 3306,
//     database: 'projweb'
// }, 'single'));

//routes

app.listen(app.get('port'), () => {
    console.log('Servidor OnLine na porta 3000');
});

app.get('/registro', (req, res) => {
    res.render('login');
})

app.post('/cadastro', (req, res) => {
    const usuario = req.body;

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        port: 3306,
        database: 'projweb'
    })

    conn.query('insert into users set ?', usuario, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Deu certo pô!');

        res.send("ok");
    })

})