const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const helmet = require("helmet");
app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const collegesRouter = require('./routes/colleges');

const port = 4000

app.use('/api', collegesRouter);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/collegemap'); // connect to our database

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
