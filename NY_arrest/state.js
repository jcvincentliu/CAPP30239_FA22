
// selected: among cities that have over 8,000,000 population

d3.csv('data/violent_arrest_by_state_selected.csv').then((data) => {

    for (let d of data) {
        d.Count = +d.Count
        d.Percent = +d.Percent
    }

    let arrest_state = BarChart(data, {
        x: d => d.Percent,
        y: d => d.State,
        z: d => d.Count,
        yDomain: d3.groupSort(data, ([d]) => -d.Percent, d => d.State), // sort by descending frequency
        xLabel: "Number of violent crime arrests per 10,000 people",
        width: 600
   })

    document.getElementById("state").appendChild(arrest_state);


})


// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/horizontal-bar-chart

function BarChart(data, {
    x = d => d, // given d in data, returns the (quantitative) x-value
    y = (d, i) => i, // given d in data, returns the (ordinal) y-value
    z = d => d,
    title, // given d in data, returns the title text
    marginTop = 50, // the top margin, in pixels
    marginRight = 10, // the right margin, in pixels
    marginBottom = 5, // the bottom margin, in pixels
    marginLeft = 80, // the left margin, in pixels
    width = 800, // the outer width of the chart, in pixels
    height = 450, // outer height, in pixels
    xType = d3.scaleLinear, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    xFormat, // a format specifier string for the x-axis
    xLabel, // a label for the x-axis
    yPadding = 0.1, // amount of y-range to reserve to separate bars
    yDomain, // an array of (ordinal) y-values
    yRange, // [top, bottom]
    color = "steelblue", // bar fill color
    titleColor = "white", // title fill color when atop bar
    titleAltColor = "steelblue", // title fill color when atop background
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z  = d3.map(data, z);

   // console.log(Y)
  
    // Compute default domains, and unique the y-domain.
    if (xDomain === undefined) xDomain = [0, d3.max(X)];
    if (yDomain === undefined) yDomain = Y;
    yDomain = new d3.InternSet(yDomain);
  
    // Omit any data not present in the y-domain.
    const I = d3.range(X.length).filter(i => yDomain.has(Y[i]));
   // console.log(I)
  
    // Compute the default height.
    if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
    if (yRange === undefined) yRange = [marginTop, height - marginBottom];
  
    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = d3.scaleBand(yDomain, yRange).padding(yPadding);
    const xAxis = d3.axisTop(xScale).ticks(width / 80);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
  
    const tooltip = d3.select('#state')
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute") // put item on specific spot (0,0); position relative --> move in relation to sth
        .style("visibility", "hidden")

    title = i => `${X[i]}`;

  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", height - marginTop - marginBottom)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("class", "x-text")
            .attr("x", marginLeft+300)  
            .attr("y", -35)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")    
            .style("font-size", "15px")
            .text(xLabel));
  
    svg.append("g")   
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("fill", function(d) {
            if (data[d].State === "New York") {  
                return "#850101"
            }   else    { 
            return "steelblue" 
                } 
            })
        .attr("x", xScale(0))
        .attr("y", i => yScale(Y[i]))
        .attr("width", i => xScale(X[i]) - xScale(0))
        .attr("height", yScale.bandwidth())
        .on("mousemove", function(event, d){
            tooltip
              .style("left", (event.pageX +30) + "px") 
              .style("top", (event.pageY -60) + "px")
              .style("visibility", "visible")
              .html("<b>State</b>: " + (Y[d]) + "<br>" + "<b>Total violent arrests case counts</b>: " + (Z[d]) + "<br>" + "<b>Number of violent arrests per 10,000 people</b>: " + (X[d]))
        })
    	.on("mouseout", function(d){ tooltip.style("visibility", "hidden");});
  
    svg.append("g")
        .attr("fill", titleColor)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .style("font-size", "40px")
      .selectAll("text")
      .data(I)
      .join("text")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text(title)
        .call(text => text.filter(i => xScale(X[i]) - xScale(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", titleAltColor)
            .attr("text-anchor", "start"));
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("class", "y-axis")
        .call(yAxis.tickSizeInner(0));
  
    return svg.node();
  }