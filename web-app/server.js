var PORT = process.env.PORT || 5500;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.listen(PORT, () => {
    console.log("listening at http://localhost:5500")
});
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/',(req, res) => {
    console.log('a get to the /reset-password route was hit', req.query.access_token);
    if (!req.query.access_token) return res.sendStatus(401);
    res.sendFile('public/index.html', {root: __dirname })
});

app.use(express.static('public'));
