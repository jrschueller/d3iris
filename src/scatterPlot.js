import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  schemeTableau10,
  scaleOrdinal,
} from "d3";

export const scatterPlot = () => {
  let width, height, data, xValue, yValue, margin, size, colorValue;

  const my = (selection) => {
    const x = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    // Automatically determine the unique species in the dataset
    // const speciesDomain = [...new Set(data.map(colorValue))];
    const speciesDomainMap = data.map(d => d.colorValue);

    // Use d3's schemeTableau10 for colors, which provides 10 different colors
    const colorScale = scaleOrdinal(schemeTableau10)
      .domain(speciesDomainMap);

    // Creating marks including colorValue
    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      species: colorValue(d),  // Include species in the marks
    }));

    selection
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(axisLeft(y));

    selection
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));

    // Draw circles
    selection
    .append("g")
    .selectAll("circle")
    .data(marks)
    .join("circle")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
    .attr("r", size)
    .attr("fill", d => colorScale(d.species));  // Apply the correct color

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

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  return my;
  
};
