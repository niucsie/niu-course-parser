var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});
var SESSION_URL = "http://acade.niu.edu.tw/NIU/outside.aspx?mainPage=LwBBAHAAcABsAGkAYwBhAHQAaQBvAG4ALwBUAEsARQAvAFAAUgBHAC8AUABSAEcAMQAxADAAMABfADAAMQAuAGEAcwBwAHgAPwBhAHkAZQBhAHIAcwBtAHMAPQAxADAANAAxAA==";
var URL = "https://acade.niu.edu.tw/NIU/Application/TKE/PRG/PRG1100_01.aspx?ayearsms=1041";

casper.start(SESSION_URL).thenOpen(URL, function(){
  this.log("Open course page success");

  this.click("#QUERY_BTN1");
});

casper.waitForSelector("#DataGrid", function(){
  this.log("Wait for query results success");

  this.echo(this.getHTML());
}, null, 60000);

casper.run();
