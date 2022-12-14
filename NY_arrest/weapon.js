

d3.json('data/weapon.json').then((data) => {
    for (let d of data) {
      createRing(d);
    }
  });
  
  function createRing({ race, values}) {
    const height = 220,
      width = 200,
      innerRadius = 40,
      outerRadius = 60,
      labelRadius = 88;
  
    const arcs = d3.pie().value(d => d.count)(values);
  
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
  
    const svg = d3.select("#weapon_race")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => d3.schemeSet2[i])
      .attr("d", arc)
      .on('mouseover', function (e, d, i) {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
        d3.select(this).attr("stroke", "transparent") 
        d3.select(this).attr("transform", "scale(1.1)")
      })
      .on("mouseout", function () {
        d3.select(this).classed("highlight", false)
        d3.select(this).attr("stroke", "white")
        d3.select(this).attr("transform", "scale(1)")
      });
  
    svg.append("g")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .selectAll("tspan")
      .data(d => {
        return [d.data.weapon, d.data.count, d.data.percent]; //d.
      })
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i) => `${i * 1.1}em`)
      .attr("font-weight", (d, i) => i ? null : "bold")
      .text(d => d);
  
    svg.append("text")
      .attr("font-size", 16)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text(race)
      .style("font-size", 20);
  }