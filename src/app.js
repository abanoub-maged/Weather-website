const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();

const publicdirpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialpath);

app.use(express.static(publicdirpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "bobba",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "bobba A",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "bobba H",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a place",
    });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return console.log(error);
      }
      forecast(data.loc, (error, forecastdata) => {
        if (error) {
          return console.log(error);
        }
        console.log(data.loc);
        console.log(forecastdata);
        res.send({
          forecast: forecastdata,
          address: req.query.address,
        });
      });
    });
  }
});

const a = 1;

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bobbaaa",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bobbaa",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
