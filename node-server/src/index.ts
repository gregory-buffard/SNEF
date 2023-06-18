import express from "express";
import bodyParser from "body-parser";
import data from "./data.json";
import getWorksheet from "./excel/worksheet";
import { getWeekNumber } from "./WeekCal";
import Worker from "./schema/Worker";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/schedule", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.schedule)
    return res.status(400).send("Missing name or schedule");
  const name = req.body.name.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const schedule = req.body.schedule;
  Worker.findOne({ name: name })
    .then((worker) => {
      if (!worker) return res.status(400).send("Worker not found (huh?)");
      worker.schedule = schedule;
      worker.week = getWeekNumber(new Date());
      worker.save().then((worker) => {
        return res.status(200).send(worker);
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error");
    });
});

app.get("/worker", async (req, res) => {
  if (!req.query || !req.query.name)
    return res.status(400).send("Missing name");
  const name = req.query.name.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  Worker.findOne({ name: name })
    .then((worker) => {
      if (worker) {
        return res.status(200).send(worker);
      } else throw new Error("Worker not found");
    })
    .catch(async (err) => {
      console.error(err);
      if (err.message === "Worker not found") {
        await Worker.create({
          name: name,
          week: getWeekNumber(new Date()),
        })
          .then((worker) => {
            return res.status(200).send(worker);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).send("Internal server error");
          });
      } else return res.status(500).send("Internal server error");
    });
});

app.get("/download", async (req, res) => {
  if (!req.query || !req.query.name)
    return res.status(400).send("Missing name");
  const name = req.query.name.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const properName = req.query.name.toString();
  const workers = [];
  if (name.includes(",")) {
    const names = name.split(", ");
    for (let i = 0; i < names.length; i++) {
      const worker = await Worker.findOne({ name: names[i] });
        if (!worker) return res.status(404).send("Worker not found");
        workers.push(worker);
    }
  } else {
    const worker = await Worker.findOne({ name: name });
    if (!worker) return res.status(404).send("Worker not found");
    workers.push(worker);
  }
  const workbook = await getWorksheet(properName, workers);
  const currentDate: string =
    new Date().getDate() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getFullYear();
  const filename = `files/Feuille de pointage ${properName} (${currentDate}).xlsx`;
  workbook.write(filename);
  setTimeout(() => {
    res.status(200).download(filename);
    console.log("File sent");
  }, 1000);
});

app.listen(5001, () => {
  console.log(`Server is running on port 5001`);
  mongoose.connect(data.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
  });
});
