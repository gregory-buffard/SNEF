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
    wb.creator = "Grégory Buffard";
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
      border: {left: {style: 'medium', color: '#000000'}, top: {style: 'medium', color: '#000000'}, right: {style: 'medium', color: '#000000'}, bottom: {style: 'medium', color: '#000000'}}
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

    const yellowBackground = wb.createStyle({
      fill: {
        type: "pattern",
        patternType: "solid",
        fgColor: "#f5d271",
      },
      border: {
        left: {
          style: 'medium',
            color: '#000000'
        },
        top: {
            style: 'medium',
            color: '#000000'
        },
        right: {
            style: 'medium',
            color: '#000000'
        },
        bottom: {
            style: 'medium',
            color: '#000000'
        }
      }
    });

    const logoBorder = wb.createStyle({
      border: {
        left: {
            style: 'thick',
            color: '#000000'
        },
        top: {
            style: 'thick',
            color: '#000000'
        },
        right: {
            style: 'thick',
            color: '#000000'
        },
        bottom: {
            style: 'thick',
            color: '#000000'
        }
      }
    });

    const sheetBorder = wb.createStyle({
      border: {
        left: {
          style: 'thin',
            color: '#000000'
        },
        top: {
            style: 'thin',
            color: '#000000'
        },
        right: {
            style: 'thin',
            color: '#000000'
        },
        bottom: {
            style: 'thin',
            color: '#000000'
        }
      }
    });

    const outsideTop = wb.createStyle({
        border: {
            top: {
                style: 'thick',
                color: '#000000'
            }
        }
    })

    const outsideRight = wb.createStyle({
        border: {
            right: {
                style: 'thick',
                color: '#000000'
            }
        }
    })

    const outsideBottom = wb.createStyle({
        border: {
            bottom: {
                style: 'thick',
                color: '#000000'
            }
        }
    })

    const outsideLeft = wb.createStyle({
        border: {
            left: {
                style: 'thick',
                color: '#000000'
            }
        }
    })

    const ws: any = wb.addWorksheet("POINTAGE");

    const logo = ws.addImage({
      path: './node-server/src/excel/snef.png',
      type: 'picture',
      position: {
        type: 'oneCellAnchor',
        from: {
          col: 1,
          colOff: 0,
          row: 1,
          rowOff: 0
        }
      }
    })

    ws.cell(1, 1, 13, 4 + productivityCoefficient).style(sheetBorder);
    ws.cell(1, 1).style(logoBorder);
    ws.cell(12, 1, 12, 3 + productivityCoefficient).style(yellowBackground);
    ws.cell(3, 3 + productivityCoefficient, 12, 3 + productivityCoefficient).style(yellowBackground);

    const currentDate: string =
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear();
    const dateAWeekAgo = new Date();
    dateAWeekAgo.setDate(new Date().getDate() - 6);
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
        dateToday.getTime() - 6 * 24 * 60 * 60 * 1000
    );
    const weekAgoWeekNumber: number = getWeekNumber(dateWeekAgo);

    ws.cell(1, 2, 1, 4+productivityCoefficient, true)
        .string("FEUILLE DE POINTAGE")
        .style(centerBoldLarge);
    ws.cell(2, 2, 2, 4+productivityCoefficient, true)
        .string("NOM : " + properName)
        .style(centerBoldMedium);
    ws.cell(3, 4 + productivityCoefficient)
        .string(
            `SEMAINE N°${weekAgoWeekNumber} du ${weekAgo} - ${currentDate}`
        )
        .style(centerBold);

    ws.cell(1, 1, 1, 4 + productivityCoefficient).style(outsideTop);
    ws.cell(1, 1, 13, 1).style(outsideLeft);
    ws.cell(1, 4 + productivityCoefficient, 13, 4 + productivityCoefficient).style(outsideRight);
    ws.cell(13, 1, 13, 4 + productivityCoefficient).style(outsideBottom);

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
    ws.row(1).setHeight(75);
    ws.row(2).setHeight(50);
    for (let i = 3; i < 14; i++) {
      ws.row(i).setHeight(25);
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

    return wb;
  } else if (name.length > 1) {
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
      wb.creator = "Grégory Buffard";
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
        alignment: { horizontal: "left", vertical: "center" },
        font: { bold: true, color: "#000000", name: "Calibri", size: 18 },
        border: {left: {style: 'medium', color: '#000000'}, top: {style: 'medium', color: '#000000'}, right: {style: 'medium', color: '#000000'}, bottom: {style: 'medium', color: '#000000'}}
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

      const yellowBackground = wb.createStyle({
        fill: {
          type: "pattern",
          patternType: "solid",
          fgColor: "#f5d271",
        },
        border: {
          left: {
            style: 'medium',
            color: '#000000'
          },
          top: {
            style: 'medium',
            color: '#000000'
          },
          right: {
            style: 'medium',
            color: '#000000'
          },
          bottom: {
            style: 'medium',
            color: '#000000'
          }
        }
      });

      const logoBorder = wb.createStyle({
        border: {
          left: {
            style: 'thick',
            color: '#000000'
          },
          top: {
            style: 'thick',
            color: '#000000'
          },
          right: {
            style: 'thick',
            color: '#000000'
          },
          bottom: {
            style: 'thick',
            color: '#000000'
          }
        }
      });

      const sheetBorder = wb.createStyle({
        border: {
          left: {
            style: 'thin',
            color: '#000000'
          },
          top: {
            style: 'thin',
            color: '#000000'
          },
          right: {
            style: 'thin',
            color: '#000000'
          },
          bottom: {
            style: 'thin',
            color: '#000000'
          }
        }
      });

      const outsideTop = wb.createStyle({
        border: {
          top: {
            style: 'thick',
            color: '#000000'
          }
        }
      })

      const outsideRight = wb.createStyle({
        border: {
          right: {
            style: 'thick',
            color: '#000000'
          }
        }
      })

      const outsideBottom = wb.createStyle({
        border: {
          bottom: {
            style: 'thick',
            color: '#000000'
          }
        }
      })

      const outsideLeft = wb.createStyle({
        border: {
          left: {
            style: 'thick',
            color: '#000000'
          }
        }
      })

      const ws: any = wb.addWorksheet(properNames[m]);

      const logo = ws.addImage({
        path: './node-server/src/excel/snef.png',
        type: 'picture',
        position: {
          type: 'oneCellAnchor',
          from: {
            col: 1,
            colOff: 0,
            row: 1,
            rowOff: 0
          }
        }
      })

      ws.cell(1, 1, 13, 4 + productivityCoefficient).style(sheetBorder);
      ws.cell(1, 1).style(logoBorder);
      ws.cell(12, 1, 12, 3 + productivityCoefficient).style(yellowBackground);
      ws.cell(3, 3 + productivityCoefficient, 12, 3 + productivityCoefficient).style(yellowBackground);

      const currentDate: string =
          new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear();
      const dateAWeekAgo = new Date();
      dateAWeekAgo.setDate(dateAWeekAgo.getDate() - 6);
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
          dateToday.getTime() - 6 * 24 * 60 * 60 * 1000
      );
      const weekAgoWeekNumber: number = getWeekNumber(dateWeekAgo);

      ws.cell(1, 2, 1, 4+productivityCoefficient, true)
          .string("FEUILLE DE POINTAGE")
          .style(centerBoldLarge);
      ws.cell(2, 2, 2, 4+productivityCoefficient, true)
          .string("NOM : " + properNames[m])
          .style(centerBoldMedium);
      ws.cell(3, 4 + productivityCoefficient)
          .string(
              `SEMAINE N°${weekAgoWeekNumber} du ${weekAgo} - ${currentDate}`
          )
          .style(centerBold);

      ws.cell(1, 1, 1, 4 + productivityCoefficient).style(outsideTop);
      ws.cell(1, 1, 13, 1).style(outsideLeft);
      ws.cell(1, 4 + productivityCoefficient, 13, 4 + productivityCoefficient).style(outsideRight);
      ws.cell(13, 1, 13, 4 + productivityCoefficient).style(outsideBottom);

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
      ws.row(1).setHeight(75);
      ws.row(2).setHeight(50);
      for (let i = 3; i < 14; i++) {
        ws.row(i).setHeight(25);
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
