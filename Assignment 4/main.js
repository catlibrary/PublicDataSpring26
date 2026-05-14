// Declare chart dimensions and margins
const margin = 30;
const width = 500;
const height = 500;


// Load reading data from CSV
d3.csv("reading.csv").then(data => {

    console.log("data", data);

    // Format the data
    data.forEach(d => {
        d.day = d.day;
        d.hours = +d.hours;
    });

    // Find the maximum y-value
    const maxY = d3.max(data, d => d.hours);


    // Create x and y scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.day))
        .range([margin, width - margin])
        .paddingInner(.02);

    const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin, margin]);


    // Create SVG container
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    // Create axes
    const bottomAxis = d3.axisBottom()
        .scale(xScale);

    const leftAxis = d3.axisLeft()
        .scale(yScale);


    // Create bars for reading hours
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.day))
        .attr("y", d => yScale(d.hours))
        .attr("width", xScale.bandwidth())
        .attr("height", d => (height - margin) - yScale(d.hours))
        .attr("fill", "darkslateblue");


    // Add bottom axis
    svg.append("g")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(bottomAxis);

    // Add left axis
    svg.append("g")
        .attr("transform", "translate(" + margin + ",0)")
        .call(leftAxis);

});