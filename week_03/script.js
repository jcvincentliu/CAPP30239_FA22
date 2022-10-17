
/* bar charts for COVID country cases */

d3.csv("covid.csv").then(data => {  // have the data before anything happens in this page
   // console.log(data);
   for (let d of data) {
        d.cases = +d.cases // the + forces it to a number
        d.vaccination = +d.vaccination;
   };
   
   const height = 600,
        width = 800,
        margin = ({top: 25, right: 30, bottom: 35, left:50}); // margin matters: how many space we have

  
    let svg = d3.select("#chart")    // hash chart means the chart in index.html
        .append("svg")
        .attr("viewBox", [0,0,width,height]) // viewbox: 0,0: top-left

    let x = d3.scaleBand() //scale is an important concept in D3: how to use the space; takes in a 1> domain (value you have) eg 0, 1k (min, max in dataset) or categorical --> values of data; 2> a range (pixel space to take up)
            .domain(data.map(d => d.country)) // scaleband is only for bar charts, return an array
            .range([margin.left, width - margin.right])
            .padding(0.1); // specific for scaleband: how far each bar
    
    let y = d3.scaleLinear() // build the y scale
            .domain([0, d3.max(data, d => d.cases)]).nice()  // number, nice() is a d3 buil-in function that makes the y scale look nicer
            .range([height - margin.bottom, margin.top]);  // space to display, svgs are built from top to down

    const xAxis = g => g  // this is similar to define a function g and return it
        .attr("transform", `translate(0, ${height - margin.bottom +5})`)
        .call(d3.axisBottom(x)); // automatically run the function

    const yAxis = g => g  // this is similar to define a function g and return it
        .attr("transform", `translate(${margin.left -5}, 0)`)
        .call(d3.axisLeft(y));   // .ticks(8).tickSizeInner(-width + margin.left + margin.right)

    svg.append("g")
            .call(xAxis);

    svg.append("g")       
            .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g") //append group
        .data(data)  //data join
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases));
}); 

