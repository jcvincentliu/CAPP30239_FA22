
// 93 cases were dropped due to unspecified race

let height = 500,
    width = 800,
    margin = ({ top: 5, right: 50, bottom: 55, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#month")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/month_by_race.csv").then(data => {
 // let timeParse = d3.timeParse("%m");

  let races = new Set();   // add countries as a set (group)

  for (let d of data) {
 //   d.month = timeParse(d.month);
    d.count = +d.count;
 //   d.race = +d.race; 
    races.add(d.race);
  }
  console.log(data)

// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let x = d3.scaleOrdinal()
    .domain(d3.extent(data, d => d.month))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d));

  let line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.count));
 
  for (let race of races) {
    let monthrace = data.filter(d => d.race === race);  // filtering 

    let g = svg.append("g")
      .attr("class", "race")
      .on('mouseover', function () {   // dynamic part
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (race === "All races") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(monthrace)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = monthrace[monthrace.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text(race)
      .attr("x", x(lastEntry.month) + 3)
      .attr("y", y(lastEntry.count))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});