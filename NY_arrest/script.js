
let sourceHTML = `<p>Source: 2021 FBI Uniform Crime Report (UCR) -  <a href="https://www.fbi.gov/how-we-can-help-you/need-an-fbi-service-or-more-information/ucr/nibrs">National Incident-Based Reporting System </a>data</p>`;
d3.selectAll(".chart")
  .append("div")
  .html(sourceHTML)