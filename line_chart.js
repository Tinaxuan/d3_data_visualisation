//ABOUT THE CODE SOURCE
// The code in this js file has been adapted from this resource: https://gist.github.com/wnghdcjfe/6377d75c963e8f841609a7bf6d3d0c74

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  },
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%b %Y");

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
function basicy() {
  var ret = d3.line().x(function (d) {
    return x(d.Year);
  });
  return ret;
}

var valueline = basicy().y(function (d) {
  return y(d.total12to17);
});
var valueline2 = basicy().y(function (d) {
  return y(d.total18to25);
});
var valueline3 = basicy().y(function (d) {
  return y(d.totalover26);
});

var div = d3
  .select("#line")
  .append("div")
  .attr("class", "tooltip1")
  .style("opacity", 0);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg2 = d3
  .select("#line")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
var datalist = [];
d3.csv("DrugsOverall.csv", function (error, data) {
  if (error) throw error;

  // scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.Year;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return Math.max(d.total12to17, d.total18to25, d.totalover26);
    }),
  ]);

  // add the valueline path.
  var dataArray = [
    {
      name: "total12to17",
      x: 100,
      y: 50,
      class: "line-text",
      class2: "line",
      dataline: valueline,
    },
    {
      name: "total18to25",
      x: 100,
      y: 70,
      class: "line2-text",
      class2: "line2",
      dataline: valueline2,
    },
    {
      name: "totalover26",
      x: 100,
      y: 90,
      class: "line3-text",
      class2: "line3",
      dataline: valueline3,
    },
  ];

  for (var i = 0; i < dataArray.length; i++) {
    svg2
      .append("text")
      .text(dataArray[i].name)
      .attr("x", dataArray[i].x)
      .attr("y", dataArray[i].y);
    svg2
      .append("rect")
      .attr("x", dataArray[i].x - 70)
      .attr("y", dataArray[i].y - 11)
      .attr("width", 50)
      .attr("height", 10)
      .attr("class", dataArray[i].class);

    svg2
      .append("path")
      .data([data])
      .attr("class", dataArray[i].class2)
      .attr("d", dataArray[i].dataline);
  }

  // add the dots with tooltips
  var fixeddot = svg2
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5);
  var fixeddot2 = svg2
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5);
  var fixeddot3 = svg2
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5);

  fixeddot
    .attr("cx", function (d) {
      return x(d.Year);
    })
    .attr("cy", function (d) {
      return y(d.total12to17);
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          "<p>Year : " +
            d.Year +
            "</p> <p>12-17 Total : " +
            d.total12to17 +
            "</p>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
      div.style("display", "block");
    })
    .on("mouseout", function (d) {
      div.transition().duration("400").style("opacity", 0);
      div.style("display", "none");
    });

  fixeddot2
    .attr("cx", function (d) {
      return x(d.Year);
    })
    .attr("cy", function (d) {
      return y(d.total18to25);
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          "<p>Year : " +
            d.Year +
            "</p> <p>18-25 Total : " +
            d.total18to25 +
            "</p>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    div.style("display", "block");
    })
    .on("mouseout", function (d) {
      div.transition().duration("400").style("opacity", 0);
      div.style("display", "none");
    });
  fixeddot3
    .attr("cx", function (d) {
      return x(d.Year);
    })
    .attr("cy", function (d) {
      return y(d.totalover26);
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          "<p>Year: " +
            d.Year +
            "</p> <p>Over 26 Total : " +
            d.totalover26 +
            "</p>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
     div.style("display", "block");
    })
    .on("mouseout", function (d) {
      div.transition().duration("400").style("opacity", 0);
      div.style("display", "none");
    });

  // add the X Axis
  svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the Y Axis
  svg2.append("g").call(d3.axisLeft(y));
});
