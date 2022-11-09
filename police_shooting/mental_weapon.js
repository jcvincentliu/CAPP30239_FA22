
d3.json('a3cleanedonly2015.json').then(data => { 

  let mental_age = [
    {
        "Age": "Under 20",
        "Mental_illness": "Yes",
        "Totals": 0
    },
    {
        "Age": "20-29",
        "Mental_illness": "Yes",
        "Totals": 0
    },
    {
        "Age": "30-39",
        "Mental_illness": "Yes",
        "Totals": 0
    },
    {
        "Age": "40-49",
        "Mental_illness": "Yes",
        "Totals": 0
    },
    {
      "Age": "50 or above",
      "Mental_illness": "Yes",
      "Totals": 0
  },
  {
    "Age": "Under 20",
    "Mental_illness": "No",
    "Totals": 0
},
{
    "Age": "20-29",
    "Mental_illness": "No",
    "Totals": 0
},
{
    "Age": "30-39",
    "Mental_illness": "No",
    "Totals": 0
},
{
    "Age": "40-49",
    "Mental_illness": "No",
    "Totals": 0
},
{
  "Age": "50 or above",
  "Mental_illness": "No",
  "Totals": 0
}]

for (let d of data) {
    if (d.Mental_illness == true) {
        if (d.Age < 20) {
          mental_age[0].Totals += 1
        } else if (d.Age > 19 && d.Age <30){
          mental_age[1].Totals += 1
        } else if (d.Age > 29 && d.Age <40) {
          mental_age[2].Totals += 1
        } else if (d.Age > 39 && d.Age <50) {
          mental_age[3].Totals += 1
        } else {
          mental_age[4].Totals += 1
        }
    } else {
      if (d.Age < 20) {
        mental_age[5].Totals += 1
      } else if (d.Age > 19 && d.Age <30){
        mental_age[6].Totals += 1
      } else if (d.Age > 29 && d.Age <40) {
        mental_age[7].Totals += 1
      } else if (d.Age > 39 && d.Age <50) {
        mental_age[8].Totals += 1
      } else {
        mental_age[9].Totals += 1
      }
    }}

      console.log(mental_age)

      let race_chart = StackedBarChart(mental_age, {
        x: d => d.Totals,
        y: d => d.Age,
        z: d => d.Mental_illness,
        yDomain: ["50 or above", "40-49", "30-39","20-29", "Under 20"], 
        zDomain: ["Yes", "No"],
        xLabel: "",
        width: 660,
        height: 500,
        colors: ["#feb24c", "#2c7fb8"]
      });

    document.getElementById("age_mental").appendChild(race_chart);
}) 

 
  // Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-horizontal-bar-chart
function StackedBarChart(data, {
  x = d => d, // given d in data, returns the (quantitative) x-value
  y = (d, i) => i, // given d in data, returns the (ordinal) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  marginTop = 70, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 0, // bottom margin, in pixels
  marginLeft = 120, // left margin, in pixels
  width = 660, // outer width, in pixels
  height, // outer height, in pixels
  xType = d3.scaleLinear, // type of x-scale
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  yDomain, // array of y-values
  yRange, // [bottom, top]
  yPadding = 0.1, // amount of y-range to reserve to separate bars
  zDomain, // array of z-values
  offset = d3.stackOffsetDiverging, // stack offset method
  order = d3.stackOrderNone, // stack order method
  xFormat, // a format specifier string for the x-axis
  xLabel, // a label for the x-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default y- and z-domains, and unique them.
  if (yDomain === undefined) yDomain = Y;
  if (zDomain === undefined) zDomain = Z;
  yDomain = new d3.InternSet(yDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the y- and z-domains.
  const I = d3.range(X.length).filter(i => yDomain.has(Y[i]) && zDomain.has(Z[i]));

  // If the height is not specified, derive it from the y-domain.
  if (height === undefined) height = yDomain.size * 25 + marginTop + marginBottom;
  if (yRange === undefined) yRange = [height - marginBottom, marginTop];

  // Compute a nested array of series where each series is [[x1, x2], [x1, x2],
  // [x1, x2], …] representing the x-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique y- and z-value.
  const series = d3.stack()
      .keys(zDomain)
      .value(([, I], z) => X[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => Y[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

  // Compute the default x-domain. Note: diverging stacks can be negative.
  if (xDomain === undefined) xDomain = d3.extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = xType(xDomain, xRange);
  const yScale = d3.scaleBand(yDomain, yRange).paddingInner(yPadding);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisTop(xScale).ticks(width / 80, xFormat);
  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

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
          .attr("stroke-opacity", 0.2))
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", -22)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xLabel));

  const bar = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", ([{i}]) => color(Z[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", ([x1, x2]) => Math.min(xScale(x1), xScale(x2)))
      .attr("y", ({i}) => yScale(Y[i]))
      .attr("width", ([x1, x2]) => Math.abs(xScale(x1) - xScale(x2)))
      .attr("height", yScale.bandwidth());

  svg.append("text") // add title
      .attr("x", width / 1.9) // x location 
      .attr("y", (marginTop / 3) * 1.5) // y location
      .attr("text-anchor", "middle")
      .text("Fig 3: Number of people with and without mental issues by age") // title
      .style("font-size", "20px")

  svg.append("g")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(yAxis);

  let legendGroup = svg
      .selectAll(".legend-group")
      .data(zDomain)
      .join("g")
      .attr("class", "legend-group");
  
    legendGroup
      .append("circle")
      .attr("cx", (d, i) => (10 + (i * 75)))
      .attr("cy",9)
      .attr("r", 5)
      .attr("fill", (d, i) => color(-i));
  
    legendGroup
      .append("text")
      .attr("x", (d, i) => (20 + (i * 75)))
      .attr("y",17)
      .text((d, i) => ["With", "Without"][i]);

  return Object.assign(svg.node(), {scales: {color}});
}
  
  /*  
  let x = d3.scaleBand(mental_age.map(d => (d.Age)),[margin.left, width - margin.right])
  .padding([0.2]);

  let y = d3.scaleLinear([0,45],[height - margin.bottom, margin.top]);

  stack_chart.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))

  stack_chart.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  const subgroups = ["Without mental illness", "With mental illness"];

  const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8']);

  const stackedData = d3.stack()
    .keys(subgroups)(mental_age);


  stack_chart.append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.Mental_illness))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d.data.Mental_illness))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width",x.bandwidth());

  let legendGroup = stack_chart
    .selectAll(".legend-group")
    .data(subgroups)
    .join("g")
    .attr("class", "legend-group");

  legendGroup
    .append("circle")
    .attr("cx", (d, i) => (10 + (i * 75)))
    .attr("cy",10)
    .attr("r", 3)
    .attr("fill", (d, i) => color(i));

  legendGroup
    .append("text")
    .attr("x", (d, i) => (20 + (i * 75)))
    .attr("y",15)
    .text((d, i) => subgroups[i]);
*/