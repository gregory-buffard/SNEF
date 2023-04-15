import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import data from "./data.json";
import Worker from "./schema/workerSchema";
import {Schedule} from "./models/worker";

const xl = require("excel4node");

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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});

const worksheet = (): any => {
  //Dataset assignment :
  const Attendance: any[][] = [
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    [
      [30, 25, 20, 15, 50],
      [50, 50, 20, 35, 5],
      [30, 25, 20, 15, 50],
      [50, 50, 20, 35, 5],
      [30, 25, 20, 15, 50],
      [50, 50, 20, 35, 5],
      [30, 25, 20, 15, 50],
    ],
  ];
  const Vehicle: any[][] = [
    ["Rented", "Service"],
    ["15F651D8F", 69],
  ];

  //Excel initialization :
  const wb = new xl.Workbook({
    defaultFont: {
      size: 12,
      color: "#000000",
      name: "Calibri",
    },
  });
  wb.creator = "Foton Inc.";
  const options: any = {
    sheetFormat: {
      defaultColWidth: 20,
      defaultRowHeight: 20,
    },
  };

  //Excel styling :
  const centerBoldLarge = wb.createStyle({
    alignment: { horizontal: "center", vertical: "center" },
    font: { bold: true, color: "#000000", name: "Calibri", size: 36 },
  });

  const centerBoldMedium = wb.createStyle({
    alignment: { horizontal: "center", vertical: "center" },
    font: { bold: true, color: "#000000", name: "Calibri", size: 18 },
  });

  const centerBold = wb.createStyle({
    alignment: { horizontal: "center", vertical: "center" },
    font: { bold: true, color: "#000000", name: "Calibri", size: 12 },
  });

  const center = wb.createStyle({
    alignment: { horizontal: "center", vertical: "center" },
  });

  const leftBold = wb.createStyle({
    alignment: { horizontal: "left", vertical: "center" },
    font: { bold: true, color: "#000000", name: "Calibri", size: 12 },
  });

  const ws: any = wb.addWorksheet("POINTAGE");

  ws.column(1).setWidth(102 / 6);
  ws.column(2).setWidth(20.25 / 6);
  ws.column(3).setWidth(66 / 6);
  ws.column(4).setWidth(66 / 6);
  ws.column(5).setWidth(66 / 6);
  ws.column(6).setWidth(66 / 6);
  ws.column(7).setWidth(66 / 6);
  ws.column(8).setWidth(66 / 6);
  ws.column(9).setWidth(152.25 / 6);

  ws.cell(1, 1).string("SNEF").style(centerBoldLarge);
  ws.cell(1, 2, 1, 9, true)
    .string("FEUILLE DE POINTAGE")
    .style(centerBoldLarge);
  ws.cell(2, 2, 2, 8, true).string("NOM :").style(centerBoldMedium);
  ws.cell(2, 9)
    .string("SEMAINE N°13 du 1/04/2023 - 7/04/2023")
    .style(centerBold);
  ws.cell(3, 2).string("DÉSIGNATION CHANTIER").style(centerBold);
  ws.cell(3, 3).string("PARKING PUBLIC").style(centerBold);
  ws.cell(3, 4).string("PARKING PRIVÉE").style(centerBold);
  ws.cell(3, 5).string("MALADIE").style(centerBold);
  ws.cell(3, 6).string("FERIÉ").style(centerBold);
  ws.cell(3, 7).string("CONGÉS").style(centerBold);
  ws.cell(3, 8).string("TOTAL").style(centerBold);
  ws.cell(3, 9).string("? VOITURE SNEF : LOCATION").style(centerBold);
  ws.cell(4, 1).string("JOURS").style(leftBold);
  ws.cell(4, 2).string("N°").style(center);
  ws.cell(4, 3).string("1WXQ00").style(center);
  ws.cell(4, 4).string("1WXQ10").style(center);
  ws.cell(4, 5).string("XX").style(center);
  ws.cell(4, 6).string("F21007").style(center);
  ws.cell(4, 7).string("XX").style(center);
  ws.cell(4, 9).string("? IMMATRICULATION : N°").style(center);

  const days = [
    "LUNDI",
    "MARDI",
    "MERCREDI",
    "JEUDI",
    "VENDREDI",
    "SAMEDI",
    "DIMANCHE",
  ];
  for (let i = 0; i < days.length; i++) {
    ws.cell(5 + i, 1, 5 + i, 2, true)
      .string(days[i])
      .style(leftBold);
  }

  ws.cell(12, 1, 12, 2, true).string("TOTAL").style(leftBold);

  ws.column(1).setWidth(12);
  ws.column(2).setWidth(2.5);
  ws.column(3).setWidth(8);
  ws.column(4).setWidth(8);
  ws.column(5).setWidth(8);
  ws.column(6).setWidth(8);
  ws.column(7).setWidth(8);
  ws.column(8).setWidth(10);
  ws.column(9).setWidth(25);

  // Write values to cells
  for (let i = 0; i < days.length; i++) {
    ws.cell(5 + i, 3)
      .number(0)
      .style(centerBold);
    ws.cell(5 + i, 4)
      .number(0)
      .style(centerBold);
    ws.cell(5 + i, 5)
      .number(0)
      .style(centerBold);
    ws.cell(5 + i, 6)
      .number(0)
      .style(centerBold);
    ws.cell(5 + i, 7)
      .number(0)
      .style(centerBold);
    ws.cell(5 + i, 8)
      .formula("=SUM(C${5 + i}:G${5 + i})")
      .style(centerBold);
  }

  // Calculate totals
  ws.cell(12, 3).formula("=SUM(C5:C11)").style(centerBold);
  ws.cell(12, 4).formula("=SUM(D5:D11)").style(centerBold);
  ws.cell(12, 5).formula("=SUM(E5:E11)").style(centerBold);
  ws.cell(12, 6).formula("=SUM(F5:F11)").style(centerBold);
  ws.cell(12, 7).formula("=SUM(G5:G11)").style(centerBold);
  ws.cell(12, 8).formula("=SUM(H5:H11)").style(centerBold);

  return wb;
};

//Download route :
app.get("/download", async (req, res) => {
  const workbook = worksheet();
  try {
    const buffer = await workbook.writeToBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=SNEF.xlsx");
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
