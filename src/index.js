import { csv, select } from "d3";
import { scatterPlot } from "./scatterPlot.js";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// the '+' notation is a shorthand way to convert str to int
const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  d.species = d.species;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const main = async () => {
  const data = await csv(csvUrl, parseRow);

  //console.log(data); 
  
  svg.call(
    scatterPlot()
      .width(width)
      .height(height)
      .data(data)
      .xValue((d) => d.petal_length)
      .yValue((d) => d.sepal_length)
      .colorValue((d) => d.species)
      .margin({
        top: 100,
        right: 75,
        bottom: 150,
        left: 125,
      })
      .size(8)
      .xAxisLabel('petal length')
      .yAxisLabel('sepal length')
      .title('Slips, trips, and falls account for 80 percent of all accidents')
      .subtitle('Improvements to safety checklists are likely to reduce incidents')
      .footnote('Source: data was acquired in the most painstaking fashion imaginable')
    ).append('image')
    .attr('xlink:href', 'https://www.holmesmurphy.com/wp-content/themes/holmes-murphy/resources/images/hm_logo--vertical.svg')  // can also add svg file here
    .attr('x', 0.9*width)
    .attr('y', 0.9*height)
    .attr('width', 0.075*width)
    .attr('height', 0.075*height);

};

main();

