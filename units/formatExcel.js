var xl = require('excel4node');
var fs = require('fs');
const supportDate = require('../units/supportDate.js');
const CONSTANTS = require('../units/constants.js');

var border = { // §18.8.4 border (Border)
    left: {
        style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "#000000"
    },
    right: {
        style: 'thin',
        color: "#000000"
    },
    top: {
        style: 'thin',
        color: "#000000"
    },
    bottom: {
        style: 'thin',
        color: "#000000"
    },
}

var alignment = {
    shrinkToFit: true,
    wrapText: true,
    horizontal: 'center',
    vertical: 'center',
}

var styleTitle = (wb) => {
    return wb.createStyle({
        font: {
            color: '#000000',
            size: 18,
        },
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#FFFF00",  // yellow
            fgColor: "#FFFF00"
        },
        alignment: alignment
    })
};

var bgGreen = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#4CAF50",  // green
            fgColor: "#4CAF50"
        },
        alignment: alignment,
        border: border
    });
}

var bgCyan = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#EBF1DE",  // cyan 
            fgColor: "#EBF1DE"
        },
        alignment: alignment,
        border: border
    })
}

var bgNone = (wb) => {
    return wb.createStyle({
        alignment: alignment,
        border: border
    });
}

var bgAntiqueWhite = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#FAEBD7",  // AntiqueWhite
            fgColor: "#FAEBD7"
        },
        alignment: alignment,
        border: border
    });
}

var bgOrange = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#FDA359",  // Orange
            fgColor: "#FDA359"
        },
        alignment: alignment,
        border: border
    });
}

var bgTurquoise = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#0C909E",  // Orange
            fgColor: "#0C909E"
        },
        alignment: alignment,
        border: border
    });
}

var bgBlue = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#00B0F0",  // Orange
            fgColor: "#00B0F0"
        },
        alignment: alignment,
        border: border
    });
}

var bgPinkSakura = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#e6b8b7",  // Orange
            fgColor: "#e6b8b7"
        },
        alignment: alignment,
        border: border
    })
}

var bgYellow = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#ffff00",  // Yellow
            fgColor: "#ffff00"
        },
        alignment: alignment,
        border: border
    })
}

var styleNumber = (wb) => {
    return wb.createStyle({
        //numberFormat: '#,##0.000_);(#,##0.000)',
        //    numberFormat: '#,##0_);(#,##0)',
        border: border
    });
}

var styleNumber000 = (wb) => {  // setup excel 000
    return wb.createStyle({
        numberFormat: '#,##0.000_);(#,##0.000)',
        border: border,
        alignment: alignment,
    });
}

var styleNumberWithBg = (color, wb, color2, formatNumber) => {
    var result;
    result = wb.createStyle({
        font: {
            font: 'Times New Roman',
            color: "" + color2 === "" ? "#000000" : color2,
            bgColor: "" + color2 === "" ? "#000000" : color2,
            size: 9,
        },
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "" + color === "" ? "#FFFFFF" : color,  // Yellow
            fgColor: "" + color === "" ? "#FFFFFF" : color
        },
        numberFormat: formatNumber === undefined ? '#,##0_);(#,##0)' : formatNumber,
        alignment: alignment,
        border: border
    });
    return result
};

var styleYNumberUsdWithBg = (color, vb) => {
    var result;
    result = wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "" + color,  // Yellow
            fgColor: "" + color
        },
        numberFormat: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
        alignment: alignment,
        border: border
    });
    return result
};

var styleNumberUSD = (wb) => {
    return wb.createStyle({
        numberFormat: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
        border: border
    });
}

var styleNumberTotal = (wb) => {
    return wb.createStyle({
        fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#FF99CC",  // Orange
            fgColor: "#FF99CC"
        },
        //    numberFormat: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
        border: border,
        numberFormat: '#,##0_);(#,##0)',
    });
}

const formatExcel = {
    acc_sum: (accSum) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('Acc Sum');

        ws.cell(1, 15, 1, 23, true)
            .string("Accountant Sum Report")
            .style(styleTitle(wb));

        // Title
        // tilte -> Date
        ws.cell(3, 1, 4, 1, true)
            .string("Date")
            .style(bgOrange(wb));

        // Title -> SUb
        ws.cell(3, 2, 3, 12, true)
            .string("Sub")
            .style(bgOrange(wb))

        ws.cell(4, 2)
            .string("Hotel Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 3)
            .string("Service Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 4)
            .string("BF 200")
            .style(bgOrange(wb))
        ws.cell(4, 5)
            .string("BT 150")
            .style(bgOrange(wb))
        ws.cell(4, 6)
            .string("BF & BT 300")
            .style(bgOrange(wb))
        ws.cell(4, 7)
            .string("MS 40P 200")
            .style(bgOrange(wb))
        ws.cell(4, 8)
            .string("MS 70P 250")
            .style(bgOrange(wb))
        ws.cell(4, 9)
            .string("MS 100P 350")
            .style(bgOrange(wb))
        ws.cell(4, 10)
            .string("MS 70P & BT 370")
            .style(bgOrange(wb))
        ws.cell(4, 11)
            .string("HMS 70P 225")
            .style(bgOrange(wb))
        ws.cell(4, 12)
            .string("HMS 100P 315")
            .style(bgOrange(wb))
        ws.column(2).setWidth(7);
        ws.column(3).setWidth(7);

        ws.column(4).setWidth(3);
        ws.column(5).setWidth(3);
        ws.column(6).setWidth(3);
        ws.column(7).setWidth(3);
        ws.column(8).setWidth(3);
        ws.column(9).setWidth(3);
        ws.column(10).setWidth(3);
        ws.column(11).setWidth(3);
        ws.column(12).setWidth(3);

        // title -> Discount
        ws.cell(3, 13, 4, 13, true)
            .string("Discount")
            .style(bgGreen(wb));
        ws.column(13).setWidth(8);

        ws.cell(3, 14, 4, 14, true)
            .string("Rate")
            .style(bgGreen(wb));
        ws.column(14).setWidth(6);

        ws.cell(3, 15, 4, 15, true)
            .string("Description")
            .style(bgGreen(wb));
        ws.column(15).setWidth(30);

        ws.cell(3, 16, 4, 16, true)
            .string("Room Number")
            .style(bgGreen(wb));
        ws.column(16).setWidth(7);

        ws.cell(3, 17, 3, 18, true)
            .string("Date Stay")
            .style(bgGreen(wb));
        ws.cell(4, 17)
            .string("check in")
            .style(bgGreen(wb));
        ws.cell(4, 18)
            .string("check out")
            .style(bgGreen(wb));
        ws.column(17).setWidth(10);
        ws.column(18).setWidth(10);

        // title -> other action
        ws.cell(3, 19)
            .string("Other")
            .style(bgOrange(wb))
        ws.cell(4, 19)
            .string("Action")
            .style(bgOrange(wb))

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 20, 3, 29, true)
            .string("AZUMAYA")
            .style(bgTurquoise(wb))
        ws.cell(4, 20)
            .string("Unit Price")
            .style(bgTurquoise(wb))
        ws.column(20).setWidth(10);

        ws.cell(4, 21)
            .string("Nights")
            .style(bgTurquoise(wb))
        ws.column(21).setWidth(4);

        ws.cell(4, 22)
            .string("Amount")
            .style(bgTurquoise(wb))
        ws.column(22).setWidth(11);

        ws.cell(4, 23)
            .string("Telephone/Note")
            .style(bgTurquoise(wb))
        ws.column(23).setWidth(15);

        ws.cell(4, 24)
            .string("Laundry")
            .style(bgTurquoise(wb))
        ws.column(24).setWidth(10);

        ws.cell(4, 25)
            .string("Minibar")
            .style(bgTurquoise(wb))
        ws.column(25).setWidth(10);

        ws.cell(4, 26)
            .string("Pickup/Transfer or Tour")
            .style(bgTurquoise(wb))
        ws.column(26).setWidth(10);

        ws.cell(4, 27)
            .string("Dinning")
            .style(bgTurquoise(wb))
        ws.column(27).setWidth(9);

        ws.cell(4, 28)
            .string("Other")
            .style(bgTurquoise(wb))
        ws.column(28).setWidth(9);

        ws.cell(4, 29)
            .string("Sub")
            .style(bgTurquoise(wb))
        ws.column(29).setWidth(12);

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 30, 3, 33, true)
            .string("SERVICE")
            .style(bgOrange(wb))

        ws.cell(4, 30)
            .string("BreakFast")
            .style(bgOrange(wb))
        ws.column(30).setWidth(9);

        ws.cell(4, 31)
            .string("Sauna")
            .style(bgOrange(wb))
        ws.column(31).setWidth(9);

        ws.cell(4, 32)
            .string("Massage")
            .style(bgOrange(wb))
        ws.column(32).setWidth(9);

        ws.cell(4, 33)
            .string("Total")
            .style(bgOrange(wb))
        ws.column(33).setWidth(9);

        // title => Guest Pay by Cash
        ws.cell(3, 34, 3, 36, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 34)
            .string("VND")
            .style(bgBlue(wb))
        ws.column(34).setWidth(9);
        ws.cell(4, 35)
            .string("USD")
            .style(bgBlue(wb))
        ws.column(35).setWidth(9);
        ws.cell(4, 36)
            .string("JPY")
            .style(bgBlue(wb))
        ws.column(36).setWidth(9);

        // title => Guest Pay by Card
        ws.cell(3, 37, 3, 40, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 37)
            .string("VND(Vcb)")
            .style(bgBlue(wb))
        ws.column(37).setWidth(9);
        ws.cell(4, 38)
            .string("USD(Vcb)")
            .style(bgBlue(wb))
        ws.column(38).setWidth(9);
        ws.cell(4, 39)
            .string("VND(Bidv)")
            .style(bgBlue(wb))
        ws.column(39).setWidth(9);
        ws.cell(4, 40)
            .string("Other Pay")
            .style(bgBlue(wb))
        ws.column(40).setWidth(9);

        //accSum 
        accSum.forEach((item, index) => {
            ws.cell(5 + index, 1).string("Date").style(bgBlue(wb))
            ws.cell(5 + index, 2).string(item.HI).style(bgBlue(wb))
            ws.cell(5 + index, 3).string(item.SI).style(bgBlue(wb))
            // ws.cell(5 + index, 4)
            //     .string(item["BF 200"] === undefined ? "" : item["BF 200"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 5)
            //     .string(item["BT 150"] === undefined ? "" : item["BT 150"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 6)
            //     .string(item["BF & BT 300"] === undefined ? "" : item["BF & BT 300"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 7)
            //     .string(item["MS 40P 200"] === undefined ? "" : item["MS 40P 200"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 8)
            //     .string(item["MS 70P 250"] === undefined ? "" : item["MS 70P 250"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 9)
            //     .string(item["MS 100P 350"] === undefined ? "" : item["MS 100P 350"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 10)
            //     .string(item["MS 70P & BT 370"] === undefined ? "" : item["MS 70P & BT 370"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 11)
            //     .string(item["HMS 70P 225"] === undefined ? "" : item["HMS 70P 225"])
            //     .style(bgBlue(wb))
            // ws.cell(5 + index, 12)
            //     .string(item["HMS 100P 315"] === undefined ? "" : item["HMS 100P 315"])
            //     .style(bgBlue(wb))
            ws.cell(5 + index, 13)
                .number(Number(item.room_rate.replace('$', '')) * 1.1)
                .style(styleNumberUSD(wb))
            ws.cell(5 + index, 14)
                .number(Number(item.rate))
                .style(bgBlue(wb))
            ws.cell(5 + index, 15)
                .string(item.name)
                .style(bgBlue(wb))
            ws.cell(5 + index, 16)
                .string(item.room)
                .style(bgBlue(wb))
            ws.cell(5 + index, 17)
                .string(item.checkin)
                .style(bgBlue(wb))
            ws.cell(5 + index, 18)
                .string(item.checkout)
                .style(bgBlue(wb))
            ws.cell(5 + index, 19)
                .string(item.action)
                .style(bgBlue(wb))
            // Azumaya area
            ws.cell(5 + index, 20)
                .formula(`M${5 + index} * N${5 + index}*1000`)
                .style(styleNumber(wb))
            ws.cell(5 + index, 21)
                .formula(`R${5 + index}-Q${5 + index}`)
                .style(styleNumber(wb))
            ws.cell(5 + index, 22)
                .formula(`T${5 + index}*U${5 + index}`)
                .style(styleNumber(wb))
            ws.cell(5 + index, 23)
                .string(item.telephone)
                .style(styleNumber(wb))
            ws.cell(5 + index, 24)
                .number(Number(item.laundry.replace(",", "")))
                .style(styleNumber(wb))
            ws.cell(5 + index, 25)
                .number(changeStringToNumber(item.minibar))
                .style(styleNumber(wb))
            ws.cell(5 + index, 26)
                .number(changeStringToNumber(item.transfer))
                .style(styleNumber(wb))
            ws.cell(5 + index, 27)
                .number(changeStringToNumber(item.dinning))
                .style(styleNumber(wb))
            ws.cell(5 + index, 28)
                .number(changeStringToNumber(item.others))
                .style(styleNumber(wb))
            ws.cell(5 + index, 29)
                .formula(`SUM(V${5 + index}:AB${5 + index})`)
                .style(styleNumber(wb))
            // Service area
            ws.cell(5 + index, 30)
                .number(changeStringToNumber(item.breakfast))
                .style(styleNumber(wb))
            ws.cell(5 + index, 31)
                .number(changeStringToNumber(item.sauna))
                .style(styleNumber(wb))
            ws.cell(5 + index, 32)
                .number(changeStringToNumber(item.massage))
                .style(styleNumber(wb))
            ws.cell(5 + index, 33)
                .formula(`SUM(AD${5 + index}:AF${5 + index})`)
                .style(styleNumber(wb))

            // Guest pay by Cash
            ws.cell(5 + index, 34)
                .number(changeStringToNumber(item.vnd))
                .style(styleNumber(wb))
            ws.cell(5 + index, 35)
                .number(changeStringToNumber(item.usd))
                .style(styleNumber(wb))
            ws.cell(5 + index, 36)
                .number(changeStringToNumber(item.yen))
                .style(styleNumber(wb))
            // Guest pay by Card
            ws.cell(5 + index, 37)
                .number(changeStringToNumber(item.vcb))
                .style(styleNumber(wb))
            ws.cell(5 + index, 38)
                .number(changeStringToNumber(item.vcb_usd))
                .style(styleNumber(wb))
            ws.cell(5 + index, 39)
                .number(changeStringToNumber(item.vcb_other))
                .style(styleNumber(wb))
            ws.cell(5 + index, 40)
                .number(changeStringToNumber(item.otherPay))
                .style(styleNumber(wb))
        });

        // Make row Total 
        const lengthSum = accSum.length;
        ws.cell(5 + lengthSum, 1, 5 + lengthSum, 14)
            .string("")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 15)
            .string("SUB")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 16, 5 + lengthSum, 20)
            .string("")
            .style(styleNumberTotal(wb))
        /*
    ws.cell(5 + lengthSum, 21)
        .formula(`SUM(U5:U${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // night
    ws.cell(5 + lengthSum, 22)
        .formula(`SUM(V5:V${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // amount
    ws.cell(5 + lengthSum, 23)
        .formula(`SUM(W5:W${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // telephone
    ws.cell(5 + lengthSum, 24)
        .formula(`SUM(X5:X${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // laundry
    ws.cell(5 + lengthSum, 25)
        .formula(`SUM(Y5:Y${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // minibar
    ws.cell(5 + lengthSum, 26)
        .formula(`SUM(Z5:Z${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // tranfer
    ws.cell(5 + lengthSum, 27)
        .formula(`SUM(AA5:AA${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // dinning
    ws.cell(5 + lengthSum, 28)
        .formula(`SUM(AB5:AB${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // Other
    ws.cell(5 + lengthSum, 29)
        .formula(`SUM(AC5:AC${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // SUb
    ws.cell(5 + lengthSum, 30)
        .formula(`SUM(AD5:AD${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // breakfast
    ws.cell(5 + lengthSum, 31)
        .formula(`SUM(AE5:AE${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // sauna
    ws.cell(5 + lengthSum, 32)
        .formula(`SUM(AF5:AF${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // massage
    ws.cell(5 + lengthSum, 33)
        .formula(`SUM(AG5:AG${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // massage
    ws.cell(5 + lengthSum, 34)
        .formula(`SUM(AH5:AH${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by vnd
    ws.cell(5 + lengthSum, 35)
        .formula(`SUM(AI5:AI${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by usd
    ws.cell(5 + lengthSum, 36)
        .formula(`SUM(AJ5:AJ${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by jpy
    ws.cell(5 + lengthSum, 37)
        .formula(`SUM(AK5:AK${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by vcb(vnd)
    ws.cell(5 + lengthSum, 38)
        .formula(`SUM(AL5:AL${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by vcb(usd)
    ws.cell(5 + lengthSum, 39)
        .formula(`SUM(AM5:AM${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by bidv
    ws.cell(5 + lengthSum, 40)
        .formula(`SUM(AN5:AN${5 + lengthSum - 1})`)
        .style(styleNumberTotal(wb)) // guest pay by other pay
   */
        wb.writeToBuffer().then(function (buffer) {
            const path = "./filereport/acc_sum/ExcelFile.xlsx";
            fs.createWriteStream(path).write(buffer);
        });
    },
    acc_Filter_with_text: (accSum, branchOnData, res) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('Filter with Text');

        ws.cell(1, 15, 1, 23, true)
            .string("Filter result")
            .style(styleTitle(wb));

        // Title
        // tilte -> Date
        ws.cell(3, 1, 4, 1, true)
            .string("Date")
            .style(bgOrange(wb));

        // Title -> SUb
        ws.cell(3, 2, 3, 12, true)
            .string("Sub")
            .style(bgOrange(wb))

        ws.cell(4, 2)
            .string("Hotel Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 3)
            .string("Service Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 4)
            .string("BF 200")
            .style(bgOrange(wb))
        ws.cell(4, 5)
            .string("BT 150")
            .style(bgOrange(wb))
        ws.cell(4, 6)
            .string("BF & BT 300")
            .style(bgOrange(wb))
        ws.cell(4, 7)
            .string("MS 40P 200")
            .style(bgOrange(wb))
        ws.cell(4, 8)
            .string("MS 70P 250")
            .style(bgOrange(wb))
        ws.cell(4, 9)
            .string("MS 100P 350")
            .style(bgOrange(wb))
        ws.cell(4, 10)
            .string("MS 70P & BT 370")
            .style(bgOrange(wb))
        ws.cell(4, 11)
            .string("HMS 70P 225")
            .style(bgOrange(wb))
        ws.cell(4, 12)
            .string("HMS 100P 315")
            .style(bgOrange(wb))
        ws.column(2).setWidth(7);
        ws.column(3).setWidth(7);

        ws.column(4).setWidth(3);
        ws.column(5).setWidth(3);
        ws.column(6).setWidth(3);
        ws.column(7).setWidth(3);
        ws.column(8).setWidth(3);
        ws.column(9).setWidth(3);
        ws.column(10).setWidth(3);
        ws.column(11).setWidth(3);
        ws.column(12).setWidth(3);

        // title -> Discount
        ws.cell(3, 13, 4, 13, true)
            .string("Discount")
            .style(bgGreen(wb));
        ws.column(13).setWidth(8);

        ws.cell(3, 14, 4, 14, true)
            .string("Rate")
            .style(bgGreen(wb));
        ws.column(14).setWidth(6);

        ws.cell(3, 15, 4, 15, true)
            .string("Description")
            .style(bgGreen(wb));
        ws.column(15).setWidth(30);

        ws.cell(3, 16, 4, 16, true)
            .string("Room Number")
            .style(bgGreen(wb));
        ws.column(16).setWidth(7);

        ws.cell(3, 17, 3, 18, true)
            .string("Date Stay")
            .style(bgGreen(wb));
        ws.cell(4, 17)
            .string("check in")
            .style(bgGreen(wb));
        ws.cell(4, 18)
            .string("check out")
            .style(bgGreen(wb));
        ws.column(17).setWidth(10);
        ws.column(18).setWidth(10);

        // title -> other action
        ws.cell(3, 19)
            .string("Other")
            .style(bgOrange(wb))
        ws.cell(4, 19)
            .string("Action")
            .style(bgOrange(wb))

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 20, 3, 29, true)
            .string("AZUMAYA")
            .style(bgTurquoise(wb))
        ws.cell(4, 20)
            .string("Unit Price")
            .style(bgTurquoise(wb))
        ws.column(20).setWidth(10);

        ws.cell(4, 21)
            .string("Nights")
            .style(bgTurquoise(wb))
        ws.column(21).setWidth(4);

        ws.cell(4, 22)
            .string("Amount")
            .style(bgTurquoise(wb))
        ws.column(22).setWidth(11);

        ws.cell(4, 23)
            .string("Telephone/Note")
            .style(bgTurquoise(wb))
        ws.column(23).setWidth(15);

        ws.cell(4, 24)
            .string("Laundry")
            .style(bgTurquoise(wb))
        ws.column(24).setWidth(10);

        ws.cell(4, 25)
            .string("Minibar")
            .style(bgTurquoise(wb))
        ws.column(25).setWidth(10);

        ws.cell(4, 26)
            .string("Pickup/Transfer or Tour")
            .style(bgTurquoise(wb))
        ws.column(26).setWidth(10);

        ws.cell(4, 27)
            .string("Dinning")
            .style(bgTurquoise(wb))
        ws.column(27).setWidth(9);

        ws.cell(4, 28)
            .string("Other")
            .style(bgTurquoise(wb))
        ws.column(28).setWidth(9);

        ws.cell(4, 29)
            .string("Sub")
            .style(bgTurquoise(wb))
        ws.column(29).setWidth(12);

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 30, 3, 33, true)
            .string("SERVICE")
            .style(bgOrange(wb))

        ws.cell(4, 30)
            .string("BreakFast")
            .style(bgOrange(wb))
        ws.column(30).setWidth(9);

        ws.cell(4, 31)
            .string("Sauna")
            .style(bgOrange(wb))
        ws.column(31).setWidth(9);

        ws.cell(4, 32)
            .string("Massage")
            .style(bgOrange(wb))
        ws.column(32).setWidth(9);

        ws.cell(4, 33)
            .string("Total")
            .style(bgOrange(wb))
        ws.column(33).setWidth(9);

        // title => Guest Pay by Cash
        ws.cell(3, 34, 3, 36, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 34)
            .string("VND")
            .style(bgBlue(wb))
        ws.column(34).setWidth(9);
        ws.cell(4, 35)
            .string("USD")
            .style(bgBlue(wb))
        ws.column(35).setWidth(9);
        ws.cell(4, 36)
            .string("JPY")
            .style(bgBlue(wb))
        ws.column(36).setWidth(9);

        // title => Guest Pay by Card
        ws.cell(3, 37, 3, 40, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 37)
            .string("VND(Vcb)")
            .style(bgBlue(wb))
        ws.column(37).setWidth(9);
        ws.cell(4, 38)
            .string("USD(Vcb)")
            .style(bgBlue(wb))
        ws.column(38).setWidth(9);
        ws.cell(4, 39)
            .string("VND(Bidv)")
            .style(bgBlue(wb))
        ws.column(39).setWidth(9);
        ws.cell(4, 40)
            .string("Other Pay")
            .style(bgBlue(wb))
        ws.column(40).setWidth(9);

        //accSum 
        accSum.forEach((item, index) => {
            ws.cell(5 + index, 1)
                .string(item.sum_credit)
                .style(bgBlue(wb))
            ws.cell(5 + index, 2)
                .string(item.HI)
                .style(bgBlue(wb))
            ws.cell(5 + index, 3)
                .string(item.SI)
                .style(bgBlue(wb))
            ws.cell(5 + index, 4)
                .string(item["BF 200"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 5)
                .string(item["BT 150"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 6)
                .string(item["BF & BT 300"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 7)
                .string(item["MS 40P 200"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 8)
                .string(item["MS 70P 250"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 9)
                .string(item["MS 100P 350"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 10)
                .string(item["MS 70P & BT 370"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 11)
                .string(item["HMS 70P 225"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 12)
                .string(item["HMS 100P 315"] === undefined ? "" : "x")
                .style(bgBlue(wb))
            ws.cell(5 + index, 13)
                .string(item.discount)
                .style(styleNumberUSD(wb))

            if (item.rate === undefined) {
                ws.cell(5 + index, 14)
                    .string("")
                    .style(bgBlue(wb))
            } else if (typeof item.rate === "number") {
                ws.cell(5 + index, 14)
                    .number(item.rate)
                    .style(bgBlue(wb))
            } else {
                ws.cell(5 + index, 14)
                    .string(item.rate)
                    .style(bgBlue(wb))
            }

            ws.cell(5 + index, 15)
                .string(item.name)
                .style(bgBlue(wb))
            ws.cell(5 + index, 16)
                .string(item.room)
                .style(bgBlue(wb))
            ws.cell(5 + index, 17)
                .string(item.checkin)
                .style(bgBlue(wb))
            ws.cell(5 + index, 18)
                .string(item.checkout)
                .style(bgBlue(wb))
            ws.cell(5 + index, 19)
                .string(item.action)
                .style(bgBlue(wb))

            // Azumaya area
            if (item.unit_price === "") {
                ws.cell(5 + index, 20)
                    .string(item.unit_price)
                    .style(styleNumber(wb))
            } else {
                ws.cell(5 + index, 20)
                    .number(item.unit_price)
                    .style(styleNumber(wb))
            }

            ws.cell(5 + index, 21)
                .number(item.nights)
                .style(styleNumber(wb))

            if (item.amount === "") {
                ws.cell(5 + index, 22)
                    .string(item.amount)
                    .style(styleNumber(wb))
            } else {
                ws.cell(5 + index, 22)
                    .number(item.amount)
                    .style(styleNumber(wb))
            }

            ws.cell(5 + index, 23)
                .string(item.telephone)
                .style(styleNumber(wb))
            ws.cell(5 + index, 24)
                .string(item.laundry)
                .style(styleNumber(wb))
            ws.cell(5 + index, 25)
                .string(item.minibar)
                .style(styleNumber(wb))
            ws.cell(5 + index, 26)
                .string(item.transfer)
                .style(styleNumber(wb))
            ws.cell(5 + index, 27)
                .string(item.dinning)
                .style(styleNumber(wb))
            ws.cell(5 + index, 28)
                .string(item.others)
                .style(styleNumber(wb))

            if (item.sub === "") {
                ws.cell(5 + index, 29)
                    .string(item.sub)
                    .style(styleNumber(wb))
            } else {
                ws.cell(5 + index, 29)
                    .number(item.sub)
                    .style(styleNumber(wb))
            }

            ws.column(29).setWidth(13);

            // Service area
            ws.cell(5 + index, 30)
                .string(item.breakfast)
                .style(styleNumber(wb))
            ws.cell(5 + index, 31)
                .string(item.sauna)
                .style(styleNumber(wb))
            ws.cell(5 + index, 32)
                .string(item.massage)
                .style(styleNumber(wb))

            if (item.serviceTotal === "") {
                ws.cell(5 + index, 33)
                    .string(item.serviceTotal)
                    .style(styleNumber(wb))
            } else {
                ws.cell(5 + index, 33)
                    .number(item.serviceTotal)
                    .style(styleNumber(wb))
            }
            ws.column(33).setWidth(13);

            // Guest pay by Cash
            ws.cell(5 + index, 34)
                .number(changeStringToNumber(item.vnd))
                .style(styleNumber(wb))
            ws.cell(5 + index, 35)
                .number(changeStringToNumber(item.usd))
                .style(styleNumber(wb))
            ws.cell(5 + index, 36)
                .number(changeStringToNumber(item.yen))
                .style(styleNumber(wb))

            // Guest pay by Card
            ws.cell(5 + index, 37)
                .number(changeStringToNumber(item.vcb))
                .style(styleNumber(wb))
            ws.cell(5 + index, 38)
                .number(changeStringToNumber(item.vcb_usb))
                .style(styleNumber(wb))
            ws.cell(5 + index, 39)
                .number(changeStringToNumber(item.vcb_other))
                .style(styleNumber(wb))
            ws.cell(5 + index, 40)
                .number(changeStringToNumber(item.vcb_other_usd))
                .style(styleNumber(wb))

            ws.column(37).setWidth(13);
            ws.column(38).setWidth(13);
            ws.column(39).setWidth(13);
            ws.column(40).setWidth(13);
        });

        // Make row Total 
        const lengthSum = accSum.length;
        ws.cell(5 + lengthSum, 1, 5 + lengthSum, 14)
            .string("")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 15)
            .string("SUB")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 16, 5 + lengthSum, 20)
            .string("")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 21)
            .formula(`SUM(U5:U${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // night
        ws.cell(5 + lengthSum, 22)
            .formula(`SUM(V5:V${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // amount
        ws.cell(5 + lengthSum, 23)
            .formula(`SUM(W5:W${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // telephone
        ws.cell(5 + lengthSum, 24)
            .formula(`SUM(X5:X${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // laundry
        ws.cell(5 + lengthSum, 25)
            .formula(`SUM(Y5:Y${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // minibar
        ws.cell(5 + lengthSum, 26)
            .formula(`SUM(Z5:Z${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // tranfer
        ws.cell(5 + lengthSum, 27)
            .formula(`SUM(AA5:AA${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // dinning
        ws.cell(5 + lengthSum, 28)
            .formula(`SUM(AB5:AB${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // Other
        ws.cell(5 + lengthSum, 29)
            .formula(`SUM(AC5:AC${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // SUb
        ws.cell(5 + lengthSum, 30)
            .formula(`SUM(AD5:AD${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // breakfast
        ws.cell(5 + lengthSum, 31)
            .formula(`SUM(AE5:AE${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // sauna
        ws.cell(5 + lengthSum, 32)
            .formula(`SUM(AF5:AF${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // massage
        ws.cell(5 + lengthSum, 33)
            .formula(`SUM(AG5:AG${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // massage
        ws.cell(5 + lengthSum, 34)
            .formula(`SUM(AH5:AH${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vnd
        ws.cell(5 + lengthSum, 35)
            .formula(`SUM(AI5:AI${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by usd
        ws.cell(5 + lengthSum, 36)
            .formula(`SUM(AJ5:AJ${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by jpy
        ws.cell(5 + lengthSum, 37)
            .formula(`SUM(AK5:AK${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vcb(vnd)
        ws.cell(5 + lengthSum, 38)
            .formula(`SUM(AL5:AL${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vcb(usd)
        ws.cell(5 + lengthSum, 39)
            .formula(`SUM(AM5:AM${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by bidv
        ws.cell(5 + lengthSum, 40)
            .formula(`SUM(AN5:AN${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by other pay

        // return res.download(wb.write(`Filter_with_text_results.xlsx`));
        const branchSortName = CONSTANTS.branchNumberToShortName["" + branchOnData.branchID];
        wb.writeToBuffer().then(function (buffer) {
            const path = `./filereport/acc_sum/${branchSortName}_Filter_with_text_results.xlsx`;
            fs.createWriteStream(path).write(buffer);
        });
    },
    acc_debit: (accDebit, titleSheet, title, branchOnData, res) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('' + titleSheet); //Acc Debit

        ws.cell(1, 15, 1, 23, true)
            .string("" + title)
            .style(styleTitle(wb));

        // Title
        // tilte -> Date
        ws.cell(3, 1, 4, 1, true)
            .string("Date")
            .style(bgGreen(wb));

        // Title -> SUb
        ws.cell(3, 2, 3, 12, true)
            .string("Sub")
            .style(bgOrange(wb))

        ws.cell(4, 2)
            .string("Hotel Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 3)
            .string("Service Invoice")
            .style(bgOrange(wb))
        ws.cell(4, 4)
            .string("BF 200")
            .style(bgOrange(wb))
        ws.cell(4, 5)
            .string("BT 150")
            .style(bgOrange(wb))
        ws.cell(4, 6)
            .string("BF & BT 300")
            .style(bgOrange(wb))
        ws.cell(4, 7)
            .string("MS 40P 200")
            .style(bgOrange(wb))
        ws.cell(4, 8)
            .string("MS 70P 250")
            .style(bgOrange(wb))
        ws.cell(4, 9)
            .string("MS 100P 350")
            .style(bgOrange(wb))
        ws.cell(4, 10)
            .string("MS 70P & BT 370")
            .style(bgOrange(wb))
        ws.cell(4, 11)
            .string("HMS 70P 225")
            .style(bgOrange(wb))
        ws.cell(4, 12)
            .string("HMS 100P 315")
            .style(bgOrange(wb))
        ws.column(2).setWidth(7);
        ws.column(3).setWidth(7);

        ws.column(4).setWidth(3);
        ws.column(5).setWidth(3);
        ws.column(6).setWidth(3);
        ws.column(7).setWidth(3);
        ws.column(8).setWidth(3);
        ws.column(9).setWidth(3);
        ws.column(10).setWidth(3);
        ws.column(11).setWidth(3);
        ws.column(12).setWidth(3);

        // title -> Discount
        ws.cell(3, 13, 4, 13, true)
            .string("Discount")
            .style(bgGreen(wb));
        ws.column(13).setWidth(8);

        ws.cell(3, 14, 4, 14, true)
            .string("Rate")
            .style(bgGreen(wb));
        ws.column(14).setWidth(6);

        ws.cell(3, 15, 4, 15, true)
            .string("Company")
            .style(bgGreen(wb));
        ws.column(15).setWidth(30);

        ws.cell(3, 16, 4, 16, true)
            .string("Description")
            .style(bgGreen(wb));
        ws.column(16).setWidth(30);

        ws.cell(3, 17, 4, 17, true)
            .string("Room Number")
            .style(bgGreen(wb));
        ws.column(17).setWidth(7);

        ws.cell(3, 18, 3, 19, true)
            .string("Date Stay")
            .style(bgGreen(wb));
        ws.cell(4, 18)
            .string("check in")
            .style(bgGreen(wb));
        ws.cell(4, 19)
            .string("check out")
            .style(bgGreen(wb));
        ws.column(18).setWidth(10);
        ws.column(19).setWidth(10);

        // title -> other action
        ws.cell(3, 20, 3, 21, true)
            .string("Other")
            .style(bgOrange(wb))
        ws.cell(4, 20)
            .string("Action")
            .style(bgOrange(wb))
        ws.cell(4, 21)
            .string("Paid")
            .style(bgOrange(wb))
        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 22, 3, 31, true)
            .string("AZUMAYA")
            .style(bgTurquoise(wb))
        ws.cell(4, 22)
            .string("Unit Price")
            .style(bgTurquoise(wb))
        ws.column(22).setWidth(10);

        ws.cell(4, 23)
            .string("Nights")
            .style(bgTurquoise(wb))
        ws.column(23).setWidth(4);

        ws.cell(4, 24)
            .string("Amount")
            .style(bgTurquoise(wb))
        ws.column(24).setWidth(11);

        ws.cell(4, 25)
            .string("Telephone/Note")
            .style(bgTurquoise(wb))
        ws.column(25).setWidth(15);

        ws.cell(4, 26)
            .string("Laundry")
            .style(bgTurquoise(wb))
        ws.column(26).setWidth(10);

        ws.cell(4, 27)
            .string("Minibar")
            .style(bgTurquoise(wb))
        ws.column(27).setWidth(10);

        ws.cell(4, 28)
            .string("Pickup/Transfer or Tour")
            .style(bgTurquoise(wb))
        ws.column(28).setWidth(10);

        ws.cell(4, 29)
            .string("Dinning")
            .style(bgTurquoise(wb))
        ws.column(29).setWidth(9);

        ws.cell(4, 30)
            .string("Other")
            .style(bgTurquoise(wb))
        ws.column(30).setWidth(9);

        ws.cell(4, 31)
            .string("Sub")
            .style(bgTurquoise(wb))
        ws.column(31).setWidth(12);

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 32, 3, 35, true)
            .string("SERVICE")
            .style(bgOrange(wb))

        ws.cell(4, 32)
            .string("BreakFast")
            .style(bgOrange(wb))
        ws.column(32).setWidth(9);

        ws.cell(4, 33)
            .string("Sauna")
            .style(bgOrange(wb))
        ws.column(33).setWidth(9);

        ws.cell(4, 34)
            .string("Massage")
            .style(bgOrange(wb))
        ws.column(34).setWidth(9);

        ws.cell(4, 35)
            .string("Total")
            .style(bgOrange(wb))
        ws.column(35).setWidth(9);

        // title => Guest Pay by Cash
        ws.cell(3, 36, 3, 38, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 36)
            .string("VND")
            .style(bgBlue(wb))
        ws.column(36).setWidth(9);
        ws.cell(4, 37)
            .string("USD")
            .style(bgBlue(wb))
        ws.column(37).setWidth(9);
        ws.cell(4, 38)
            .string("JPY")
            .style(bgBlue(wb))
        ws.column(38).setWidth(9);

        // title => Guest Pay by Card
        ws.cell(3, 39, 3, 42, true)
            .string("Guest Pay by Cash")
            .style(bgBlue(wb))
        ws.cell(4, 39)
            .string("VND(Vcb)")
            .style(bgBlue(wb))
        ws.column(39).setWidth(9);
        ws.cell(4, 40)
            .string("USD(Vcb)")
            .style(bgBlue(wb))
        ws.column(40).setWidth(9);
        ws.cell(4, 41)
            .string("VND(Bidv)")
            .style(bgBlue(wb))
        ws.column(41).setWidth(9);
        ws.cell(4, 42)
            .string("Other Pay")
            .style(bgBlue(wb))
        ws.column(42).setWidth(9);

        //accSum 
        /*
                accDebit.forEach((item, index) => {
                    ws.cell(5 + index, 1)
                        .string("Date")
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 2)
                        .string(item.HI)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 3)
                        .string(item.SI)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 4)
                        .string(item["BF 200"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 5)
                        .string(item["BT 150"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 6)
                        .string(item["BF & BT 300"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 7)
                        .string(item["MS 40P 200"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 8)
                        .string(item["MS 70P 250"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 9)
                        .string(item["MS 100P 350"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 10)
                        .string(item["MS 70P & BT 370"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 11)
                        .string(item["HMS 70P 225"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 12)
                        .string(item["HMS 100P 315"])
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 13)
                        .number(Number(item.room_rate.replace('$', '')) * 1.1)
                        .style(styleNumberUSD(wb))
                    ws.cell(5 + index, 14)
                        .number(Number(item.rate))
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 15)
                        .string(item.company)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 16)
                        .string(item.name)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 17)
                        .string(item.room)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 18)
                        .string(item.checkin)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 19)
                        .string(item.checkout)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 20)
                        .string(item.action)
                        .style(bgBlue(wb))
                    ws.cell(5 + index, 21)
                        .string(item.paid)
                        .style(bgBlue(wb))
                    // Azumaya area
                    ws.cell(5 + index, 22)
                        .formula(`M${5 + index} * N${5 + index} * 1000`)
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 23)
                        .formula(`S${5 + index} - R${5 + index}`)
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 24)
                        .formula(`V${5 + index} * W${5 + index}`)
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 25)
                        .string(item.telephone)
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 26)
                        .number(Number(item.laundry.replace(",", "")))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 27)
                        .number(changeStringToNumber(item.minibar))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 28)
                        .number(changeStringToNumber(item.transfer))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 29)
                        .number(changeStringToNumber(item.dinning))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 30)
                        .number(changeStringToNumber(item.others))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 31)
                        .formula(`SUM(X${5 + index}: AD${5 + index})`)
                        .style(styleNumber(wb))
                    // Service area
                    ws.cell(5 + index, 32)
                        .number(changeStringToNumber(item.breakfast))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 33)
                        .number(changeStringToNumber(item.sauna))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 34)
                        .number(changeStringToNumber(item.massage))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 35)
                        .formula(`SUM(AF${5 + index}: AH${5 + index})`)
                        .style(styleNumber(wb))
        
                    // Guest pay by Cash
                    ws.cell(5 + index, 36)
                        .number(changeStringToNumber(item.vnd))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 37)
                        .number(changeStringToNumber(item.usd))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 38)
                        .number(changeStringToNumber(item.yen))
                        .style(styleNumber(wb))
                    // Guest pay by Card
                    ws.cell(5 + index, 39)
                        .number(changeStringToNumber(item.vcb))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 40)
                        .number(changeStringToNumber(item.vcb_usd))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 41)
                        .number(changeStringToNumber(item.vcb_other))
                        .style(styleNumber(wb))
                    ws.cell(5 + index, 42)
                        .number(changeStringToNumber(item.otherPay))
                        .style(styleNumber(wb))
                });
                */

        // Make row Total 
        const lengthSum = accDebit.length;
        ws.cell(5 + lengthSum, 1, 5 + lengthSum, 15)
            .string("")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 16)
            .string("SUB")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 17, 5 + lengthSum, 22)
            .string("")
            .style(styleNumberTotal(wb))
        ws.cell(5 + lengthSum, 23)
            .formula(`SUM(W5: W${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // night
        ws.cell(5 + lengthSum, 24)
            .formula(`SUM(X5: X${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // amount
        ws.cell(5 + lengthSum, 25)
            .formula(`SUM(Y5: Y${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // telephone
        ws.cell(5 + lengthSum, 26)
            .formula(`SUM(Z5: Z${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // laundry
        ws.cell(5 + lengthSum, 27)
            .formula(`SUM(AA5: AA${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // minibar
        ws.cell(5 + lengthSum, 28)
            .formula(`SUM(AB5: AB${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // tranfer
        ws.cell(5 + lengthSum, 29)
            .formula(`SUM(AC5: AC${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // dinning
        ws.cell(5 + lengthSum, 30)
            .formula(`SUM(AD5: AD${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // Other
        ws.cell(5 + lengthSum, 31)
            .formula(`SUM(AE5: AE${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // SUb
        ws.cell(5 + lengthSum, 32)
            .formula(`SUM(AF5: AF${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // breakfast
        ws.cell(5 + lengthSum, 33)
            .formula(`SUM(AG5: AG${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // sauna
        ws.cell(5 + lengthSum, 34)
            .formula(`SUM(AH5: AH${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // massage
        ws.cell(5 + lengthSum, 35)
            .formula(`SUM(AI5: AI${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // massage
        ws.cell(5 + lengthSum, 36)
            .formula(`SUM(AJ5: AJ${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vnd
        ws.cell(5 + lengthSum, 37)
            .formula(`SUM(AK5: AK${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by usd
        ws.cell(5 + lengthSum, 38)
            .formula(`SUM(AL5: AL${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by jpy
        ws.cell(5 + lengthSum, 39)
            .formula(`SUM(AM5: AM${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vcb(vnd)
        ws.cell(5 + lengthSum, 40)
            .formula(`SUM(AN5: AN${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by vcb(usd)
        ws.cell(5 + lengthSum, 41)
            .formula(`SUM(AO5: AO${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by bidv
        ws.cell(5 + lengthSum, 42)
            .formula(`SUM(AP5: AP${5 + lengthSum - 1})`)
            .style(styleNumberTotal(wb)) // guest pay by other pay

        wb.writeToBuffer().then(function (buffer) {
            const path = `./filereport/acc_debit/` + titleSheet + `.xlsx`;
            fs.createWriteStream(path).write(buffer);
        });
    },
    acc_sum_day: (accDebit, titleSheet, title, branchOnData, type, res) => {
        //  (dataAccSum.content, "ACC_SUM", "ACC SUM " + sum_credit, branchOnData, res);
        // type = oneDay / withDay
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('' + titleSheet); //Acc Debit

        ws.cell(1, 15, 1, 23, true)
            .string("" + title)
            .style(styleTitle(wb));

        // Title
        // tilte -> Date
        ws.cell(3, 1, 4, 1, true).string("Date").style(bgGreen(wb));

        // Title -> SUb
        ws.cell(3, 2, 3, 12, true).string("Sub").style(bgOrange(wb))

        ws.cell(4, 2).string("Hotel Invoice").style(bgOrange(wb))
        ws.cell(4, 3).string("Service Invoice").style(bgOrange(wb))
        ws.cell(4, 4).string("BF 200").style(bgOrange(wb))
        ws.cell(4, 5).string("BT 150").style(bgOrange(wb))
        ws.cell(4, 6).string("BF & BT 300").style(bgOrange(wb))
        ws.cell(4, 7).string("MS 40P 200").style(bgOrange(wb))
        ws.cell(4, 8).string("MS 70P 250").style(bgOrange(wb))
        ws.cell(4, 9).string("MS 100P 350").style(bgOrange(wb))
        ws.cell(4, 10).string("MS 70P & BT 370").style(bgOrange(wb))
        ws.cell(4, 11).string("HMS 70P 225").style(bgOrange(wb))
        ws.cell(4, 12).string("HMS 100P 315").style(bgOrange(wb))

        ws.column(2).setWidth(7);
        ws.column(3).setWidth(7);

        ws.column(4).setWidth(3);
        ws.column(5).setWidth(3);
        ws.column(6).setWidth(3);
        ws.column(7).setWidth(3);
        ws.column(8).setWidth(3);
        ws.column(9).setWidth(3);
        ws.column(10).setWidth(3);
        ws.column(11).setWidth(3);
        ws.column(12).setWidth(3);

        // title -> Discount
        ws.cell(3, 13, 4, 13, true).string("Discount").style(bgGreen(wb));
        ws.column(13).setWidth(8);

        ws.cell(3, 14, 4, 14, true).string("Description").style(bgGreen(wb));
        ws.column(14).setWidth(30);

        ws.cell(3, 15, 4, 15, true).string("Room Number").style(bgGreen(wb));
        ws.column(15).setWidth(7);

        ws.cell(3, 16, 3, 17, true).string("Date Stay").style(bgGreen(wb));
        ws.cell(4, 16).string("check in").style(bgGreen(wb));
        ws.cell(4, 17).string("check out").style(bgGreen(wb));
        ws.column(16).setWidth(10);
        ws.column(17).setWidth(10);

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 18, 3, 28, true).string("AZUMAYA").style(bgTurquoise(wb))
        ws.cell(4, 18).string("Unit Price").style(bgTurquoise(wb))
        ws.column(18).setWidth(10);

        ws.cell(4, 19).string("Nights").style(bgTurquoise(wb))
        ws.column(19).setWidth(4);

        ws.cell(4, 20).string("Amount").style(bgTurquoise(wb))
        ws.column(20).setWidth(11);

        ws.cell(4, 21).string("Telephone/Note").style(bgTurquoise(wb))
        ws.column(21).setWidth(15);

        ws.cell(4, 22).string("Laundry").style(bgTurquoise(wb))
        ws.column(22).setWidth(10);

        ws.cell(4, 23).string("Minibar").style(bgTurquoise(wb))
        ws.column(23).setWidth(10);

        ws.cell(4, 24).string("Pickup/Transfer or Tour").style(bgTurquoise(wb))
        ws.column(24).setWidth(10);

        ws.cell(4, 25).string("Other Hotel").style(bgTurquoise(wb))
        ws.column(25).setWidth(11);

        ws.cell(4, 26).string("Lunch/Dinning").style(bgTurquoise(wb))
        ws.column(26).setWidth(11);

        ws.cell(4, 27).string("Other").style(bgTurquoise(wb))
        ws.column(27).setWidth(11);

        ws.cell(4, 28).string("Sub").style(bgTurquoise(wb))
        ws.column(28).setWidth(12);

        // title => AZUMAYA
        //bgTurquoise(wb) 
        ws.cell(3, 29, 3, 32, true).string("SERVICE").style(bgOrange(wb))

        ws.cell(4, 29).string("BreakFast").style(bgOrange(wb))
        ws.column(29).setWidth(11);

        ws.cell(4, 30).string("Sauna").style(bgOrange(wb))
        ws.column(30).setWidth(11);

        ws.cell(4, 31).string("Massage").style(bgOrange(wb))
        ws.column(31).setWidth(11);

        ws.cell(4, 32).string("Total").style(bgOrange(wb))
        ws.column(32).setWidth(11);

        // title => Guest Pay by Cash
        ws.cell(3, 33, 3, 35, true).string("Guest Pay by Cash").style(bgBlue(wb))
        ws.cell(4, 33).string("VND").style(bgBlue(wb))
        ws.column(33).setWidth(11);
        ws.cell(4, 34).string("USD").style(bgBlue(wb))
        ws.column(34).setWidth(11);
        ws.cell(4, 35).string("JPY").style(bgBlue(wb))
        ws.column(35).setWidth(11);

        // title => Guest Pay by Card
        ws.cell(3, 36, 3, 39, true).string("Guest Pay by Cash").style(bgBlue(wb))
        ws.cell(4, 36).string("VND(Vcb)").style(bgBlue(wb))
        ws.column(36).setWidth(11);
        ws.cell(4, 37).string("USD(Vcb)").style(bgBlue(wb))
        ws.column(37).setWidth(11);
        ws.cell(4, 38).string("VND(Bidv)").style(bgBlue(wb))
        ws.column(38).setWidth(11);
        ws.cell(4, 39).string("Other Pay").style(bgBlue(wb))
        ws.column(39).setWidth(11);

        //accSum 
        var sumIndex = 0;
        var startTotal = 5;

        if (type === "oneDay") {
            makeColumSum(accDebit);
            sumIndex = sumIndex + 1;
            makeColumTotal(5);
        } else {
            makeColumSum(accDebit);
            // when end on day -> +1 total
            // sumIndex = sumIndex + 1;
            makeColumTotal(startTotal + 5);
        };

        function makeColumSum(dataMake) {
            dataMake.forEach((item, index) => {
                var { style } = item; // take style on item
                if (!style) {
                    style = {
                        HI: { color: "", backgroundColor: "" },
                        SI: { color: "", backgroundColor: "" },
                        Service: { color: "", backgroundColor: "" },
                        Discount: { color: "", backgroundColor: "" },
                        Name: { color: "", backgroundColor: "" },
                        Room: { color: "", backgroundColor: "" },
                        CheckIn: { color: "", backgroundColor: "" },
                        CheckOut: { color: "", backgroundColor: "" },
                        UnitPrice: { color: "", backgroundColor: "" },
                        Telephone: { color: "", backgroundColor: "" },
                        Total: { color: "", backgroundColor: "" },
                    }
                }

                sumIndex = sumIndex + 1;
                if (!item.sum_credit) {
                    ws.cell(5 + sumIndex, 1)
                        .string("")
                        .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                } else {
                    ws.cell(5 + sumIndex, 1)
                        .string(item.sum_credit)
                        .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                }
                ws.cell(5 + sumIndex, 2)
                    .string(item.HI)
                    .style(styleNumberWithBg(style.HI.backgroundColor, wb, style.HI.color))
                ws.cell(5 + sumIndex, 3)
                    .string(item.SI)
                    .style(styleNumberWithBg(style.SI.backgroundColor, wb, style.SI.color))
                ws.cell(5 + sumIndex, 4)
                    .string(!item["BF"] ? "" : item["BF"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 5)
                    .string(!item["BT"] ? "" : item["BT"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 6)
                    .string(!item["BF & BT"] ? "" : item["BF & BT"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 7)
                    .string(!item["MS 40P"] ? "" : item["MS 40P"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 8)
                    .string(!item["MS 70P"] ? "" : item["MS 70P"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 9)
                    .string(!item["MS 100P"] ? "" : item["MS 100P"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 10)
                    .string(!item["MS 70P & BT"] ? "" : item["MS 70P & BT"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 11)
                    .string(!item["HMS 70P"] ? "" : item["HMS 70P"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 12)
                    .string(!item["HMS 100P"] ? "" : item["HMS 100P"])
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color))
                ws.cell(5 + sumIndex, 13)
                    .number(Number(item.discount.replace('$', '')))
                    .style(styleNumberWithBg(style.Discount.backgroundColor, wb, style.Discount.color))
                ws.cell(5 + sumIndex, 14)
                    .string(item.name)
                    .style(styleNumberWithBg(style.Name.backgroundColor, wb, style.Name.color))
                ws.cell(5 + sumIndex, 15)
                    .string(item.room)
                    .style(styleNumberWithBg(style.Room.backgroundColor, wb, style.Room.color))
                ws.cell(5 + sumIndex, 16)
                    .string(item.checkin === "" ? "" : supportDate.changeDateToDDMM(item.checkin))
                    .style(styleNumberWithBg(style.CheckIn.backgroundColor, wb, style.CheckIn.color))
                ws.cell(5 + sumIndex, 17)
                    .string(item.checkout === "" ? "" : supportDate.changeDateToDDMM(item.checkout))
                    .style(styleNumberWithBg(style.CheckOut.backgroundColor, wb, style.CheckOut.color))
                // Azumaya area
                ws.cell(5 + sumIndex, 18)
                    .formula(`M${5 + sumIndex} * ${(item.rate === "" || item.rate === undefined) ? 0 : item.rate}`)
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color, '#,##0.000_);(#,##0.000)'));
                if (typeof item.nights === "number") {
                    ws.cell(5 + sumIndex, 19).number(item.nights)
                        .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color));
                } else ws.cell(5 + sumIndex, 19).string(item.nights)
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color));

                ws.cell(5 + sumIndex, 20)
                    .formula(`R${5 + sumIndex} * S${5 + sumIndex}`)
                    .style(styleNumberWithBg(style.Service.backgroundColor, wb, style.Service.color, '#,##0.000_);(#,##0.000)'));
                ws.cell(5 + sumIndex, 21)
                    .string(item.telephone).style(styleNumber000(wb))
                // laundry
                if (changeStringToNumber(item.laundry) !== 0) {
                    ws.cell(5 + sumIndex, 22).number(changeStringToNumber(item.laundry) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 22).string(item.laundry).style(styleNumber000(wb))

                // minibar
                if (changeStringToNumber(item.minibar) !== 0) {
                    ws.cell(5 + sumIndex, 23).number(changeStringToNumber(item.minibar) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 23).string(item.minibar).style(styleNumber000(wb))

                // transfer
                if (changeStringToNumber(item.transfer) !== 0) {
                    ws.cell(5 + sumIndex, 24).number(changeStringToNumber(item.transfer) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 24).string(item.transfer).style(styleNumber000(wb))

                // Other hotel
                if (item.other_hotel === undefined) {
                    ws.cell(5 + sumIndex, 25).string("").style(styleNumber000(wb));
                } else if (changeStringToNumber(item.other_hotel) !== 0) {
                    ws.cell(5 + sumIndex, 25).number(changeStringToNumber(item.other_hotel) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 25).string(item.other_hotel).style(styleNumber000(wb))

                // dinning
                if (changeStringToNumber(item.dinning) !== 0) {
                    ws.cell(5 + sumIndex, 26).number(changeStringToNumber(item.dinning) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 26).string(item.dinning).style(styleNumber000(wb))

                // others
                if (changeStringToNumber(item.others) !== 0) {
                    ws.cell(5 + sumIndex, 27).number(changeStringToNumber(item.others) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 27).string(item.others).style(styleNumber000(wb))

                ws.cell(5 + sumIndex, 28)
                    .formula(`SUM(T${5 + sumIndex}: AA${5 + sumIndex})`).style(styleNumber000(wb))

                // Service area
                // breakfast
                if (changeStringToNumber(item.breakfast) !== 0) {
                    ws.cell(5 + sumIndex, 29).number(changeStringToNumber(item.breakfast) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 29).string(item.breakfast).style(styleNumber000(wb))

                // sauna
                if (changeStringToNumber(item.sauna) !== 0) {
                    ws.cell(5 + sumIndex, 30).number(changeStringToNumber(item.sauna) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 30).string(item.sauna).style(styleNumber000(wb))

                // massage
                if (changeStringToNumber(item.massage) !== 0) {
                    ws.cell(5 + sumIndex, 31).number(changeStringToNumber(item.massage) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 31).string(item.massage).style(styleNumber000(wb))

                ws.cell(5 + sumIndex, 32)
                    .formula(`SUM(AB${5 + sumIndex}: AE${5 + sumIndex})`).style(styleNumber000(wb))

                // Guest pay by Cash
                /// vnd
                if (changeStringToNumber(item.vnd) !== 0) {
                    ws.cell(5 + sumIndex, 33).number(changeStringToNumber(item.vnd) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 33).string(item.vnd).style(styleNumber000(wb))

                /// usd
                if (changeStringToNumber(item.usd) !== 0) {
                    ws.cell(5 + sumIndex, 34).number(changeStringToNumber(item.usd) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 34).string(item.usd).style(styleNumber000(wb))

                /// yen
                if (changeStringToNumber(item.yen) !== 0) {
                    ws.cell(5 + sumIndex, 35).number(changeStringToNumber(item.yen) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 35).string(item.yen).style(styleNumber000(wb))

                // Guest pay by Card
                //vcb
                if (changeStringToNumber(item.vcb) !== 0) {
                    ws.cell(5 + sumIndex, 36).number(changeStringToNumber(item.vcb) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 36).string(item.vcb).style(styleNumber000(wb))

                /// vcb_usd
                if (changeStringToNumber(item.vcb_usd) !== 0) {
                    ws.cell(5 + sumIndex, 37).number(changeStringToNumber(item.vcb_usd) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 37).string(item.vcb_usd).style(styleNumber000(wb))

                /// vcb_other
                if (changeStringToNumber(item.vcb_other) !== 0) {
                    ws.cell(5 + sumIndex, 38).number(changeStringToNumber(item.vcb_other) / 1000).style(styleNumber000(wb))
                } else ws.cell(5 + sumIndex, 38).string(item.vcb_other).style(styleNumber000(wb))

                // ws.cell(5 + sumIndex , 38)
                //     .number(changeStringToNumber(item.otherPay) / 1000).style(styleNumber000(wb))
                ws.cell(5 + sumIndex, 39)
                    .string(item.otherPay)
                    .style(styleNumberWithBg("", wb, "", ''));

                if (type !== "oneDay") {
                    if (index < accDebit.length - 1) {
                        if ((index < accDebit.length - 1 && accDebit[index + 1].sum_credit !== accDebit[index].sum_credit) || index === accDebit.length - 1) {
                            sumIndex = sumIndex + 1;
                            if (startTotal === 5) {
                                makeColumTotal(5);
                                startTotal = sumIndex + 1;
                            } else {
                                makeColumTotal(startTotal + 5);
                                startTotal = sumIndex + 1;
                            }
                            // makeColumTotal(sumIndex);
                        }
                    }
                }
            });

        }

        // Make row Total 
        function makeColumTotal(start) {
            ws.cell(5 + sumIndex, 1, 5 + sumIndex, 15)
                .string("").style(styleNumberTotal(wb))
            ws.cell(5 + sumIndex, 14)
                .string("SUB").style(styleNumberTotal(wb))
            ws.cell(5 + sumIndex, 15, 5 + sumIndex, 20)
                .string("").style(styleNumberTotal(wb))
            ws.cell(5 + sumIndex, 19)
                .formula(`SUM(S${start}: S${5 + sumIndex - 1})`)
                .style(styleNumberTotal(wb)) // night
            ws.cell(5 + sumIndex, 20)
                .formula(`SUM(T${start}: T${5 + sumIndex - 1})`)
                //  .style(styleNumberTotal(wb)) // amount
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // #FF99CC = pink
            ws.cell(5 + sumIndex, 21)
                .formula(`SUM(U${start}: U${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // telephone
            ws.cell(5 + sumIndex, 22)
                .formula(`SUM(V${start}: V${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // laundry
            ws.cell(5 + sumIndex, 23)
                .formula(`SUM(W${start}: W${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // minibar
            ws.cell(5 + sumIndex, 24)
                .formula(`SUM(X${start}: X${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // tranfer
            ws.cell(5 + sumIndex, 25)
                .formula(`SUM(Y${start}: Y${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // other hotel
            ws.cell(5 + sumIndex, 26)
                .formula(`SUM(Z${start}: Z${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // dinning
            ws.cell(5 + sumIndex, 27)
                .formula(`SUM(AA${start}: AA${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // Other
            // ws.cell(5 + sumIndex, 28)
            //     .formula(`SUM(AA${start}: AA${5 + sumIndex - 1})`)
            //     .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // SUb
            ws.cell(5 + sumIndex, 28)
                .formula(`SUM(AB${start}: AB${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // sub 
            ws.cell(5 + sumIndex, 29)
                .formula(`SUM(AC${start}: AC${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // breakfast 
            ws.cell(5 + sumIndex, 30)
                .formula(`SUM(AD${start}: AD${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // sauna
            ws.cell(5 + sumIndex, 31)
                .formula(`SUM(AE${start}: AE${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // massage
            ws.cell(5 + sumIndex, 32)
                .formula(`SUM(AF${start}: AF${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // total 
            ws.cell(5 + sumIndex, 33)
                .formula(`SUM(AG${start}: AG${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // guest pay by vnd 
            ws.cell(5 + sumIndex, 34)
                .formula(`SUM(AH${start}: AH${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // guest pay by usd
            ws.cell(5 + sumIndex, 35)
                .formula(`SUM(AI${start}: AI${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // guest pay by jpy 
            ws.cell(5 + sumIndex, 36)
                .formula(`SUM(AJ${start}: AJ${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // guest pay by vcb(vnd) 
            ws.cell(5 + sumIndex, 37)
                .formula(`SUM(AK${start}: AK${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // guest pay by vcb(usd) 
            ws.cell(5 + sumIndex, 38)
                .formula(`SUM(AL${start}: AL${5 + sumIndex - 1})`)
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  //  guest pay by bidv
            ws.cell(5 + sumIndex, 39)
                .string("")
                .style(styleNumberWithBg("#FF99CC", wb, "", "#,##0.000"))  // other pay (note) 
        }

        // .formula(`SUM(AP5: AP${5 + lengthSum - 1})`)
        // .style(styleNumberTotal(wb)) // guest pay by other pay

        const branchSortName = CONSTANTS.branchNumberToShortName["" + branchOnData.branchID];
        wb.writeToBuffer().then(function (buffer) {
            const path = `./filereport/acc_sum/${branchSortName}_AccSumDay.xlsx`;
            fs.createWriteStream(path).write(buffer);
        });

        //    return wb.write(`${branchOnData.name}_ManagerTotal.xlsx`, res);
    },
    acc_staff: (accStaff, branchOnData, res) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('acc staff');

        ws.cell(1, 1, 1, 11, true)
            .string("ACC STAFF")
            .style(styleTitle(wb));

        // Title
        ws.cell(3, 1, 4, 1, true).string("Date").style(bgOrange(wb));
        ws.cell(3, 2, 4, 2, true).string("Invoice").style(bgOrange(wb))
        ws.cell(3, 3, 4, 3, true).string("Name").style(bgOrange(wb))
        ws.cell(3, 4, 4, 4, true).string("DEPARTMENT").style(bgOrange(wb))
        ws.cell(3, 5, 4, 5, true).string("MISTAKES").style(bgOrange(wb))

        ws.cell(3, 6, 3, 7, true).string("OWES").style(bgOrange(wb))
        ws.cell(4, 6).string("VND").style(bgOrange(wb));
        ws.cell(4, 7).string("USD").style(bgOrange(wb));

        ws.cell(3, 8, 3, 9, true).string("OVER").style(bgOrange(wb))
        ws.cell(4, 8).string("VND").style(bgOrange(wb));
        ws.cell(4, 9).string("USD").style(bgOrange(wb));

        ws.cell(3, 10, 4, 10, true).string("PROCESSING").style(bgOrange(wb))
        ws.cell(3, 11, 4, 11, true).string("Note").style(bgOrange(wb))

        ws.column(4).setWidth(13);
        ws.column(5).setWidth(50);
        ws.column(6).setWidth(15);
        ws.column(7).setWidth(15);
        ws.column(8).setWidth(15);
        ws.column(9).setWidth(15);
        ws.column(10).setWidth(25);
        ws.column(11).setWidth(25);

        accStaff.forEach((item, index) => {
            ws.cell(5 + index, 1)
                .string(item.date)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 2)
                .string(item.invoice)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 3)
                .string(item.name)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 4)
                .string(item.department)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 5)
                .string(item.mistake)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 6)
                .string(item.owesVND)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 7)
                .string(item.owesUSD)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 8)
                .string(item.overVND)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 9)
                .string(item.overUSD)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 10)
                .string(item.processing)
                .style(bgAntiqueWhite(wb));
            ws.cell(5 + index, 11)
                .string(item.note)
                .style(bgAntiqueWhite(wb));
        })

        const branchSortName = CONSTANTS.branchNumberToShortName["" + branchOnData.branchID];
        wb.writeToBuffer().then(function (buffer) {
            const path = `./filereport/acc_sum/${branchSortName}_acc_staff.xlsx`;
            fs.createWriteStream(path).write(buffer);
        });
    },
    mam_expected: (expectedData, month, branchOnData,
        sumRate, sumRoom, averageExpected,
        manSumData, date, branch) => {
        const dateSelected = new Date(month);
        const getMonth = dateSelected.getMonth() + 1;
        const { listRoom, serviceRate, name: nameBranch } = branchOnData;
        const roomTotal = branchOnData.room;
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('Expected');
        ws.cell(1, 8, 1, 18, true)
            .string("Manager Expected Report " + month)
            .style(styleTitle(wb));

        ws.cell(3, 1)
            .string("CUSTOMER")
            .style(bgAntiqueWhite(wb));

        ws.cell(3, 2)
            .string("Month: " + averageExpected.monthGuest.avg + "%\n Total: " + averageExpected.monthGuest.sum)
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 3, 3, 5, true)
            .string("CAPACITY")
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 6, 3, 8, true)
            .string("Month: " + averageExpected.monthAvg.avg)
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 9, 3, 11, true)
            .string("Week 1: " + averageExpected.week1.avg + "%\n" + renderWeekStartEnd(averageExpected.week1.start, averageExpected.week1.end, getMonth))
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 12, 3, 14, true)
            .string("Week 2: " + averageExpected.week2.avg + "%\n" + renderWeekStartEnd(averageExpected.week2.start, averageExpected.week2.end, getMonth))
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 15, 3, 17, true)
            .string("Week 3: " + averageExpected.week3.avg + "%\n" + renderWeekStartEnd(averageExpected.week3.start, averageExpected.week3.end, getMonth))
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 18, 3, 20, true)
            .string("Week 4: " + averageExpected.week4.avg + "%\n" + renderWeekStartEnd(averageExpected.week4.start, averageExpected.week4.end, getMonth))
            .style(bgAntiqueWhite(wb));
        ws.cell(3, 21, 3, 23, true)
            .string("Week 5: " + averageExpected.week5.avg + "%\n" + renderWeekStartEnd(averageExpected.week5.start, averageExpected.week5.end, getMonth))
            .style(bgAntiqueWhite(wb));

        ws.cell(4, 1, 5, 1, true)
            .string("ROOM")
            .style(bgAntiqueWhite(wb));
        ws.cell(4, 2, 5, 2, true)
            .string("DATE")
            .style(bgAntiqueWhite(wb));

        var monthEx = new Date(month);
        var d = new Date(2021, monthEx.getMonth() + 1, 0);
        var endDayMonth = d.getDate()
        var columRoomNumber;
        // Render day / day
        function renderDayOfMonth() {
            for (var i = 1; i <= endDayMonth; i++) {
                var findDayOfWeek = new Date();
                findDayOfWeek.setDate(i);
                findDayOfWeek.setMonth(monthEx.getMonth());
                ws.cell(4, i + 2)
                    .string(supportDate.switchDayToText(findDayOfWeek.getDay()))
                    .style(bgAntiqueWhite(wb));
                ws.cell(5, i + 2)
                    .string("" + i)
                    .style(bgAntiqueWhite(wb));
            }
        }
        renderDayOfMonth();

        function renderItem() {
            const listKey = Object.keys(listRoom);
            var columRoomType = 6;
            columRoomNumber = 0;
            listKey.map((item, index) => {

                {/* Room type */ }
                ws.cell(columRoomType, 1, columRoomType + listRoom[item].length - 1, 1, true)
                    .string(item)
                    .style(swiftList(index));
                // <div className={"expected-day rp__size-l"}>{item}</div>
                renderRoom(listRoom[item], index)
                columRoomType += listRoom[item].length;
            })
        }
        renderItem();

        function renderRoom(rooms, indexRoomType) {
            rooms.map((room, index) => {
                ws.cell(6 + columRoomNumber, 2)
                    .string(room)
                    .style(swiftList(indexRoomType));
                renderDayData(room, columRoomNumber, indexRoomType)
                columRoomNumber += 1;
            });
        }

        function renderDayData(roomNumber, columRoomNumber2, indexRomNumberList) {
            for (var ij = 1; ij <= endDayMonth; ij++) {
                var dd = String(ij).padStart(2, '0');
                var comment2 = null;
                if (expectedData[roomNumber] !== undefined) {
                    if (dd in expectedData[roomNumber]) {
                        //    comment2 = expectedData[roomNumber][dd].comment;
                        ws.cell(6 + columRoomNumber2, 2 + ij)
                            .string(String(expectedData[roomNumber][dd].rate))
                            .style(expectedData[roomNumber][dd].comment !== "" ? bgBlue(wb) : swiftList(indexRomNumberList));
                        if (expectedData[roomNumber][dd].comment !== "") ws.cell(6 + columRoomNumber2, 2 + ij).comment(expectedData[roomNumber][dd].comment)
                    } else {
                        ws.cell(6 + columRoomNumber2, 2 + ij)
                            .string("")
                            .style(swiftList(indexRomNumberList));
                    }
                } else {
                    ws.cell(6 + columRoomNumber2, 2 + ij)
                        .string("")
                        .style(swiftList(indexRomNumberList));
                }
            }
        }

        function swiftList(indexRomNumberList) {
            if (indexRomNumberList % 2 === 0) {
                //bg_yellow
                return bgYellow(wb);
            } else if (indexRomNumberList % 3 === 0) {
                //bg_pink_sakura_color
                return bgPinkSakura(wb);
            } else if (indexRomNumberList % 5 === 0) {
                //bg_orange_color
                return bgOrange(wb);
            } else {
                return bgGreen(wb);
            }
        }

        // row TOTAL
        ws.cell(7 + roomTotal, 1)
            .string("")
            .style(bgGreen(wb));
        ws.cell(7 + roomTotal, 2)
            .string("Total")
            .style(bgGreen(wb));

        ws.cell(8 + roomTotal, 1)
            .string("")
            .style(bgGreen(wb));
        ws.cell(8 + roomTotal, 2)
            .string("Total")
            .style(bgGreen(wb));
        ws.cell(9 + roomTotal, 1, 9 + roomTotal, 2, true)
            .string("Capacity Utilization")
            .style(bgGreen(wb));
        ws.cell(10 + roomTotal, 1, 10 + roomTotal, 2, true)
            .string("Over Booking")
            .style(bgGreen(wb));

        function renderSumTotalFooter() {
            for (var i = 1; i <= endDayMonth; i++) {
                ws.cell(7 + roomTotal, 2 + i)
                    .formula(`ROUND(${sumRate[i]}, 2)`)
                    .style(bgGreen(wb));

                ws.cell(8 + roomTotal, 2 + i)
                    .string("" + sumRoom[i])
                    .style(bgGreen(wb));
                ws.cell(9 + roomTotal, 2 + i)
                    .string("" + Math.round((sumRoom[i] / roomTotal) * 10000) / 100 + "%")
                    .style(bgGreen(wb));
            }
        }
        renderSumTotalFooter();

        // setup row / column   
        ws.row(5).freeze()

        ws.column(1).setWidth(15);
        ws.column(2).setWidth(18);
        for (let i = 3; i < 34; i++) {
            ws.column(i).setWidth(7);
        }
        // Manager 
        var ws2 = wb.addWorksheet('Man Sum');

        ws2.cell(1, 1, 1, 6, true)
            .string("Manager Sum Report " + supportDate.changeDateToString2(date))
            .style(styleTitle(wb));
        ws2.cell(3, 1).string("Hotel").style(bgNone(wb));
        ws2.cell(3, 2).string("Hotel").style(bgNone(wb));
        ws2.cell(3, 3).string("Invoice#").style(bgNone(wb));
        ws2.cell(3, 4, 3, 6, true).string("" + manSumData.listHI).style(bgYellow(wb));

        ws2.cell(4, 1).string("Servicel").style(bgNone(wb));
        ws2.cell(4, 2).string("").style(bgNone(wb));
        ws2.cell(4, 3).string("Invoice#").style(bgNone(wb));
        ws2.cell(4, 4, 4, 6, true).string("" + manSumData.listSI).style(bgYellow(wb));

        ws2.cell(6, 1, 6, 2, true).string("Today's Sales").style(bgGreen(wb));
        ws2.cell(6, 3)
            .formula("SUM(E12,E26,E47)")
            .style(styleNumberWithBg("#ffff00", wb)); // yellow
        ws2.cell(6, 4, 6, 6, true)
            .formula("F12")
            .style(styleNumberUSD(wb));

        ws2.cell(7, 1, 7, 2, true).string("Fixed Expense").style(bgNone(wb));
        ws2.cell(7, 3, 7, 6, true)
            .number(branchOnData.totalProfit)
            .style(styleNumberWithBg("#FFFFFF", wb)); // non collor

        ws2.cell(8, 1, 8, 2, true).string("Total profit	").style(bgNone(wb));
        ws2.cell(8, 3, 8, 6, true)
            .formula(`(SUM(C6) + (D6 * ${branchOnData.sumRate})) - C7`)
            .style(styleNumberWithBg("#FFFFFF", wb)); // non collor
        // skip row 9
        // row 10
        let totalCustomers = Number(manSumData.day_customers) + Number(manSumData.late_customers) / 2
        //-----<Hotel>-----

        ws2.cell(10, 1, 10, 2, true).string("<Hotel>").style(bgGreen(wb));
        ws2.cell(10, 3).string("Capacity Utilization").style(bgPinkSakura);
        ws2.cell(10, 4).string("" + Math.round((totalCustomers / Number(roomTotal)) * 10000) / 100 + "%").style(bgPinkSakura);
        ws2.cell(10, 5).string("").style(bgNone(wb));
        ws2.cell(10, 6).string("").style(bgNone(wb));

        // row 11 & 12
        ws2.cell(11, 1, 12, 2, true).string("Total").style(bgNone(wb));
        ws2.cell(11, 3, 12, 3, true).string("# of Customers:").style(bgNone(wb));
        ws2.cell(11, 4).string("" + totalCustomers).style(bgNone(wb));
        ws2.cell(11, 5).string("").style(bgNone(wb));
        ws2.cell(11, 6).string("").style(bgNone(wb));

        ws2.cell(12, 4).string("TOTAL SALES:").style(bgOrange(wb));
        ws2.cell(12, 5)
            .formula(`SUM(D16, D18, D20, D22)`)
            .style(styleNumberWithBg("#FFFF00", wb)); // yellow
        ws2.cell(12, 6).formula(`SUM(E13: E22)`)
            .style(bgBlue(wb));
        // row 13
        ws2.cell(13, 1).string("").style(bgNone(wb));
        ws2.cell(13, 2, 16, 2, true).string("Day").style(bgNone(wb));
        ws2.cell(13, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(13, 4).number(Number(manSumData.day_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(13, 5).string("").style(bgNone(wb));
        ws2.cell(13, 6).string("").style(bgNone(wb));
        // row 14
        ws2.cell(14, 1).string("").style(bgNone(wb));
        ws2.cell(14, 2).string("").style(bgNone(wb));
        ws2.cell(14, 3).string("# of Check In").style(bgNone(wb));
        ws2.cell(14, 4).number(Number(manSumData.day_checkin)).style(bgNone(wb));
        ws2.cell(14, 5).string("").style(bgNone(wb));
        ws2.cell(14, 6).string("").style(bgNone(wb));
        // row 15
        ws2.cell(15, 1).string("").style(bgNone(wb));
        ws2.cell(15, 2).string("").style(bgNone(wb));
        ws2.cell(15, 3).string("# of Check out").style(bgNone(wb));
        ws2.cell(15, 4).number(Number(manSumData.day_checkout)).style(bgNone(wb));
        ws2.cell(15, 5).string("").style(bgNone(wb));
        ws2.cell(15, 6).string("").style(bgNone(wb));
        // row 16
        ws2.cell(16, 1).string("").style(bgNone(wb));
        ws2.cell(16, 2).string("").style(bgNone(wb));
        ws2.cell(16, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(16, 4).number(manSumData.day_sale_vnd).style(styleNumber(wb));
        ws2.cell(16, 5).number(Number(manSumData.day_sale_usd.replace("$", ""))).style(styleNumberUSD(wb));
        ws2.cell(16, 6).string("").style(bgNone(wb));
        // row 17
        ws2.cell(17, 1).string("").style(bgNone(wb));
        ws2.cell(17, 2).string("Late").style(bgNone(wb));
        ws2.cell(17, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(17, 4).number(Number(manSumData.late_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(17, 5).string("").style(styleNumberUSD(wb));
        ws2.cell(17, 6).string("").style(bgNone(wb));
        // row 18
        ws2.cell(18, 1).string("").style(bgNone(wb));
        ws2.cell(18, 2).string("").style(bgNone(wb));
        ws2.cell(18, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(18, 4).number(manSumData.late_sale_vnd).style(bgNone(wb));
        ws2.cell(18, 5).number(Number(manSumData.late_sale_usd.replace("$", ""))).style(styleNumberUSD(wb));
        ws2.cell(18, 6).string("").style(bgNone(wb));
        // row 19
        ws2.cell(19, 1).string("").style(bgNone(wb));
        ws2.cell(19, 2).string("Short").style(bgNone(wb));
        ws2.cell(19, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(19, 4).number(Number(manSumData.short_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(19, 5).string("").style(bgNone(wb));
        ws2.cell(19, 6).string("").style(bgNone(wb));
        // row 20
        ws2.cell(20, 1).string("").style(bgNone(wb));
        ws2.cell(20, 2).string("").style(bgNone(wb));
        ws2.cell(20, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(20, 4).number(manSumData.short_sale_vnd).style(bgNone(wb));
        ws2.cell(20, 5).number(Number(manSumData.short_sale_usd.replace("$", ""))).style(styleNumberUSD(wb));
        ws2.cell(20, 6).string("").style(bgNone(wb));
        // row 21
        ws2.cell(21, 1).string("").style(bgNone(wb));
        ws2.cell(21, 2).string("Other hotel").style(bgNone(wb));
        ws2.cell(21, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(21, 4).number(manSumData.Other_hotel_customers).style(bgAntiqueWhite(wb));
        ws2.cell(21, 5).string("").style(bgNone(wb));
        ws2.cell(21, 6, 22, 6, true).string("").style(bgNone(wb));
        // row 22
        ws2.cell(22, 1).string("").style(bgNone(wb));
        ws2.cell(22, 2).string("").style(bgNone(wb));
        ws2.cell(22, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(22, 4).number(manSumData.Other_hotel_customers_vnd).style(bgNone(wb));
        ws2.cell(22, 5).number(Number(manSumData.Other_hotel_customers_usd === 0 ? 0 : manSumData.Other_hotel_customers_usd.replace("$", "")))
            .style(styleNumberUSD(wb));
        ws2.cell(22, 6).string("" + renderNote(manSumData.Other_hotel_customers_note)).style(bgNone(wb));

        if (CONSTANTS.listBranchNoMassager.includes(branch) === false) {
            // row 23 skip
            const totalCustomerMassageTVL1 = Number(manSumData.massage_set40_guest) + Number(manSumData.massage_set70_guest) +
                Number(manSumData.massage_set100_guest)
            const totalCustomersMassage = Number(manSumData.massage100m_customers) + Number(manSumData.massage70m_customers)
                + Number(manSumData.massage100m_guest) + Number(manSumData.massage70m_guest)
                + Number(manSumData.massage40m_guest) + Number(manSumData.massage_free) +
                (branch === 1 ? totalCustomerMassageTVL1 : Number(manSumData.massage_set_guest))

            ws2.cell(23, 1, 23, 6, true).string("").style(bgNone(wb));
            // -----<MASSAGE>-----
            ws2.cell(24, 1, 24, 2, true).string("<MASSAGE>").style(bgGreen(wb));
            ws2.cell(24, 3).string("Capacity Utilization").style(bgPinkSakura);
            ws2.cell(24, 4).string("" + Math.round((totalCustomersMassage / roomTotal) * 10000) / 100 + '%').style(bgPinkSakura);
            ws2.cell(24, 5).string("").style(bgNone(wb));
            ws2.cell(24, 6).string("").style(bgNone(wb));

            // row 26 & 25
            ws2.cell(25, 1, 26, 2, true).string("Total").style(bgNone(wb));
            ws2.cell(25, 3, 26, 3, true).string("# of Customers:").style(bgNone(wb));
            ws2.cell(25, 4)
                .formula('SUM(D27,D29,D31,D33,D35,D37,D39,D41,D43)')
                .style(bgNone(wb));
            ws2.cell(25, 5).string("").style(bgNone(wb));
            ws2.cell(25, 6).string("").style(bgNone(wb));

            ws2.cell(26, 4).string("TOTAL SALES:").style(bgOrange(wb));
            ws2.cell(26, 5)
                .formula("SUM(D28,D30,D32,D34,D36,D38,D40,D42)")
                .style(styleNumberWithBg("#ffff00", wb));
            ws2.cell(26, 6)
                .formula('SUM(E28:E43)')
                .style(bgBlue(wb));

            // row 27 & 28 & 29
            ws2.cell(27, 1).style(bgNone(wb));
            ws2.cell(27, 2, 30, 2, true).string("100min").style(bgOrange(wb));
            ws2.cell(27, 3).string("# of Customers:").style(bgNone(wb));
            ws2.cell(27, 4).number(Number(manSumData.massage100m_customers)).style(bgAntiqueWhite(wb));
            ws2.cell(27, 5).string("").style(bgNone(wb));
            ws2.cell(27, 6, 28, 6, true).string(renderNote(manSumData.massage100m_hotel_note)).style(bgNone(wb));

            ws2.cell(28, 1).string("").style(bgNone(wb));
            ws2.cell(28, 3)
                .string("Sales: " + serviceRate.massage_100.toLocaleString() + " (10%)")
                .style(bgNone(wb));
            ws2.cell(28, 4)
                .number(Number(manSumData.massage100m_customers * (serviceRate.massage_100 * 0.9)))
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(28, 5)
                .number(manSumData.massage100m_cus_sale_usd === 0
                    ? 0
                    : manSumData.massage100m_cus_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            ws2.cell(29, 1).string("").style(bgNone(wb));
            ws2.cell(29, 3).string("# of Customers:	").style(bgNone(wb));
            ws2.cell(29, 4).number(Number(manSumData.massage100m_guest)).style(bgAntiqueWhite(wb));
            ws2.cell(29, 6, 30, 6, true).string("" + renderNote(manSumData.massage100m_guest_note)).style(bgNone(wb));

            ws2.cell(30, 1).string("").style(bgNone(wb));
            ws2.cell(30, 3).string("Sales: " + serviceRate.massage_100.toLocaleString()).style(bgNone(wb));
            ws2.cell(30, 4)
                .number(Number(manSumData.massage100m_guest * serviceRate.massage_100))
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(30, 5)
                .number(manSumData.massage100m_guest_sale_usd === 0
                    ? 0
                    : manSumData.massage100m_guest_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            // row 31 32 33 34
            ws2.cell(31, 1).string("").style(bgNone(wb));
            ws2.cell(31, 2, 34, 2, true).string("70min").style(bgBlue(wb));
            ws2.cell(31, 3).string("# of Customers:").style(bgNone(wb));
            ws2.cell(31, 4).number(Number(manSumData.massage70m_customers))
                .style(bgAntiqueWhite(wb));
            ws2.cell(31, 5).string("").style(bgNone(wb));
            ws2.cell(31, 6, 32, 6, true).string("" + renderNote(manSumData.massage70m_hotel_note)).style(bgNone(wb));

            ws2.cell(32, 1).string("").style(bgNone(wb));
            ws2.cell(32, 3).string("Sales: " + serviceRate.massage_70.toLocaleString() + " (10%").style(bgNone(wb));
            ws2.cell(32, 4).number(Number(manSumData.massage70m_customers * serviceRate.massage_70 * 0.9))
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(32, 5).number(
                manSumData.massage70m_cus_sale_usd === 0
                    ? 0
                    : manSumData.massage70m_cus_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            ws2.cell(33, 1).string("").style(bgNone(wb));
            ws2.cell(33, 3).string("# of Customers:	").style(bgNone(wb));
            ws2.cell(33, 4)
                .number(Number(manSumData.massage70m_guest))
                .style(bgAntiqueWhite(wb));
            ws2.cell(33, 6, 34, 6, true).string("" + renderNote(manSumData.massage70m_guest_note)).style(bgNone(wb));

            ws2.cell(34, 1).string("").style(bgNone(wb));
            ws2.cell(34, 3).string("Sales: " + serviceRate.massage_70.toLocaleString()).style(bgNone(wb));
            ws2.cell(34, 4).number(Number(manSumData.massage70m_guest * serviceRate.massage_70))
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(34, 5).number(
                manSumData.massage70m_guest_sale_usd === 0
                    ? 0
                    : manSumData.massage70m_guest_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            // row 35 36 
            ws2.cell(35, 1).string("").style(bgNone(wb));
            ws2.cell(35, 2, 36, 2, true).string("40min").style(bgPinkSakura);
            ws2.cell(35, 3).string("# of Customers:").style(bgNone(wb));
            ws2.cell(35, 4)
                .number(Number(manSumData.massage40m_guest))
                .style(bgAntiqueWhite(wb));
            ws2.cell(35, 5).string("").style(bgNone(wb));
            ws2.cell(35, 6, 36, 6, true).string("" + renderNote(manSumData.massage40m_note)).style(bgNone(wb));

            ws2.cell(36, 1).string("").style(bgNone(wb));
            ws2.cell(36, 3).string("Sales: " + serviceRate.massage_40.toLocaleString()).style(bgNone(wb));
            ws2.cell(36, 4)
                .number(Number(manSumData.massage40m_guest * serviceRate.massage_40))
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(36, 5).number(
                manSumData.massage40m_sale_usd === 0
                    ? 0
                    : manSumData.massage40m_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            if (branch === 1) {
                // row 37 38  set area
                ws2.cell(37, 1).string("").style(bgNone(wb));
                ws2.cell(37, 2, 38, 2, true).string("Set 40min+ Rotenburo").style(bgCyan);
                ws2.cell(37, 3).string("# of Customers:").style(bgNone(wb));
                ws2.cell(37, 4).number(Number(manSumData.massage_set40_guest)).style(bgAntiqueWhite(wb));
                ws2.cell(37, 5).string("").style(bgNone(wb));
                ws2.cell(37, 6, 38, 6, true)
                    .string("" + renderNote(manSumData.massage_set40_guest_note))
                    .style(bgNone(wb));

                ws2.cell(38, 1).string("").style(bgNone(wb));
                ws2.cell(38, 3).string("Sales: " + serviceRate.massage_set40).style(bgNone(wb));
                ws2.cell(38, 4)
                    .number(serviceRate.massage_set40 * Number(manSumData.massage_set40_guest))
                    .style(styleNumberWithBg("#FAEBD7", wb));
                ws2.cell(38, 5).number(
                    manSumData.massage_set40_guest_sale_usd === 0
                        ? 0
                        : manSumData.massage_set40_guest_sale_usd.replace("$", ""))
                    .style(styleNumberUSD(wb));

                // row  41 42
                ws2.cell(41, 1).string("").style(bgNone(wb));
                ws2.cell(41, 2, 42, 2, true).string("Set 100min+ Rotenburo").style(bgCyan);
                ws2.cell(41, 3).string("# of Customers:").style(bgNone(wb));
                ws2.cell(41, 4).number(Number(manSumData.massage_set100_guest)).style(bgAntiqueWhite(wb));
                ws2.cell(41, 5).string("").style(bgNone(wb));
                ws2.cell(41, 6, 42, 6, true)
                    .string("" + renderNote(manSumData.massage_set100_guest_note))
                    .style(bgNone(wb));

                ws2.cell(42, 1).string("").style(bgNone(wb));
                ws2.cell(42, 3).string("Sales: " + serviceRate.massage_set100).style(bgNone(wb));
                ws2.cell(42, 4)
                    .number(serviceRate.massage_set100 * Number(manSumData.massage_set100_guest))
                    .style(styleNumberWithBg("#FAEBD7", wb));
                ws2.cell(42, 5).number(
                    manSumData.massage_set100_guest_sale_usd === 0
                        ? 0
                        : manSumData.massage_set100_guest_sale_usd.replace("$", ""))
                    .style(styleNumberUSD(wb));
            }

            // row 38 39
            ws2.cell(39, 1).string("").style(bgNone(wb));
            ws2.cell(39, 2, 40, 2, true).string("Set 70min+ Rotenburo").style(bgCyan);
            ws2.cell(39, 3).string("# of Customers:").style(bgNone(wb));
            ws2.cell(39, 4).number(branch === 1 ? Number(manSumData.massage_set70_guest)
                : Number(manSumData.massage_set_guest)).style(bgAntiqueWhite(wb));
            ws2.cell(39, 5).string("").style(bgNone(wb));
            ws2.cell(39, 6, 40, 6, true)
                .string("" + (branch === 1 ? manSumData.massage_set70_guest_note : manSumData.massage_set_guest_note))
                .style(bgNone(wb));

            ws2.cell(40, 1).string("").style(bgNone(wb));
            ws2.cell(40, 3).string("Sales: " + (branch === 1 ? serviceRate.massage_set70 : serviceRate.massage_set)).style(bgNone(wb));
            ws2.cell(40, 4).number(
                branch === 1 ? (serviceRate.massage_set70 * Number(manSumData.massage_set70_guest))
                    : (serviceRate.massage_set * Number(manSumData.massage_set_guest))
            )
                .style(styleNumberWithBg("#FAEBD7", wb));
            ws2.cell(40, 5).number(
                manSumData.massage_set70_guest_sale_usd === 0
                    ? 0
                    : manSumData.massage_set70_guest_sale_usd.replace("$", ""))
                .style(styleNumberUSD(wb));

            // row 43
            ws2.cell(43, 1).string("").style(bgNone(wb));
            ws2.cell(43, 2).string("FREE").style(bgNone(wb));
            ws2.cell(43, 3).string("# of Customers:").style(bgNone(wb));
            ws2.cell(43, 4).number(Number(manSumData.massage_free)).style(bgAntiqueWhite(wb));
            ws2.cell(43, 5).string("").style(bgNone(wb));
            ws2.cell(43, 6).string("" + renderNote(manSumData.massage_free_note)).style(bgNone(wb));
            // row 44 skip
            ws2.cell(44, 1, 44, 6, true).string("").style(bgNone(wb));
        }
        // -----<Other Service>-----
        const totalCustomersOtherService = Number(manSumData.BF_customers) + Number(manSumData.Roten_customers)
            + Number(manSumData.MiniBar_customers) + Number(manSumData.RentalCar_customers)
            + Number(manSumData.Laundry_customers) +
            + Number(manSumData.Other_customers) + Number(manSumData.Roten_set);
        // row 45
        ws2.cell(45, 1, 45, 2, true).string("<Other Service>").style(bgGreen(wb));
        ws2.cell(45, 3).string("Capacity Utilization").style(bgPinkSakura);
        ws2.cell(45, 4).string("" + Math.round((totalCustomersOtherService / roomTotal) * 10000) / 100 + '%').style(bgPinkSakura);
        ws2.cell(45, 5).string("").style(bgNone(wb));
        ws2.cell(45, 6).string("").style(bgNone(wb));

        // row 46 & 47
        ws2.cell(46, 1, 47, 2, true).string("Total").style(bgNone(wb));
        ws2.cell(46, 3, 47, 3, true).string("# of Customers:").style(bgNone(wb));
        ws2.cell(46, 4).number(totalCustomersOtherService).style(bgNone(wb));
        ws2.cell(46, 5).string("").style(bgNone(wb));
        ws2.cell(46, 6).string("").style(bgNone(wb));

        ws2.cell(47, 4).string("TOTAL SALES:").style(bgOrange(wb));
        ws2.cell(47, 5)
            .formula('SUM(D49,D52,D54,D60,D62,D64,D66)')
            .style(styleNumberWithBg("#FFFF00", wb));
        ws2.cell(47, 6)
            .formula('SUM(E49,E52,E54,E57,E60,E62,E64,E66)')
            .style(bgBlue(wb));

        // row 48 & 49 & 50
        ws2.cell(48, 1).string("").style(bgNone(wb));
        ws2.cell(48, 2, 50, 2, true).string("Break Fast").style(bgOrange(wb));
        ws2.cell(48, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(48, 4).number(Number(manSumData.BF_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(48, 5).string("").style(bgNone(wb));
        ws2.cell(48, 6, 50, 6, true).string("" + renderNote(manSumData.BF_note)).style(bgNone(wb));

        ws2.cell(49, 1).string("").style(bgNone(wb));
        ws2.cell(49, 3).string("Sales: " + serviceRate.break_fast).style(bgNone(wb));
        ws2.cell(49, 4)
            .number(branch === 1 ? Number(changeStringToNumber(manSumData.BF_sale_vnd)) : Number(manSumData.BF_customers) * serviceRate.break_fast)
            .style(bgAntiqueWhite(wb));
        ws2.cell(49, 5).number(
            manSumData.BF_sale_usd === 0 ? 0
                : manSumData.BF_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        ws2.cell(50, 1).string("").style(bgNone(wb));
        ws2.cell(50, 3).string("FREE").style(bgNone(wb));
        ws2.cell(50, 4).number(Number(manSumData.BF_free)).style(bgAntiqueWhite(wb));
        ws2.cell(50, 5).string("").style(bgNone(wb));

        // row 51 52 53 54 55
        ws2.cell(51, 1).string("").style(bgNone(wb));
        ws2.cell(51, 2, 55, 2, true).string("Rotenburo").style(bgAntiqueWhite(wb));
        ws2.cell(51, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(51, 4).number(Number(manSumData.Roten_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(51, 5).string("").style(bgNone(wb));
        ws2.cell(51, 6, 52, 6, true).string("" + renderNote(manSumData.Roten_note)).style(bgNone(wb));

        ws2.cell(52, 1).string("").style(bgNone(wb));
        ws2.cell(52, 3).string("Sales:" + serviceRate.roten).style(bgNone(wb));
        ws2.cell(52, 4)
            .number(Number(manSumData.Roten_customers) * serviceRate.roten)
            .style(styleNumberWithBg("#FAEBD7", wb));
        ws2.cell(52, 5).number(
            manSumData.Roten_sale_usd === 0 ? 0
                : manSumData.Roten_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        ws2.cell(53, 1).string("").style(bgNone(wb));
        ws2.cell(53, 3).string("# Set").style(bgNone(wb));
        ws2.cell(53, 4).number(Number(manSumData.Roten_set))
            .style(bgAntiqueWhite(wb));
        ws2.cell(53, 5).string("").style(bgNone(wb));
        ws2.cell(53, 6, 55, 6).string("" + renderNote(manSumData.Roten_set_note)).style(bgNone(wb));

        ws2.cell(54, 1).string("").style(bgNone(wb));
        ws2.cell(54, 3).string("Sales: " + serviceRate.roten_set).style(bgNone(wb));
        ws2.cell(54, 4)
            .number(Number(manSumData.Roten_set) * serviceRate.roten_set)
            .style(styleNumberWithBg("#FAEBD7", wb));
        ws2.cell(54, 5).number(
            manSumData.Roten_set_sale_usd === 0 ? 0
                : manSumData.Roten_set_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        ws2.cell(55, 1).string("").style(bgNone(wb));
        ws2.cell(55, 3).string("FREE").style(bgNone(wb));
        ws2.cell(55, 4).number(Number(manSumData.Roten_free)).style(bgAntiqueWhite(wb));
        ws2.cell(55, 5).string("").style(bgNone(wb));

        // row 56 57 58
        ws2.cell(56, 1).string("").style(bgNone(wb));
        ws2.cell(56, 2, 58, 2, true).string("Private").style(bgNone(wb));
        ws2.cell(56, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(56, 4).number(Number(manSumData.Private_customer)).style(bgAntiqueWhite(wb));
        ws2.cell(56, 5).string("").style(bgNone(wb));
        ws2.cell(56, 6, 58, 6, true).string("" + renderNote(manSumData.Private_note)).style(bgNone(wb));

        ws2.cell(57, 1).string("").style(bgNone(wb));
        ws2.cell(57, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(57, 4).number(Number(changeStringToNumber(manSumData.Private_sale_vnd)))
            .style(styleNumberWithBg("#FAEBD7", wb));
        ws2.cell(57, 5).number(
            manSumData.Private_sale_usd === 0 ? 0
                : manSumData.Private_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        ws2.cell(58, 1).string("").style(bgNone(wb));
        ws2.cell(58, 3).string("FREE").style(bgNone(wb));
        ws2.cell(58, 4).number(Number(manSumData.Private_free)).style(bgAntiqueWhite(wb));
        ws2.cell(58, 5).string("").style(bgNone(wb));

        // row 59 60
        ws2.cell(59, 1).string("").style(bgNone(wb));
        ws2.cell(59, 2, 60, 2, true).string("Mini Bar").style(bgCyan);
        ws2.cell(59, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(59, 4).number(Number(manSumData.MiniBar_customers))
            .style(bgAntiqueWhite(wb));
        ws2.cell(59, 5).string("").style(bgNone(wb));
        ws2.cell(59, 6, 60, 6, true).string("" + renderNote(manSumData.Minibar_note)).style(bgNone(wb));

        ws2.cell(60, 1).string("").style(bgNone(wb));
        ws2.cell(60, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(60, 4)
            .number(Number(changeStringToNumber(manSumData.MiniBar_sale_vnd)))
            .style(styleNumberWithBg("#FAEBD7", wb));
        ws2.cell(60, 5).number(
            manSumData.MiniBar_sale_usd === 0 ? 0
                : manSumData.MiniBar_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        // row 61 62
        ws2.cell(61, 1).string("").style(bgNone(wb));
        ws2.cell(61, 2, 62, 2, true).string("Laundry").style(bgAntiqueWhite(wb));
        ws2.cell(61, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(61, 4).number(Number(manSumData.Laundry_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(61, 5).string("").style(bgNone(wb));
        ws2.cell(61, 6, 62, 6, true).string("" + renderNote(manSumData.Laundry_note)).style(bgNone(wb));

        ws2.cell(62, 1).string("").style(bgNone(wb));
        ws2.cell(62, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(62, 4).number(Number(changeStringToNumber(manSumData.Laundry_sale_vnd)))
            .style(styleNumberWithBg("#FAEBD7", wb));
        ws2.cell(62, 5).number(
            manSumData.Laundry_sale_usd === 0 ? 0
                : manSumData.Laundry_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        // row 63 64
        ws2.cell(63, 1).string("").style(bgNone(wb));
        ws2.cell(63, 2, 64, 2, true).string("Rental car").style(bgCyan);
        ws2.cell(63, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(63, 4).number(Number(manSumData.RentalCar_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(63, 5).string("").style(bgNone(wb));
        ws2.cell(63, 6, 64, 6, true).string("" + renderNote(manSumData.RentalCar_note)).style(bgNone(wb));

        ws2.cell(64, 1).string("").style(bgNone(wb));
        ws2.cell(64, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(64, 4).number(Number(changeStringToNumber(manSumData.RentalCar_sale_vnd)))
            .style(styleNumberWithBg("#FAEBD7", wb))
        ws2.cell(64, 5).number(
            manSumData.RentalCar_sale_usd === 0 ? 0
                : manSumData.RentalCar_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        // row 65 66
        ws2.cell(65, 1).string("").style(bgNone(wb));
        ws2.cell(65, 2, 66, 2, true).string("Other").style(bgAntiqueWhite(wb));
        ws2.cell(65, 3).string("# of Customers:").style(bgNone(wb));
        ws2.cell(65, 4).number(Number(manSumData.Other_customers)).style(bgAntiqueWhite(wb));
        ws2.cell(65, 5).string("").style(bgNone(wb));
        ws2.cell(65, 6, 66, 6, true).string("" + renderNote(manSumData.Other_note)).style(bgNone(wb));

        ws2.cell(66, 1).string("").style(bgNone(wb));
        ws2.cell(66, 3).string("Sales:").style(bgNone(wb));
        ws2.cell(66, 4).number(Number(changeStringToNumber(manSumData.Other_sale_vnd)))
            .style(styleNumberWithBg("#FAEBD7", wb))
        ws2.cell(66, 5).number(
            manSumData.Other_sale_usd === 0 ? 0
                : manSumData.Other_sale_usd.replace("$", ""))
            .style(styleNumberUSD(wb));

        ws2.row(2).setHeight(24);
        ws2.row(3).setHeight(24);;
        ws2.row(6).setHeight(24);
        ws2.row(7).setHeight(29);
        ws2.row(8).setHeight(29);
        ws2.row(10).setHeight(26);

        for (let i = 11; i <= 22; i++) {
            ws2.row(i).setHeight(24);
        }

        for (let i = 24; i <= 43; i++) {
            ws2.row(i).setHeight(CONSTANTS.listBranchNoMassager.includes(branch) ? 0 : 24);
        }

        if (branch !== 1) {
            ws2.row(37).setHeight(0);
            ws2.row(38).setHeight(0);
            ws2.row(41).setHeight(0);
            ws2.row(42).setHeight(0);
        }

        for (let i = 44; i <= 70; i++) {
            ws2.row(i).setHeight(24);
        }

        ws2.column(3).setWidth(26);
        ws2.column(4).setWidth(21);
        ws2.column(6).setWidth(50);

        const path = `./ filereport / man_expected / ${nameBranch}_${date} _ManagerSum.xlsx`;
        wb.writeToBuffer().then(function (buffer) {
            fs.createWriteStream(path).write(buffer);
        });

        // if (fs.existsSync(path)) return "complete";
        return "complete";
    },
    man_total: (manTotal, branchID, branchOnData, month, res) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('Man Total');
        const { numberService, total, price } = manTotal;
        ws.cell(1, 11, 1, 23, true)
            .string(`${branchOnData.name} - Summarization of service: ${month} `)
            .style(styleTitle(wb));

        // Title
        // tilte -> Date

        ws.column(1).setWidth(28);
        ws.cell(3, 1).string("Date").style(bgYellow(wb));
        ws.cell(4, 1).string("Version").style(bgNone(wb))
        ws.cell(5, 1).string("Edit").style(bgNone(wb))
        ws.cell(6, 1).string("Massage 100 mins guest").style(bgNone(wb))
        ws.cell(7, 1).string("Massage 100 mins cus").style(bgNone(wb))

        ws.cell(8, 1).string("Massage 70 mins guest").style(bgNone(wb))
        ws.cell(9, 1).string("Massage 70 mins cus").style(bgNone(wb))
        ws.cell(10, 1).string("Massage 40 mins").style(bgNone(wb))
        ws.cell(11, 1).string("Set Rotenburo + Massage40").style(bgNone(wb))
        ws.cell(12, 1).string("Set Rotenburo + Massage70").style(bgNone(wb))
        ws.cell(13, 1).string("Set Rotenburo + Massage100").style(bgNone(wb))
        ws.cell(14, 1).string("Free").style(bgNone(wb))

        ws.cell(15, 1).string("-").style(bgNone(wb))
        ws.cell(16, 1).string("Breakfast").style(bgNone(wb))
        ws.cell(17, 1).string("Rotenburo").style(bgNone(wb))
        ws.cell(18, 1).string("Rotenburo Set").style(bgNone(wb))
        ws.cell(19, 1).string("Free").style(bgNone(wb))
        ws.cell(20, 1).string("Private(Kashikiri)").style(bgNone(wb))
        ws.cell(21, 1).string("-").style(bgNone(wb))
        ws.cell(22, 1).string("Check in turns").style(bgNone(wb))
        ws.cell(23, 1).string("Check out turns").style(bgNone(wb))
        ws.cell(24, 1).string("Late out").style(bgNone(wb))
        ws.cell(25, 1).string("Short time").style(bgNone(wb))
        ws.cell(26, 1).string("Other hotel").style(bgNone(wb))

        // columns 2 => price
        ws.column(1).setWidth(28);
        ws.column(2).setWidth(12);
        // setup row / column   
        ws.row(6).freeze();
        ws.column(2).freeze();

        ws.cell(3, 2).string("X").style(bgYellow(wb));
        ws.cell(4, 2).string("X").style(bgNone(wb));
        ws.cell(5, 2).string("X").style(bgNone(wb));
        ws.cell(6, 2).string((price.massage_100 * 0.9).toLocaleString()).style(bgNone(wb));
        ws.cell(7, 2).string(price.massage_100.toLocaleString()).style(bgNone(wb));
        ws.cell(8, 2).string((price.massage_70 * 0.9).toLocaleString()).style(bgNone(wb));
        ws.cell(9, 2).string(price.massage_70.toLocaleString()).style(bgNone(wb));
        ws.cell(10, 2).string(price.massage_40.toLocaleString()).style(bgNone(wb));
        ws.cell(11, 2).string(price.massage_set40 === undefined ? "" : price.massage_set40.toLocaleString()).style(bgNone(wb));
        ws.cell(12, 2)
            .string(branchID == 1 ? (price.massage_set70 === undefined ? "" : price.massage_set70.toLocaleString())
                : (price.massage_set === undefined ? "" : price.massage_set.toLocaleString()))
            .style(bgNone(wb));
        ws.cell(13, 2).string(price.massage_set100 === undefined ? "" : price.massage_set100.toLocaleString()).style(bgNone(wb));
        ws.cell(14, 2).string("0").style(bgNone(wb));
        ws.cell(15, 2).string("-").style(bgNone(wb));

        ws.cell(16, 2).string(price.break_fast.toLocaleString()).style(bgNone(wb));
        ws.cell(17, 2).string(price.roten.toLocaleString()).style(bgNone(wb));
        ws.cell(18, 2).string(price.roten_set.toLocaleString()).style(bgNone(wb));
        ws.cell(19, 2).string("-").style(bgNone(wb))
        ws.cell(20, 2).string("-").style(bgNone(wb))
        ws.cell(21, 2).string("-").style(bgNone(wb))
        ws.cell(22, 2).string("-").style(bgNone(wb))
        ws.cell(23, 2).string("-").style(bgNone(wb))
        ws.cell(24, 2).string("-").style(bgNone(wb))
        ws.cell(25, 2).string("-").style(bgNone(wb))
        ws.cell(26, 2).string("-").style(bgNone(wb))

        // for with day of month
        numberService.forEach((value, index) => {
            ws.column(3 + index).setWidth(7);
            ws.cell(3, 3 + index).number(index + 1).style(bgYellow(wb));
            ws.cell(4, 3 + index).number(value.version).style(bgNone(wb));
            ws.cell(5, 3 + index).string("" + (value.edit === true ? "True" : value.edit === "" ? "" : "False")).style(bgNone(wb));
            if (CONSTANTS.listBranchNoMassager.includes(branchID) === false) {
                ws.cell(6, 3 + index)
                    .string("" + (value.massage100m_customers === undefined ? "" : value.massage100m_customers))
                    .style(bgNone(wb));
                ws.cell(7, 3 + index)
                    .string("" + (value.massage100m_guest === undefined ? "" : value.massage100m_guest))
                    .style(bgNone(wb));
                ws.cell(8, 3 + index)
                    .string("" + (value.massage70m_customers === undefined ? "" : value.massage70m_customers))
                    .style(bgNone(wb));
                ws.cell(9, 3 + index)
                    .string("" + (value.massage70m_guest === undefined ? "" : value.massage70m_guest))
                    .style(bgNone(wb));
                ws.cell(10, 3 + index)
                    .string("" + (value.massage40m_guest === undefined ? "" : value.massage40m_guest))
                    .style(bgNone(wb));
                ws.cell(11, 3 + index)
                    .string("" + (value.massage_set40_guest === undefined ? "" : value.massage_set40_guest))
                    .style(bgNone(wb));
                ws.cell(12, 3 + index)
                    .string("" + (value.massage_set70_guest === undefined ? "" : value.massage_set70_guest))
                    .style(bgNone(wb));
                ws.cell(13, 3 + index)
                    .string("" + (value.massage_set100_guest === undefined ? "" : value.massage_set100_guest))
                    .style(bgNone(wb));
                ws.cell(14, 3 + index)
                    .string("" + (value.massage_free === undefined ? "" : value.massage_free))
                    .style(bgNone(wb));

                ws.cell(15, 3 + index).string("").style(bgNone(wb));
            }

            ws.cell(16, 3 + index)
                .string("" + (value.BF_customers === undefined ? "" : value.BF_customers))
                .style(bgNone(wb));
            ws.cell(17, 3 + index)
                .string("" + (value.Roten_customers === undefined ? "" : value.Roten_customers))
                .style(bgNone(wb));
            ws.cell(18, 3 + index)
                .string("" + (value.Roten_set === undefined ? "" : value.Roten_set))
                .style(bgNone(wb));
            ws.cell(19, 3 + index)
                .string("" + (value.Roten_free === undefined ? "" : value.Roten_free))
                .style(bgNone(wb));
            ws.cell(20, 3 + index)
                .string("" + (value.Private_customer === undefined ? "" : value.Private_customer))
                .style(bgNone(wb));

            ws.cell(21, 3 + index).string("").style(bgNone(wb));
            ws.cell(22, 3 + index)
                .string("" + (value.day_checkin === undefined ? "" : value.day_checkin))
                .style(bgNone(wb));
            ws.cell(23, 3 + index)
                .string("" + (value.day_checkout === undefined ? "" : value.day_checkout))
                .style(bgNone(wb));
            ws.cell(24, 3 + index)
                .string("" + (value.late_customers === undefined ? "" : value.late_customers))
                .style(bgNone(wb));
            ws.cell(25, 3 + index)
                .string("" + (value.short_customers === undefined ? "" : value.short_customers))
                .style(bgNone(wb));
            ws.cell(26, 3 + index)
                .string("" + (value.Other_customers === undefined ? "" : value.Other_customers))
                .style(bgNone(wb));
        });

        ws.cell(3, 3 + numberService.length).string("Number").style(bgYellow(wb));
        ws.cell(3, 4 + numberService.length).string("Total").style(bgYellow(wb));

        ws.cell(4, 3 + numberService.length).string("X").style(bgNone(wb));
        ws.cell(4, 4 + numberService.length).string("X").style(bgNone(wb));

        ws.cell(5, 3 + numberService.length).string("X").style(bgNone(wb));
        ws.cell(5, 4 + numberService.length).string("X").style(bgNone(wb));

        // Number
        ws.cell(6, 3 + numberService.length)
            .number(total.massage100m_guest).style(bgNone(wb));
        ws.cell(7, 3 + numberService.length)
            .number(total.massage100m_customers).style(bgNone(wb));
        ws.cell(8, 3 + numberService.length)
            .number(total.massage70m_guest).style(bgNone(wb));
        ws.cell(9, 3 + numberService.length)
            .number(total.massage70m_customers).style(bgNone(wb));
        ws.cell(10, 3 + numberService.length)
            .number(total.massage40m_guest).style(bgNone(wb));
        ws.cell(11, 3 + numberService.length)
            .number(total.massage_set_guest).style(bgNone(wb));
        ws.cell(12, 3 + numberService.length)
            .number(total.massage_set70_guest).style(bgNone(wb));
        ws.cell(13, 3 + numberService.length)
            .number(total.massage_set100_guest).style(bgNone(wb));
        ws.cell(14, 3 + numberService.length)
            .number(total.massage_free).style(bgNone(wb));

        ws.cell(15, 3 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(16, 3 + numberService.length)
            .number(total.BF_customers).style(bgNone(wb));
        ws.cell(17, 3 + numberService.length)
            .number(total.Roten_customers).style(bgNone(wb));
        ws.cell(18, 3 + numberService.length)
            .number(total.Roten_set).style(bgNone(wb));
        ws.cell(19, 3 + numberService.length)
            .number(total.Roten_free).style(bgNone(wb));
        ws.cell(20, 3 + numberService.length)
            .number(total.Private_customer).style(bgNone(wb));
        ws.cell(21, 3 + numberService.length).string("-").style(bgNone(wb));

        ws.cell(22, 3 + numberService.length)
            .number(total.day_checkin).style(bgNone(wb));
        ws.cell(23, 3 + numberService.length)
            .number(total.day_checkout).style(bgNone(wb));
        ws.cell(24, 3 + numberService.length)
            .number(total.late_customers).style(bgNone(wb));
        ws.cell(25, 3 + numberService.length)
            .number(total.short_customers).style(bgNone(wb));
        ws.cell(26, 3 + numberService.length)
            .number(total.Other_customers).style(bgNone(wb));

        // Total
        ws.cell(6, 4 + numberService.length)
            .number(total.massage100m_guest * price.massage_100 * 0.9)
            .style(styleNumber(wb));
        ws.cell(7, 4 + numberService.length)
            .number(total.massage100m_customers * price.massage_100)
            .style(styleNumber(wb));
        ws.cell(8, 4 + numberService.length)
            .number(total.massage70m_guest * price.massage_70 * 0.9)
            .style(styleNumber(wb));
        ws.cell(9, 4 + numberService.length)
            .number(total.massage70m_customers * price.massage_70)
            .style(styleNumber(wb));
        ws.cell(10, 4 + numberService.length)
            .number(total.massage40m_guest * price.massage_40)
            .style(styleNumber(wb));
        ws.cell(11, 4 + numberService.length)
            .number(price.massage_set40 === undefined ? 0 : (total.massage_set40_guest * price.massage_set40))
            .style(styleNumber(wb));
        ws.cell(12, 4 + numberService.length)
            .number(
                branchID === 1 ? price.massage_set70 === undefined ? 0 : (total.massage_set70_guest * price.massage_set70)
                    : price.massage_set === undefined ? 0 : (total.massage_set_guest * price.massage_set))
            .style(styleNumber(wb));
        ws.cell(13, 4 + numberService.length)
            .number(price.massage_set100 === undefined ? 0 : (total.massage_set100_guest * price.massage_set100))
            .style(styleNumber(wb));
        ws.cell(14, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(15, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(16, 4 + numberService.length)
            .number(branchID === 1 ? total.BF_sale_vnd : total.BF_customers * price.break_fast)
            .style(styleNumber(wb));
        ws.cell(17, 4 + numberService.length).number(total.Roten_customers * price.roten).style(styleNumber(wb));
        ws.cell(18, 4 + numberService.length).number(total.Roten_set * price.roten_set).style(styleNumber(wb));
        ws.cell(19, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(20, 4 + numberService.length).number(total.sum_private).style(bgNone(wb));
        ws.cell(21, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(22, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(23, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(24, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(25, 4 + numberService.length).string("-").style(bgNone(wb));
        ws.cell(26, 4 + numberService.length).string("-").style(bgNone(wb));

        if (CONSTANTS.listBranchNoMassager.includes(branchID)) {
            for (let i = 6; i <= 15; i++) {
                ws.row(i).setHeight(0)
            }
        } else if (branchID !== 1) {
            ws.row(11).setHeight(0)
            ws.row(13).setHeight(0)
        }

        return wb.write(`${branchOnData.name}_${month} _ManagerTotal.xlsx`, res);
    },
    survey_online: (surveyData, branchID, branchOnData, month, res) => {
        var wb = new xl.Workbook();
        let ws = wb.addWorksheet('Survey Result');
        const keyOnSurveyData = Object.keys(surveyData);
        // Title
        ws.row(1).setHeight(35);
        ws.column(1).setWidth(25);
        ws.column(18).setWidth(23);

        ws.cell(1, 1).string("Date").style(bgNone(wb));
        ws.cell(1, 2).string("お名前をお教えてくださいませ").style(bgNone(wb));
        ws.cell(1, 3).string("お部屋をお教えてくださいませ").style(bgNone(wb));
        ws.cell(1, 4).string("1.滞在期間をお聞かせください。").style(bgNone(wb));
        ws.cell(1, 5).string("2.お客様の年齢をお聞かせください。").style(bgNone(wb));
        ws.cell(1, 6).string("3.東屋ベトナムへの来店頻度をお聞かせ下さい。").style(bgNone(wb));
        ws.cell(1, 7).string("4.当店をお知りになったきっかけを教えてください。").style(bgNone(wb));
        ws.cell(1, 8).string("5.1 [①客室料金]").style(bgNone(wb));
        ws.cell(1, 9).string("5.2 [②受付の接客]").style(bgNone(wb));
        ws.cell(1, 10).string("5.3 [③受付以外の接客]").style(bgNone(wb));
        ws.cell(1, 11).string("5.4 [④朝食の味]").style(bgNone(wb));
        ws.cell(1, 12).string("5.5 [⑤朝食の提供速度(set only)]").style(bgNone(wb));
        ws.cell(1, 13).string("5.6 [⑥お部屋の設備]").style(bgNone(wb));
        ws.cell(1, 14).string("5.7 [⑦お部屋の清潔感]").style(bgNone(wb));
        ws.cell(1, 15).string("5.8 [⑧お部屋以外の清潔感]").style(bgNone(wb));
        ws.cell(1, 16).string("5.8 [⑧お部屋以外の清潔感]").style(bgNone(wb));
        ws.cell(1, 17).string("5.10 [⑩フットマッサージ]").style(bgNone(wb));
        ws.cell(1, 18).string("6.ホテルをお選びになる点で、特に重視されることをお聞かせください。（複数回答可）]").style(bgNone(wb));
        ws.cell(1, 19).string("7.次のご利用について").style(bgNone(wb));
        ws.cell(1, 20).string("8.その他、ご意見、改善点があればお願いします").style(bgNone(wb));

        // for with day of month
        keyOnSurveyData.forEach((survey, index) => {
            const row = 2 + index;
            ws.row(row).setHeight(18)
            const { room_number, mcau1, mcau2, mcau3, mcau4, mcau5, mcau6, mcau7, mcau8, mdate, mtime } = surveyData[survey];
            ws.cell(row, 1).string(mdate + " " + mtime).style(bgNone(wb));
            ws.cell(row, 2).string("X").style(bgNone(wb));
            ws.cell(row, 3).string(room_number).style(bgNone(wb));
            ws.cell(row, 4).string(mcau1).style(bgNone(wb));
            ws.cell(row, 5).string(mcau2).style(bgNone(wb));
            ws.cell(row, 6).string(mcau3).style(bgNone(wb));
            ws.cell(row, 7).string(mcau4).style(bgNone(wb));
            ws.cell(row, 8).string(mcau5.slice(0, 1)).style(bgNone(wb));
            ws.cell(row, 9).string(mcau5.slice(1, 2)).style(bgNone(wb));
            ws.cell(row, 10).string(mcau5.slice(2, 3)).style(bgNone(wb));
            ws.cell(row, 11).string(mcau5.slice(3, 4)).style(bgNone(wb));
            ws.cell(row, 12).string(mcau5.slice(4, 5)).style(bgNone(wb));
            ws.cell(row, 13).string(mcau5.slice(5, 6)).style(bgNone(wb));
            ws.cell(row, 14).string(mcau5.slice(6, 7)).style(bgNone(wb));
            ws.cell(row, 15).string(mcau5.slice(7, 8)).style(bgNone(wb));
            ws.cell(row, 16).string(mcau5.slice(8, 9)).style(bgNone(wb));
            ws.cell(row, 17).string(mcau5.slice(9, 10)).style(bgNone(wb));
            ws.cell(row, 18).string(mcau6).style(bgNone(wb));
            ws.cell(row, 19).string(mcau7).style(bgNone(wb));
            ws.cell(row, 20).string(mcau8).style(bgNone(wb));
        });

        return wb.write(`${branchOnData.name}_${month} _Survey.xlsx`, res);
    },
}


function coverNumber(value) {
    return String(value).padStart(2, '0')
}

function changeStringToNumber(value) {
    if (value === "" || value === 0 || value === undefined) return 0;
    else {
        if (value.replace(",", "").includes(",")) {
            return Number(value.replace(",", "").replace(",", ""))
        } else return Number(value.replace(",", ""))
    }
}

function renderNote(value) {
    if (value === undefined) return ""
    else return value
}

function renderWeekStartEnd(start, end, month) {
    return "(" + coverNumber(start) + " " + supportDate.coverMonthToString(month) + " - " + coverNumber(end) + " " + supportDate.coverMonthToString(month) + ")"
}

module.exports = formatExcel;