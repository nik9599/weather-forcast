const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geolocation = require("../src/utils/geocode");
const weather = require("../src/utils/weather");

const app = express();

console.clear();

//Define path for EXPRESS config
const publicPathDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup static directory to serve
app.use(express.static(publicPathDirectory));

//Setup Handelbar Engine & view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Hi weather",
    name: "developed by Nikhil",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "developed by Nikhil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "developed by Nikhil",
  });
});

app.get("/weather", (req, res) => {
  
  let location1 = req.query.addres

  if (!req.query.addres) {
    location1= 'delhi'
  }
  
  geolocation(
    location1,
    (err, { latitude, longitude, location } ) => {
      if (err) {
        return res.send({
          err,
        });
      }

      weather(latitude, longitude, (err, { temperature, precipetate }) => {
        if (err) {
          return res.send({
            error: err,
          });
        }
        //
        res.send({
          temperature:
            "Outside temperature " +
            temperature +
            " & chance of raining " +
            precipetate * 10 +
            "%",
          location: location,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not found",
    name: "server crash",
  });
});

app.listen(3000, () => {
  console.log("Server Starting");
});
