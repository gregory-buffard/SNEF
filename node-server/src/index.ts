import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import data from "./data.json";
import Worker from "./schema/workerSchema";
import {Schedule} from "./models/worker";
import {randomInt} from "crypto";
import {supabase} from "./supabaseClient";
import getWorksheet from "./excel/worksheet";

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

app.post("/api/requestFile", (req, res) => {
    if (!req.body || !req.body.name) return res.status(400).send("Missing name");
    const name = req.body.name;
    Worker.findOne({name})
        .then((worker) => {
            if (!worker) return res.status(404).send("Worker not found");
            //file logic
            res.status(200).send(/*file*/);
        })
        .catch((e) => res.status(500).send("Error"));
});

app.post("/api/createWorker", (req, res) => {
    if (!req.body || !req.body.name || !req.body.email)
        return res.status(400).send("Missing name or email");
    Worker.create(req.body)
        .then((worker) => {
            res.status(200).send("Worker created");
        })
        .catch((e) => {
            res.status(500).send("Error");
        });
});

app.listen(5001, () => {
    console.log(`Server is running on port 5001`);
    mongoose
        .connect(data.MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"));
});

app.get("/download", async (req, res) => {
    if (!req.query || !req.query.name) return res.status(400).send("Missing name");
    const name = req.query.name.toString();
    const workbook = await getWorksheet(name);
    const filename = `files/${name}-${new Date().toLocaleDateString()}.xlsx`;
    workbook.write(filename)
    setTimeout(() => {
        res.status(200).download(filename);
        console.log("File sent")

    }, 1000)

});
