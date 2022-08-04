const express = require("express");

const paragraphInJson= require("./paragraph/paragraph.json")

const app = express();

app.use(express.static("./public"));

app.get("/paragraphs", (req, res) => {
    let data = paragraphInJson[0];
    res.json(data);
})

module.exports = app;