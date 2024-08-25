import {
  csv,
  select,
  selectAll
} from 'd3';
import { scatterPlot } from "./scatterPlot.js";

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

// const xValue = (d) => d.petal_length;
// const yValue = (d) => d.sepal_length;

// const margin = { top: 50, right: 50, bottom: 100, left: 100 };
// const radius = 5;

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const main = async () => {
  const data = await csv(csvUrl, parseRow);

  svg.call(
    scatterPlot()
      .width(width)
      .height(height)
      .data(data)
      .xValue((d) => d.petal_length)
      .yValue((d) => d.sepal_length)
      .margin({ top: 50, right: 50, bottom: 100, left: 100 })
      .radius(5)
  );
};

main();
