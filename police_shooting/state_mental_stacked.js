
const width = 540,
      height = 440,
      margin = {top: 30, right: 10, bottom: 30, left: 92};

const dot_chart = d3.select("#race_weapon_cleverland")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")


d3.json('a3cleanedonly2015.json').then(data => { 

  let weapon_race = [
    {
        "Race": "White",
        "Total_unarmed": 0,
        "Total_armed":0
    },
    {
        "Race": "Black",
        "Total_unarmed": 0,
        "Total_armed":0
    },
    {
        "Race": "Hispanic",
        "Total_unarmed": 0,
        "Total_armed":0
    },
    {
        "Race": "Asian",
        "Total_unarmed": 0,
        "Total_armed":0
    },
    {
      "Race": "Other race",
      "Total_unarmed": 0,
      "Total_armed":0
  }]

for (let d of data) {
    if (d.Armed == "" || d.Armed == "Unarmed") {
      if (d.Race == "White") {
      weapon_race[0].Total_unarmed += 1
    } else if (d.Race == "Black") {
      weapon_race[1].Total_unarmed += 1
    } else if (d.Race == "Hispanic") {
      weapon_race[2].Total_unarmed += 1
    }  else if (d.Race == "Asian") {
      weapon_race[3].Total_unarmed += 1
    } else {
      weapon_race[4].Total_unarmed += 1
    } 
  } else {
    if (d.Race == "White") {
      weapon_race[0].Total_armed += 1
    } else if (d.Race == "Black") {
      weapon_race[1].Total_armed += 1
    } else if (d.Race == "Hispanic") {
      weapon_race[2].Total_armed += 1
    }  else if (d.Race == "Asian") {
      weapon_race[3].Total_armed += 1
    } else {
      weapon_race[4].Total_armed += 1
    } 
    }
  } 

 // console.log(weapon_race)

var x = d3.scaleLinear()
    .domain([0, 500])
    .range([ 0, width]);
  dot_chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Y axis
var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(weapon_race.map(function(d) { return d.Race; }))
    .padding(1);
  dot_chart.append("g")
    .call(d3.axisLeft(y))

  dot_chart.append("text") // add title
    .attr("x", width / 1.9) // x location 
    .attr("y", (margin.top / 3) * 1.5) // y location
    .attr("text-anchor", "middle")
    .text("Fig 2: Number of armed vs unarmed victims by race") // title
    .style("font-size", "20px")

  // Lines
  dot_chart.selectAll("myline")
    .data(weapon_race)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.Total_unarmed); })
      .attr("x2", function(d) { return x(d.Total_armed); })
      .attr("y1", function(d) { return y(d.Race); })
      .attr("y2", function(d) { return y(d.Race); })
      .attr("stroke", "black")
      .attr("stroke-width", "4px")

  // Circles of variable 1
  dot_chart.selectAll("mycircle")
    .data(weapon_race)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.Total_unarmed); })
      .attr("cy", function(d) { return y(d.Race); })
      .attr("r", "9")
      .style("fill", "#a2d4ec")

  // Circles of variable 2
  dot_chart.selectAll("mycircle")
    .data(weapon_race)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.Total_armed); })
      .attr("cy", function(d) { return y(d.Race); })
      .attr("r", "9")
      .style("fill", "#12719e")
})