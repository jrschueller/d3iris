import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom
} from "d3";

export const scatterPlot = () => {
  
  let width, height, data, xValue, yValue, margin, radius;

  const my = (selection) => {

    const x = scaleLinear()
      // d3.extent finds max and min... if you want to start at zero or end beyond the max, be explicit
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    selection
      .selectAll("circle")
      .data(marks)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", radius);

    // the 'g' syntax is adding an selection group element onto the prior instantiation of the selection
    // the `backtick` syntax is an ES6 string literal that will take the inner argument and apply it
    selection
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(axisLeft(y));

    selection
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));
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

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data;
  };

  return my;
};
