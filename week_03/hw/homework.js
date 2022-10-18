
d3.csv("library_visits_jan22.csv").then(data => {  
    for (let d of data) {
        d.num = +d.num; // making num numerical
    };
    
    const height = 700, // define page layout parameters
          width = 800,
          margin = ({top: 30, right: 30, bottom: 35, left:50}); 
 
   
    let svg = d3.select("#chart")    // load library
        .append("svg")
        .attr("viewBox", [0,0,width,height])  // add viewbox
 
     let x = d3.scaleBand()  // x should employ a band scale (bar-like scale)
             .domain(data.map(d => d.branch))  // bounds of values: what numbers, to the lowest or the highest, can I take?
             .range([margin.left, width - margin.right]) // where x scale is placed (leftmost end, rightmost end)
             .padding(0.1);
     
     let y = d3.scaleLinear() // y should employ a linear scale
             .domain([0, d3.max(data, d => d.num)]).nice()  // function is similar to x.domain, nice() make it look nicer
             .range([height - margin.bottom, margin.top]); // where y scale is placed in a reverse order (bottommost end, uppermost end)
 
     const xAxis = g => g  //transform x axis (to make it look nicer)
         .attr("transform", `translate(0, ${height - margin.bottom +5})`)
         .call(d3.axisBottom(x)); // put x axis on the bottom of the page
 
     const yAxis = g => g  //transform y axis (to make it look nicer)
         .attr("transform", `translate(${margin.left -5}, 0)`)
         .call(d3.axisLeft(y));    // put y axis on the left side of the page
 
     svg.append("g") // call x axis
             .call(xAxis);
 
     svg.append("g")        // call y axis
             .call(yAxis);

     svg.append("text") // add title
        .attr("x", width / 2) // x location 
        .attr("y", (margin.top / 3) * 2) // y location
        .attr("text-anchor", "middle")
        .text("Branch Blackstone had the highest visit number among all branches") // title
        .style("font-size", "18px") // title font
        .style("font-weight", "bold") // title format (bolded)
 
     let bar = svg.selectAll(".bar") // add bars
         .append("g") //append group
         .data(data)  //data join
         .join("g")
         .attr("class", "bar"); // attributes
     
     bar.append("rect") // add bars
         .attr("fill", "#55b748") // fill color
         .attr("x", d => x(d.branch)) // x location of bars
         .attr("width", x.bandwidth()) // bar width
         .attr("y", d => y(d.num)) // y location
         .attr("height", d => y(0) - y(d.num)); // bar height

    bar.append('text') // add text labels to bars
         .text(d => d.num) // text of labels
         .attr('x', d => x(d.branch) + (x.bandwidth()/2)) // ?
         .attr('y', d => y(d.num) + 15) // ?
         .attr('text-anchor', 'middle')
         .style('fill', 'white'); // label color
 }); 
 
 