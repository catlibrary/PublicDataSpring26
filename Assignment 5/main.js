// Consts / Global Variables
const w = 800;
const h = 500;
const margin = 50;

const parseTime = d3.timeParse("%Y-%m-%d");

// Load CSV
d3.csv("reading2.csv").then(data => {

    console.log("data", data);

    // Format data
    data.forEach(d => {
        d.date = parseTime(d.date);
        d.pages = +d.pages;
        d.hours = +d.hours;
    });

    // X Scale
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin, w - margin]);

    // Y Scale
    const yScale = d3.scaleLinear()
        .domain([0, 70])
        .range([h - margin, margin]);

    // Bottom Axis
    const bottomAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat("%b %d"));

    // Left Axis
    const leftAxis = d3.axisLeft()
        .scale(yScale);

    // SVG
    const svg = d3.select("svg")
        .attr("width", w)
        .attr("height", h);

    // Pages Line
    const pagesLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.pages));

    // Hours Line
    const hoursLine = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.hours));

    // Draw Pages Line
    svg.append("path")
        .data([data])
        .attr("d", pagesLine)
        .attr("class", "pages-line");

    // Draw Hours Line
    svg.append("path")
        .data([data])
        .attr("d", hoursLine)
        .attr("class", "hours-line");

    // Bottom Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - margin})`)
        .call(bottomAxis);

    // Left Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},0)`)
        .call(leftAxis);

    // X Axis Label
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - 5)
        .attr("text-anchor", "middle")
        .text("Date");

    // Y Axis Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Reading Activity");

    // Pages Label
    svg.append("text")
        .attr("x", xScale(data[data.length - 1].date) - 100)
        .attr("y", yScale(data[data.length - 1].pages))
        .attr("fill", "steelblue")
        .text("Pages Read");

    // Hours Label
    svg.append("text")
        .attr("x", xScale(data[data.length - 1].date) - 110)
        .attr("y", yScale(data[data.length - 1].hours) - 10)
        .attr("fill", "brown")
        .text("Hours Reading");

});