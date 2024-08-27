import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  schemeTableau10,
  scaleOrdinal,
} from "d3";

export const scatterPlot = () => {
  let width, height, data, xValue, yValue, margin, size, colorValue, xAxisLabel, yAxisLabel, title, subtitle, footnote;

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

    // x label
    selection
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - (0.5*margin.bottom))
      .text(xAxisLabel);

    // y label
    selection
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${margin.left / 2}, ${height / 2}) rotate(-90)`)  // Position and rotate
      .attr("y", -margin.left / (0.25*margin.right))
      .attr("x", -margin.right + margin.top)
      .text(yAxisLabel);

    // add a title
    selection
      .append("text")
      .attr('class', 'title')
      .attr("x", margin.left - (0.5*margin.left))
      .attr("y", margin.top - (0.5*margin.top))
      .attr("text-anchor", "left")
      .text(title);

    // add a subtitle
    selection
      .append("text")
      .attr('class', 'subtitle')
      .attr("x", margin.left - (0.5*margin.left))
      .attr("y", margin.top - (0.2*margin.top))
      .attr("text-anchor", "left")
      .text(subtitle);

    // add a footnote
      selection
      .append("text")
      .attr('class', 'footnote')
      .attr("x", margin.left - (0.5*margin.left))
      .attr("y", height - (0.2*margin.bottom))
      .attr("text-anchor", "left")
      .text(footnote);

    selection
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(axisLeft(y));

    selection
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));

    // draw circles
    selection
      .append("g")
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
      .attr("r", size)
      .attr("fill", (d) => colorScale(d.species));

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

  my.title = function (_) {
    return arguments.length ? ((title = _), my) : title;
  };

  my.subtitle = function (_) {
    return arguments.length ? ((subtitle = _), my) : subtitle;
  };

  my.footnote = function (_) {
    return arguments.length ? ((footnote = _), my) : footnote;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  return my;

};
