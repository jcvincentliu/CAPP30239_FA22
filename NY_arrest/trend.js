
// Note: 93 cases were dropped due to unspecified race
  
let height = 500,
    width = 800,
    margin = ({ top: 10, right: 36, bottom: 20, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#month")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/month_by_race.csv").then(data => {
  let timeParse = d3.timeParse("%b");

  let races = new Set();   // add countries as a set (group)

  for (let d of data) {
    d.month = timeParse(d.month);
    d.count = +d.count;
    races.add(d.race);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.month))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) + 20])
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%B")));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).ticks(8).tickSize(-innerWidth).tickFormat(d => d));  // number is the #ticks8

  let line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.count));
 
  for (let race of races) {
    let monthrace = data.filter(d => d.race === race);  // filtering 

    let g = svg.append("g")
      .attr("class", "race")
      .on('mouseover', function () {   
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (race === "All races") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(monthrace)
      .attr("fill", "none")
      .attr("stroke", "darkgrey")
      .style("stroke-width", 2.5) 
      .attr("d", line)

    let lastEntry = monthrace[monthrace.length - 1]; //last piece of data to position text x and y

    svg.append("text")
      .text("All Races")
      .attr("class", "label")
      .attr("x", 596)
      .attr("y", 75)
      .attr("dominant-baseline", "middle")
      .attr("fill", "black");

    svg.append("text")
      .text("Black")
      .attr("class", "label")
      .attr("x", 595)
      .attr("y", 260)
      .attr("dominant-baseline", "middle")
      .attr("fill", "black");

    svg.append("text")
      .text("White")
      .attr("class", "label")
      .attr("x", 595)
      .attr("y", 330)
      .attr("dominant-baseline", "middle")
      .attr("fill", "black");

  }

  
});