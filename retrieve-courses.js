var casper = require('casper').create({
  verbose: true,
  logLevel: "debug",
  clientScripts: [
    "node_modules/jquery/dist/jquery.min.js"
  ]
});

var SESSION_URL = "http://acade.niu.edu.tw/NIU/outside.aspx?mainPage=LwBBAHAAcABsAGkAYwBhAHQAaQBvAG4ALwBUAEsARQAvAFAAUgBHAC8AUABSAEcAMQAxADAAMABfADAAMQAuAGEAcwBwAHgAPwBhAHkAZQBhAHIAcwBtAHMAPQAxADAANAAxAA==";
var URL = "https://acade.niu.edu.tw/NIU/Application/TKE/PRG/PRG1100_01.aspx?ayearsms=1041";

casper.start(SESSION_URL).thenOpen(URL, function(){
  this.log("Open course page success");

  this.click("#QUERY_BTN1");
});

casper.waitForSelector("#DataGrid", function(){
  this.log("Wait for query results success");

  // inject JavaScript expression to remote page
  var results = this.evaluate(function(){
    $("#DataGrid > tbody > tr.mtbGreenBg").remove();

    var sn = $("#DataGrid > tbody > tr:nth-child(1) > td:nth-child(3)").html();
    var chineseName = $("#DataGrid > tbody > tr:nth-child(1) > td:nth-child(4)").html();
    var depName = $("#DataGrid > tbody > tr:nth-child(1) > td:nth-child(5)").html();
    var grade = $("#DataGrid > tbody > tr:nth-child(1) > td:nth-child(6)").html();
    var className = $("#DataGrid > tbody > tr:nth-child(1) > td:nth-child(7)").html();

    return {
      "sn": sn,
      "chineseName": chineseName,
      "depName": depName,
      "grade": grade,
      "className": className
    };
  });

  this.log(JSON.stringify(results));
}, null, 60000);

casper.run();
