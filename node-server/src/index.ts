import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import data from "./data.json";
import Worker from "./schema/workerSchema";
import {Schedule} from "./models/worker";


const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post("/api/requestFile", (req, res) => {
    if (!req.body || !req.body.name) return res.status(400).send("Missing name");
    const name = req.body.name;
    Worker.findOne({name}).then(
        (worker) => {
            if (!worker) return res.status(404).send("Worker not found");
            //file logic
            res.status(200).send(/*file*/);

        }
    ).catch(e=>
        res.status(500).send("Error")
    )
});

app.post("/api/createWorker", (req, res) => {
    if (!req.body || !req.body.name || !req.body.email) return res.status(400).send("Missing name or email");
    Worker.create(req.body).then(
        (worker) => {
            res.status(200).send("Worker created");
        }).catch(e => {
            res.status(500).send("Error");
    })
});

app.post("/api/updateWorker", (req, res) => {
    console.log(req.body)
    if (!req.body || !req.body.name || !req.body.date  || !req.body.workDone || !req.body.workDone.place || !req.body.workDone.timeInMin) return res.status(400).send("Missing data");
    const name = req.body.name as string;
    const schedule = req.body.workDone as Schedule | Schedule[];
    Worker.updateOne({name}, {$push: {schedule}}).then(
        (worker) => {
            res.status(200).send("Worker updated");
        }
    ).catch(e => {
        res.status(500).send("Error");
    })
});

app.listen(5000, () => {
    console.log(`Server is running`);
    mongoose.connect(data.MONGODB_URI).then(r =>
        console.log("Connected to MongoDB")
    );
});
