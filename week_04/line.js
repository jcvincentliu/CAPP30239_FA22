/* D3 Line Chart */

// command+d to select all the same word

const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart") // svg is put on space: save time and space
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-monthly.csv').then(data => { // make sure data is on the page
    
  //  console.log(data)

    let timeParse = d3.timeParse("%Y-%m")  // change time type data

    for (let d of data) {
        d.Value = +d.Value
        d.Date = timeParse(d.Date);    // make data a timeparse type
    }

    let x = d3.scaleTime()
            .domain(d3.extent(data, d => d.Date)) // could hard code or get from data; d stands for each row
            .range([margin.left, width - margin.right]);  // where to put the graph

    let y = d3.scaleLinear() 
            .domain([0, d3.max(data, d => d.Value)])
            .range([height - margin.bottom, margin.top])

   // console.log(data)

    svg.append("g")  // filp order between this and next svg.append so that this runs first
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width)); // format y ticks, tickSize: add horizontal gridlines 
    
      svg.append("g") // append to itial variable defined in line 9
      .attr("transform", `translate(0,${height - margin.bottom})`) // make it in the right place
    //  .attr("class", "x-axis")
      .call(d3.axisBottom(x).tickSizeOuter(0)); // tickSize... will remove the little extra tick 
    

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em") // shifting dx and dy to format y axis title
      .attr("dy", "-0.5em") 
      .text("Year");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    // add lines below

    let line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.Value))   //  return a really long path that can be put inside d.attribute
        .curve(d3.curveNatural); // make line smoother

    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");
  });