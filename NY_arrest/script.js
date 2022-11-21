
let sourceHTML = `<p>Data Source: <a href="https://www.fbi.gov/how-we-can-help-you/need-an-fbi-service-or-more-information/ucr/nibrs">2021 Uniform Crime Report NIBRS Data</a></p>`;
d3.selectAll(".chart")
  .append("div")
  .html(sourceHTML)