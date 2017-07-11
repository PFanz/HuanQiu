const express = require('express')
const path = require('path')

const app = express()

const indexRouter = require('./server/router/index')

// app.set('views', path.join(__dirname, 'client/views'))
// app.set('view engine', 'ejs')

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter)
app.use(express.static(path.join(__dirname, 'client')))

app.listen(8080)