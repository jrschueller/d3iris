import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  schemeTableau10,
  scaleOrdinal,
} from "d3";

export const scatterPlot = () => {
  let width, height, data, xValue, yValue, margin, size, colorValue, xAxisLabel, yAxisLabel;

  const my = (selection) => {
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    // Automatically determine the unique species in the dataset
    // const speciesDomain = [...new Set(data.map(colorValue))];
    const speciesDomainMap = data.map((d) => d.colorValue);

    // Use d3's schemeTableau10 for colors, which provides 10 different colors
    const colorScale = scaleOrdinal(schemeTableau10).domain(speciesDomainMap);

    // Creating marks including colorValue
    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      species: colorValue(d), // Include species in the marks
    }));

    selection
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(axisLeft(y));

    selection
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));

    // x label
    selection
      .append("text")  // Append a text element
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)  // Center it horizontally
      .attr("y", height - margin.bottom / 4)  // Adjust vertical position as needed
      .text(xAxisLabel);

    // y label
    selection
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${margin.left / 2}, ${height / 2}) rotate(-90)`)  // Position and rotate
      //.attr("y", -margin.top / 2)
      //.attr("x", -margin.right + margin.top)
      .attr("y", -margin.left / 4)
      .attr("x", -margin.right + margin.top)
      .text(yAxisLabel);

    // draw circles
    selection
      .append("g")
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .attr("r", size)
      .attr("fill", (d) => colorScale(d.species)); // Apply the correct color
  };

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width;
  };

  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height;
  };

  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue;
  };

  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.size = function (_) {
    return arguments.length ? ((size = +_), my) : size;
  };

  my.colorValue = function (_) {
    return arguments.length ? ((colorValue = _), my) : colorValue;
  };

  my.xAxisLabel = function (_) {
    return arguments.length ? ((xAxisLabel = _), my) : xAxisLabel;
  };

  my.yAxisLabel = function (_) {
    return arguments.length ? ((yAxisLabel = _), my) : yAxisLabel;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  return my;
};
