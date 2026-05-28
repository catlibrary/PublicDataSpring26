// Consts / global variables
const w = 600;
const h = 600;
const margin = 50;

// Load CSV
d3.csv("reading3.csv").then(data => {

    console.log("data", data);

    // Format data
    data.forEach(d => {
        d.book = d.book;
        d.genre = d.genre;
        d.x = +d.x;
        d.y = +d.y;
        d.pages = +d.pages;
    });

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([margin, w - margin]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([h - margin, margin]);

    // Tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Tooltip functions
    const mouseover = function(event, d) {

        tooltip
            .html(
                "Book: " + d.book +
                "<br>Genre: " + d.genre +
                "<br>Pages: " + d.pages
            )
            .style("opacity", 1)
            .style("left", (event.pageX + 3) + "px")
            .style("top", (event.pageY + 3) + "px");
    };

    const mousemove = function(event, d) {

        tooltip
            .style("left", (event.pageX + 3) + "px")
            .style("top", (event.pageY + 3) + "px");
    };

    const mouseout = function(event, d) {

        tooltip
            .style("opacity", 0);
    };

    // SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Axes
    const bottomAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - margin) + ")")
        .call(bottomAxis);

    const leftAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin + ",0)")
        .call(leftAxis);

    // Star symbol
    const symbolData = d3.symbol()
        .type(d3.symbolStar)
        .size(300);

    // Stars
    const stars = svg.selectAll("stars")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "stars")
        .attr("d", symbolData)
        .attr("transform", d =>
            "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
        )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    // Slider interaction
    d3.select("#mySlider").on("change", event => {
    const selected = event.currentTarget;

    d3.select("#sliderValue")
        .text(selected.value + " pages");

    stars
        .style("fill", d => d.pages <= selected.value ? "gold" : "mediumpurple");

    console.log("selected", selected.value);
});

});