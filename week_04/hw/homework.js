/* D3 Line Chart */

// command+d to select all the same word

const height = 400,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart") // svg is put on space: save time and space
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-canada.csv').then(data => { // make sure data is on the page
    
  //  console.log(data)

    let timeParse = d3.timeParse("%Y-%m")  // change time type data

    for (let d of data) {
        d.Num = +d.Num
        d.Month = timeParse(d.Month);    // make data a timeparse type
    }

    let x = d3.scaleTime()
            .domain(d3.extent(data, d => d.Month)) // d3.extent get the extent/range of a series of values
            .range([margin.left, width - margin.right]);  // where to put the graph

    let y = d3.scaleLinear() 
            .domain([0, d3.max(data, d => d.Num)]) // line chart should start at 0
            .range([height - margin.bottom, margin.top])

   // console.log(data)

    svg.append("g")  
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width)); // format y ticks, tickSize: add horizontal gridlines 
    
      svg.append("g") // append to itial variable defined in line 9
      .attr("transform", `translate(0,${height - margin.bottom})`) // make sure the axis is in the right place
      .call(d3.axisBottom(x).tickSizeOuter(0)) //remove outer ticks
          //      .tickValues(["Jan", "Feb", "Mar", "April", "May", "Jun", 
             //               "July", "Aug", "Sep", "Oct", "Nov", "Dec"])); 
    

    svg.append("text")  // here is our text
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "-.6em") // title location
      .attr("dy", "-0.5em") 
      .text("Year 2020"); //x axis title
    
    svg.append("text") // now texts on y-axis
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate (%)");

    // add lines below

    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num));   

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none") // no line fill: not equivalent to area chart
        .attr("stroke", "purple"); // line color
    
    let Tooltip = d3.select("#chart")  // this part tries to add interactivity
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

    let mouseover = function(d){
            Tooltip
            .style("opacity", 1)
        }

    let mousemove = function(d) {  // this part is off: exact value is wrong
            Tooltip
                  .html("Exact value: " + d.Num)
                  .style("left", (d3.pointer(this)[0]+70) + "px")
                  .style("top", (d3.pointer(this)[1]) + "px")
              }

    let mouseleave = function(d) {
                Tooltip
                  .style("opacity", 0)
              }
    
    svg.selectAll("myCircles")
        .data(data)
        .enter()
        .append("circle")
            .attr("fill", "black")
            .attr("stroke", "none")
            .attr("cx", d => x(d.Month))
            .attr("cy", d => y(d.Num))
            .attr("r", 3)
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill", "white")
            .on("mouseover", mouseover)   //this and below are not working
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

    
  });