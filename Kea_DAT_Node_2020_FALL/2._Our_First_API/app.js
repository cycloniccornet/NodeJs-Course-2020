const express = require("express");
const app = express();
// const app = require("express")();

const fetch = require("node-fetch");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("<h1>hello</h1>");
});

app.get("/greeting", (req, res) => {
    return res.redirect("/");
});

app.get("/proxy", (req, res) => {
    fetch("http://www.google.com")
        .then(result => result.textConverted())
        .then(body => {
            return res.send(body);
        });
});

app.get("/catfacts", (req, res) => {
    return res.sendFile(__dirname + "/catfacts.html");
});

app.get("/documentation", (req, res) => {
    return res.sendFile(__dirname + "/documentation.html");
});

app.get("/documentation2", (req, res) => {
    return res.sendFile(__dirname + "/documentation2.html");
});

app.get("/me", (req, res) => {
    return res.send({ name: "Anders" });
});

app.get("/time", (req, res) => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return res.send({ time });
});

const months = {
    0: "January",
    1: "February",
    2: "March",
    8: "September"
};

app.get("/month", (req, res) => {
    const date = new Date();
    const month = date.getMonth();
    return res.send({ month: months[month] });
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

app.get("/day", (req, res) => {
    const date = new Date();
    const day = date.getDay();
    return res.send({ day: days[day] });
});

app.get("/querystring", (req, res) => {
    return res.send({ query: req.query });
});

// create a request handler on the path message that takes a path variable
// from the client and returns it directly to the client in the response

app.get("/message/:personalMessage", (req, res) => {
    return res.send({
        message: req.params.personalMessage,
        queryString: req.query
    });
});

app.post("/showmethebody", (req, res) => {
    return res.send(req.body);
});

app.listen(8080, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("Server is running on port", 8080);
});
