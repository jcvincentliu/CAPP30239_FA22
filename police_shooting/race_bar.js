d3.json('a3cleanedonly2015.json').then(data => { 

    let race_sex_count = [
        {
            "Race": "White",
            "Sex": "Male",
            "Totals": 0
        },
        {
            "Race": "White",
            "Sex": "Female",
            "Totals": 0
        },
        {
            "Race": "Black",
            "Sex": "Male",
            "Totals": 0
        },
        {
            "Race": "Black",
            "Sex": "Female",
            "Totals": 0
        },
        {
            "Race": "Asian",
            "Sex": "Male",
            "Totals": 0
        },
        {
            "Race": "Asian",
            "Sex": "Female",
            "Totals": 0
        },
        {
            "Race": "Hispanic",
            "Sex": "Male",
            "Totals": 0
        },
        {
            "Race": "Hispanic",
            "Sex": "Female",
            "Totals": 0
        },
        {
            "Race": "Other",
            "Sex": "Male",
            "Totals": 0
        },
        {
            "Race": "Other",
            "Sex": "Female",
            "Totals": 0
        },
    ]

    for (let d of data) {
        if (d.Race == "White") {
            if (d.Gender == "Male") {
                race_sex_count[0].Totals += 1
            } else {
                race_sex_count[1].Totals += 1
            }
        } else if (d.Race == "Black") {
            if (d.Gender == "Male") {
                race_sex_count[2].Totals += 1
            } else {
                race_sex_count[3].Totals += 1
            }
        } else if (d.Race == "Asian") {
            if (d.Gender == "Male") {
                race_sex_count[4].Totals += 1
            } else {
                race_sex_count[5].Totals += 1
            }
        } else if (d.Race == "Hispanic") {
            if (d.Gender == "Male") {
                race_sex_count[6].Totals += 1
            } else {
                race_sex_count[7].Totals += 1
            }
        } else {
            if (d.Gender == "Male") {
                race_sex_count[8].Totals += 1
            } else {
                race_sex_count[9].Totals += 1
            }
        }
    } 

    let race_count = [
        {
            "Race": "White",
            "Totals": 0
        },
        {
            "Race": "Black",
            "Totals": 0
        },
        {
            "Race": "Asian",
            "Totals": 0
        },
        {
            "Race": "Hispanic",
            "Totals": 0
        },
        {
            "Race": "Other",
            "Totals": 0
        },
    ]

    for (let d of data) {
        if (d.Race == "White") {
            race_count[0].Totals += 1
        } else if (d.Race == "Black") {
            race_count[1].Totals += 1
        } else if (d.Race == "Asian") {
            race_count[2].Totals += 1
        } else if (d.Race == "Hispanic") {
            race_count[3].Totals += 1
        } else {
            race_count[4].Totals += 1
        }
    } 

   // console.log(race_count)   // total: 1537, white 751, black 378, hispnic 246, asian 19 ...

    let race_chart = BarChart(race_count, {
        x: d => d.Race,
        y: d => d.Totals,
        xDomain: d3.groupSort(race_count, ([d]) => -d.Totals, d => d.Race), // sort by descending frequency
       // yFormat: "%",
       title: "African Americans ",
        yLabel: "",
        width: 750,
        height: 500,
        color: "steelblue"
      })

    document.getElementById("race").appendChild(race_chart);
    
})

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bar-chart
function BarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 30, // the top margin, in pixels
    marginRight = 10, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // bar fill color
  } = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
  
    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);
  
    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
  
    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0)   //.tickSize([0,0])
    const yAxis = d3.axisLeft(yScale).ticks(height / 80, yFormat);

  
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));
  
    const bar = svg.append("g")
        .attr("fill", color)
      .selectAll("rect")
      .data(I)
      .join("rect")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth());
  
    // bar.append("title")
    //    .text(title);

    svg.append("text") // add title
        .attr("x", width / 2) // x location 
        .attr("y", (marginTop / 3) * 1.5) // y location
        .attr("text-anchor", "middle")
        .text("Figure 2: A quarter of police killing victims in 2015 were Blacks") // title
        .style("font-size", "18px") // title font
      //  .style("font-weight", "bold")
  
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);
  
    return svg.node();
  }