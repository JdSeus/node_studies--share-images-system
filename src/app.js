let express = require("express");
let app = express();
let mongoose = require("mongoose");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/guiapics", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Conectado com o banco");
    }).catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.json({});
})

module.exports = app;