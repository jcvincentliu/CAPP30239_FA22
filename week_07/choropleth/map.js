// path: can be a line or a shape. This is used when we formerly talked about pies

const tooltip = d3.select("body")
.append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.csv("data/unemployment2020.csv"),
  d3.json("libs/counties-albers-10m.json")
]).then(([data, us]) => {   //[data, us] refer to the first, second file parsed into json
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;   // id is what connected data, look up table
  }

  const counties = topojson.feature(us, us.objects.counties); // use the feature method to provide a function that can build the path

  //Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize() //break up domain into different ranges
    .domain([0, 10]).nice() // 0-10% unemployment, each percent gives a color from Blues
    .range(d3.schemeBlues[9]);

  const path = d3.geoPath(); // build path element

  d3.select("#legend") // build the legend: reference the legend id in the html
    .node()
    .appendChild(
      Legend( // running the observable code
        d3.scaleOrdinal(  // don't have to
          ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],  // words on the legend. could be any string
          // color   // use the color scale defined in line 31 (don't need 41-42, 44)
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate (%)" }
      ));

  svg.append("g")
    .selectAll("path")
    .data(counties.features)
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc') // color of that path: if there is id in data, use the rate to determine what color; if not, fill grey/ #ccc 
    .attr("d", path) // create the path
    .on("mousemove", function (event, d) {    // interacivity; bc it's right on the path, it automatically knows the shape
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.county}<br>${info.rate}%`)
        .style("top", (event.pageY - 10) + "px") // positioning of the mouse
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");  // goldenrod is selected here (this is the color of a state when being selected)
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
});