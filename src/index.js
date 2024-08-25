import * as d3 from "d3";
const { csv } = d3;

console.log(d3);

const square = d3.selectAll("rect");
square.style("fill", "orange");

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// the '+' notation is a shorthand way to convert str to int
const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  d.species = +d.species;
  return d;
};

const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;

const margin = { top: 50, right: 50, bottom: 100, left: 100 };

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const main = async () => {
  const data = await csv(csvUrl, parseRow);

  const x = d3
    .scaleLinear()
    // d3.extent finds max and min... if you want to start at zero or end beyond the max, be explicit
    .domain(d3.extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([height - margin.bottom, margin.top]);

  const marks = data.map((d) => ({
    x: x(xValue(d)),
    y: y(yValue(d))
  }));

  svg
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 5);

  // the 'g' syntax is adding an SVG group element onto the prior instantiation of the svg
  // the `backtick` syntax is an ES6 string literal that will take the inner argument and apply it
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));

  svg
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));
};

main();
