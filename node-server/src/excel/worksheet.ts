const xl = require("excel4node");

const getWorksheet = async (properName:any, name:any[]) => {
  if (name.length == 1) {
    const filterNullProductivity = (tablesList: any[][]) => {
      return tablesList.filter((tableData) => {
        const workedHours = tableData[tableData.length - 1];
        const sum = workedHours.reduce(
            (total: number, num: number) => total + num,
            0
        );
        return sum !== 0;
      });
    };
    let tablesList = name[0].schedule.map((worker: { name: string; codeNumber: string; days: any}) => {
      return [worker.name, worker.codeNumber, worker.days];
    });
    tablesList = filterNullProductivity(tablesList);
    const productivityCoefficient = tablesList.length;
    const carDetailsList = [name[0].carDetails.origin, name[0].carDetails.code];

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
      alignment: { horizontal: "left", vertical: "center" },
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

    const currentDate: string =
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear();
    const dateAWeekAgo = new Date();
    dateAWeekAgo.setDate(new Date().getDate() - 7);
    const weekAgo: string =
        dateAWeekAgo.getDate() +
        "/" +
        (dateAWeekAgo.getMonth() + 1) +
        "/" +
        dateAWeekAgo.getFullYear();


    function getWeekNumber(d: Date): number {
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      return Math.ceil(
          ((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
      );
    }

    const dateToday: Date = new Date();
    const dateWeekAgo: Date = new Date(
        dateToday.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const weekAgoWeekNumber: number = getWeekNumber(dateWeekAgo);

    ws.cell(1, 1).string("SNEF").style(centerBoldLarge);
    ws.cell(1, 2, 1, 4+productivityCoefficient, true)
        .string("FEUILLE DE POINTAGE")
        .style(centerBoldLarge);
    ws.cell(2, 2, 2, 8, true)
        .string("NOM : " + properName)
        .style(centerBoldMedium);
    ws.cell(3, 4 + productivityCoefficient)
        .string(
            `SEMAINE N°${weekAgoWeekNumber} du ${weekAgo} - ${currentDate}`
        )
        .style(centerBold);

    let carType: string = carDetailsList[0];
    let carID: string = carDetailsList[1];

    ws.column(4 + productivityCoefficient).setWidth(40);
    ws.cell(4, 4 + productivityCoefficient).string("Vehicule " + carType).style(centerBold);
    ws.cell(5, 4 + productivityCoefficient).string(carID).style(center);
    ws.cell(3, 1).string("DÉSIGNATION CHANTIER").style(centerBold);
    ws.cell(4, 1).string("JOURS").style(leftBold);
    ws.cell(4, 2).string("N°").style(center);

    const days: any[] = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];
    for (let i = 0; i < days.length; i++) {
      ws.cell(5 + i, 1, 5 + i, 2, true)
          .string(days[i])
          .style(leftBold);
    }
    ws.column(1).setWidth(25);
    ws.column(2).setWidth(2.5);
    for (let i = 0; i < productivityCoefficient; i++) {
      ws.column(3 + i).setWidth(15);
      ws.cell(3, 3 + i).string(tablesList[i][0]).style(centerBold);
      ws.cell(4, 3 + i).string(tablesList[i][1]).style(centerBold);
      for (let j = 0; j < days.length; j++) {
        ws.cell(5 + j, 3 + i)
            .number(tablesList[i][2][j])
            .style(centerBold);
      }
    }
    ws.column(3 + productivityCoefficient).setWidth(10);
    ws.cell(3, 3 + productivityCoefficient).string("TOTAL").style(centerBold);
    for (let j = 0; j < days.length; j++) {
      ws.cell(5 + j, 3 + productivityCoefficient)
          .formula(`SUM(${xl.getExcelCellRef(5 + j, 3)}:${xl.getExcelCellRef(5 + j, 3 + productivityCoefficient - 1)})`)
          .style(centerBold);
    }
    ws.cell(12, 1, 12, 2, true).string("TOTAL").style(leftBold);
    for (let i = 0; i <= productivityCoefficient; i++) {
      ws.cell(12, 3 + i)
          .formula(`SUM(${xl.getExcelCellRef(5, 3 + i)}:${xl.getExcelCellRef(
              11,
              3 + i
          )})`)
          .style(centerBold);
    }
    ws.cell(13, 1)
        .string("©" + new Date().getFullYear() + " Foton Inc.")
        .style(centerBold);

    return wb;
  } else {
    const wb = new xl.Workbook({
      defaultFont: {
        size: 12,
        color: "#000000",
        name: "Calibri",
      },
    });
    for (let m = 0; m < name.length; m++) {
      const filterNullProductivity = (tablesList: any[][]) => {
        return tablesList.filter((tableData) => {
          const workedHours = tableData[tableData.length - 1];
          const sum = workedHours.reduce(
              (total: number, num: number) => total + num,
              0
          );
          return sum !== 0;
        });
      };
      let tablesList = name[m].schedule.map((worker: { name: string; codeNumber: string; days: any;}) => {
        return [worker.name, worker.codeNumber, worker.days];
      });
      tablesList = filterNullProductivity(tablesList);
      const productivityCoefficient = tablesList.length;
      const carDetailsList = [name[m].carDetails.origin, name[m].carDetails.code];
      const properNames = properName.split(", ");

      //Excel initialization :
      wb.creator = "Foton Inc.";
      const options: any = {
        sheetFormat: {
          defaultColWidth: 20,
          defaultRowHeight: 20,
        },
      };

      //Excel styling :
      const centerBoldLarge = wb.createStyle({
        alignment: {horizontal: "center", vertical: "center"},
        font: {bold: true, color: "#000000", name: "Calibri", size: 36},
      });

      const centerBoldMedium = wb.createStyle({
        alignment: {horizontal: "left", vertical: "center"},
        font: {bold: true, color: "#000000", name: "Calibri", size: 18},
      });

      const centerBold = wb.createStyle({
        alignment: {horizontal: "center", vertical: "center"},
        font: {bold: true, color: "#000000", name: "Calibri", size: 12},
      });

      const center = wb.createStyle({
        alignment: {horizontal: "center", vertical: "center"},
      });

      const leftBold = wb.createStyle({
        alignment: {horizontal: "left", vertical: "center"},
        font: {bold: true, color: "#000000", name: "Calibri", size: 12},
      });

      const ws: any = wb.addWorksheet("POINTAGE " + properNames[m]);

      const currentDate: string =
          new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear();
      const dateAWeekAgo = new Date();
      dateAWeekAgo.setDate(dateAWeekAgo.getDate() - 7);
      const weekAgo: string =
          dateAWeekAgo.getDate() +
          "/" +
          (dateAWeekAgo.getMonth() + 1) +
          "/" +
          dateAWeekAgo.getFullYear();


      function getWeekNumber(d: Date): number {
        const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const dayNum = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil(
            ((date.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
        );
      }

      const dateToday: Date = new Date();
      const dateWeekAgo: Date = new Date(
          dateToday.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      const weekAgoWeekNumber: number = getWeekNumber(dateWeekAgo);

      ws.cell(1, 1).string("SNEF").style(centerBoldLarge);
      ws.cell(1, 2, 1, 4+productivityCoefficient, true)
          .string("FEUILLE DE POINTAGE")
          .style(centerBoldLarge);
      ws.cell(2, 2, 2, 8, true)
          .string("NOM : " + properNames[m])
          .style(centerBoldMedium);
      ws.cell(3, 4 + productivityCoefficient)
          .string(
              `SEMAINE N°${weekAgoWeekNumber} du ${weekAgo} - ${currentDate}`
          )
          .style(centerBold);

      let carType: string = carDetailsList[0];
      let carID: string = carDetailsList[1];

      ws.column(4 + productivityCoefficient).setWidth(40);
      ws.cell(4, 4 + productivityCoefficient).string("Vehicule " + carType).style(centerBold);
      ws.cell(5, 4 + productivityCoefficient).string(carID).style(center);
      ws.cell(3, 1).string("DÉSIGNATION CHANTIER").style(centerBold);
      ws.cell(4, 1).string("JOURS").style(leftBold);
      ws.cell(4, 2).string("N°").style(center);

      const days: any[] = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
      ];
      for (let i = 0; i < days.length; i++) {
        ws.cell(5 + i, 1, 5 + i, 2, true)
            .string(days[i])
            .style(leftBold);
      }
      ws.column(1).setWidth(25);
      ws.column(2).setWidth(2.5);
      for (let i = 0; i < productivityCoefficient; i++) {
        ws.column(3 + i).setWidth(15);
        ws.cell(3, 3 + i).string(tablesList[i][0]).style(centerBold);
        ws.cell(4, 3 + i).string(tablesList[i][1]).style(centerBold);
        for (let j = 0; j < days.length; j++) {
          ws.cell(5 + j, 3 + i)
              .number(tablesList[i][2][j])
              .style(centerBold);
        }
      }
      ws.column(3 + productivityCoefficient).setWidth(10);
      ws.cell(3, 3 + productivityCoefficient).string("TOTAL").style(centerBold);
      for (let j = 0; j < days.length; j++) {
        ws.cell(5 + j, 3 + productivityCoefficient)
            .formula(`SUM(${xl.getExcelCellRef(5 + j, 3)}:${xl.getExcelCellRef(5 + j, 3 + productivityCoefficient - 1)})`)
            .style(centerBold);
      }
      ws.cell(12, 1, 12, 2, true).string("TOTAL").style(leftBold);
      for (let i = 0; i <= productivityCoefficient; i++) {
        ws.cell(12, 3 + i)
            .formula(`SUM(${xl.getExcelCellRef(5, 3 + i)}:${xl.getExcelCellRef(
                11,
                3 + i
            )})`)
            .style(centerBold);
      }
      ws.cell(13, 1)
          .string("©" + new Date().getFullYear() + " Grégory Buffard")
          .style(centerBold);
    }
    return wb;
  }
}

export default getWorksheet;
