
/* Horizontal bar chart for COVID country cases */

d3.csv("data/offense.csv").then(data => {

for (let d of data) {
        d.count = +d.count; //force a number
     //   d.percent = +d.percent
};

    console.log(data)

    data.sort((a, b) => b.count - a.count); // sort from the highest to the lowest
    //sort by country: data.sort(a,b) => 

    const height = 500,
          width = 800,
          margin = ({ top: 10, right: 30, bottom: 35, left: 60 });

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
        .call(d3.axisBottom(x)); 

    const yAxis = g => g 
        .attr("transform", `translate(${margin.left -5}, 0)`)
        .call(d3.axisLeft(y).ticks(8))

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
        .attr("x", d => x(d.offense))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.count))
        .attr("height", d => y(0) - y(d.count));

    bar.append('text') 
        .text(d => d.percent) 
        .style("font-size", "20px")
        .attr('x', d => x(d.offense) + (x.bandwidth()/2)) // ?
        .attr('y', d => y(d.count) - 10) // ?
        .attr('text-anchor', 'middle')
        .style('fill', 'black');

    });





 // https://jsfiddle.net/matehu/w7h81xz2/
// const bar = d3.select('svg');
// const svgContainer = d3.select('#offense_bar');
    

// d3.csv("data/offense.csv").then(data => {

//     const margin = 80;
//     const width = 1000 - 2 * margin;
//     const height = 600 - 2 * margin;

//     const chart = svg.append('g')
//       .attr('transform', `translate(${margin}, ${margin})`);

//     const xScale = d3.scaleBand()
//       .range([0, width])
//       .domain(data.map((s) => s.offese))
//       .padding(0.4)
    
//     const yScale = d3.scaleLinear()
//       .range([height, 0])
//       .domain([0, 2050]);

//     // vertical grid lines
//     // const makeXLines = () => d3.axisBottom()
//     //   .scale(xScale)

//     const makeYLines = () => d3.axisLeft()
//       .scale(yScale)

//     chart.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(xScale));

//     chart.append('g')
//       .call(d3.axisLeft(yScale));

//     // vertical grid lines
//     // chart.append('g')
//     //   .attr('class', 'grid')
//     //   .attr('transform', `translate(0, ${height})`)
//     //   .call(makeXLines()
//     //     .tickSize(-height, 0, 0)
//     //     .tickFormat('')
//     //   )

//     chart.append('g')
//       .attr('class', 'grid')
//       .call(makeYLines()
//         .tickSize(-width, 0, 0)
//         .tickFormat('')
//       )

//     const barGroups = chart.selectAll()
//       .data(data)
//       .enter()
//       .append('g')

//     barGroups
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', (g) => xScale(g.offense))
//       .attr('y', (g) => yScale(g.count))
//       .attr('height', (g) => height - yScale(g.count))
//       .attr('width', xScale.bandwidth())
//       .on('mouseenter', function (actual, i) {
//         d3.selectAll('.count')
//           .attr('opacity', 0)

//         d3.select(this)
//           .transition()
//           .duration(300)
//           .attr('opacity', 0.6)
//           .attr('x', (a) => xScale(a.offense) - 5)
//           .attr('width', xScale.bandwidth() + 10)

//         const y = yScale(actual.count)

//         line = chart.append('line')
//           .attr('id', 'limit')
//           .attr('x1', 0)
//           .attr('y1', y)
//           .attr('x2', width)
//           .attr('y2', y)

//         barGroups.append('text')
//           .attr('class', 'divergence')
//           .attr('x', (a) => xScale(a.offense) + xScale.bandwidth() / 2)
//           .attr('y', (a) => yScale(a.count) + 30)
//           .attr('fill', 'white')
//           .attr('text-anchor', 'middle')
//           .text((a, idx) => {
//             const divergence = (a.count - actual.count).toFixed(1)
            
//             let text = ''
//             if (divergence > 0) text += '+'
//             text += `${divergence}%`

//             return idx !== i ? text : '';
//           })

//       })
//       .on('mouseleave', function () {
//         d3.selectAll('.count')
//           .attr('opacity', 1)

//         d3.select(this)
//           .transition()
//           .duration(300)
//           .attr('opacity', 1)
//           .attr('x', (a) => xScale(a.offense))
//           .attr('width', xScale.bandwidth())

//         chart.selectAll('#limit').remove()
//         chart.selectAll('.divergence').remove()
//       })

//     barGroups 
//       .append('text')
//       .attr('class', 'value')
//       .attr('x', (a) => xScale(a.offense) + xScale.bandwidth() / 2)
//       .attr('y', (a) => yScale(a.count) + 30)
//       .attr('text-anchor', 'middle')
//       .text((a) => `${a.count}%`)
    
//     bar.append('text')
//       .attr('class', 'label')
//       .attr('x', width / 2 + margin)
//       .attr('y', height + margin * 1.7)
//       .attr('text-anchor', 'middle')
//       .text('Violent Offenses')

//     bar.append('text')
//       .attr('class', 'title')
//       .attr('x', width / 2 + margin)
//       .attr('y', 40)
//       .attr('text-anchor', 'middle')
//       .text('Arrests By Violent Crimes in New York in 2021')

// })