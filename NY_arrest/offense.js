

d3.csv("data/offense.csv").then(data => {

for (let d of data) {
        d.count = +d.count; 
};

    console.log(data)

    data.sort((a, b) => b.count - a.count); 
    const height = 500,
          width = 800,
          margin = ({ top: 10, right: 10, bottom: 35, left: 55 });

    let svg = d3.select("#offense_bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 

    let x = d3.scaleBand() 
        .domain(data.map(d => d.offense)) 
        .range([margin.left, width - margin.right])
        .padding(0.1); 

    let y = d3.scaleLinear() 
        .domain([0, d3.max(data, d => d.count)]).nice()  
        .range([height - margin.bottom, margin.top]); 

    const xAxis = g => g  
        .attr("transform", `translate(0, ${height - margin.bottom +5})`)
        .call(d3.axisBottom(x).tickSizeInner(0)); 

    const yAxis = g => g 
        .attr("transform", `translate(${margin.left -5}, 0)`)
        .call(d3.axisLeft(y).ticks(5))
        
    const tooltip = d3.select('#offense_bar')
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")


    svg.append("g")
            .attr("class", "x-axis")
            .call(xAxis);

    svg.append("g")     
            .attr("class", "y-axis")
            .call(yAxis);

    let bar = svg.selectAll(".bar")
        .append("g") 
        .data(data) 
        .join("g")
        .attr("class", "bar");

    bar.append("rect")
        .attr("fill", "steelblue")
        .attr("x", d => x(d.offense))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.count))
        .attr("height", d => y(0) - y(d.count))
        .on("mousemove", function(event, d){
            tooltip
              .style("left", (event.pageX +20) + "px") 
              .style("top", (event.pageY -60) + "px") 
              .style("visibility", "visible")
              .html("<b>Offense name</b>: " + (d.offense) + "<br>" + "<b>Number of Arrests for this offense</b>: " + (d.count) + "<br>" + "<b>Percentage in all arrests</b>: " + (d.percent))
        })
    	.on("mouseout", function(d){ tooltip.style("visibility", "hidden");})



    bar.append('text') 
        .text(d => d.count) 
        .style("font-size", "20px")
        .attr('x', d => x(d.offense) + (x.bandwidth()/2)) // ?
        .attr('y', d => y(d.count) - 10) // ?
        .attr('text-anchor', 'middle')
        .style('fill', 'black');

    // var mouseover = function(d) {
    //         tooltip
    //             .html("subgroup: " + d.data[offense] + "<br>" + "Value: " + d.data[count])
    //             .style("opacity", 1)
    //       }

    // var mousemove = function(e,d) {
    //         tooltip
    //           .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    //           .style("top", (d3.mouse(this)[1]) + "px")
    //       }

    // var mouseleave = function(d) {
    //         tooltip
    //           .style("opacity", 0)
    //       }
        

    });