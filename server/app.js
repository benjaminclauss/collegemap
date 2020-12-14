const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const helmet = require("helmet");
app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://collegemap-client.herokuapp.com/*'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const mongoose = require('mongoose');
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/collegemap';
mongoose.connect(url); // connect to our database

const collegesRouter = require('./routes/colleges');

app.use('/api', collegesRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
