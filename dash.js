//ABOUT THE CODE SOURCE
//The code in this js file has been adapted from https://leafletjs.com/examples/choropleth/ and https://codepen.io/kalaiselvan/pen/XKLmay

var geojson;
var pie_data;
var year_number = 2014;
var click_control = 0;
var state = "US Overall";
var info = L.control();
var legend = L.control({ position: "bottomright" });

var map = L.map("map").setView([37.8, -96], 4);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 10,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

function getColor(d) {
  return d > 25000
    ? "#800026"
    : d > 20000
    ? "#BD0026"
    : d > 15000
    ? "#E31A1C"
    : d > 10000
    ? "#FC4E2A"
    : d > 5000
    ? "#FD8D3C"
    : d > 2000
    ? "#FEB24C"
    : d > 1000
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.TotalAmount),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
  console.log(feature.properties.TotalAmount);
}

function getGeo(year) {
  if (year == 2010) {
    Data = state_2010;
    pie_data = {
      Dependents12to17: 40209,
      Dependents18to25: 216579,
      DependentsOver26: 587018,
    };
  } else if (year == 2011) {
    Data = state_2011;
    pie_data = {
      Dependents12to17: 33691,
      Dependents18to25: 206994,
      DependentsOver26: 578792,
    };
  } else if (year == 2012) {
    Data = state_2012;
    pie_data = {
      Dependents12to17: 31124,
      Dependents18to25: 203720,
      DependentsOver26: 590667,
    };
  } else if (year == 2013) {
    Data = state_2013;
    pie_data = {
      Dependents12to17: 28593,
      Dependents18to25: 200394,
      DependentsOver26: 602695,
    };
  } else if (year == 2014) {
    Data = state_2014;
    pie_data = {
      Dependents12to17: 25595,
      Dependents18to25: 195190,
      DependentsOver26: 582092,
    };
  }
}

function draw() {
  geojson = L.geoJson(Data, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
  pie_update(pie_data);
}

function redraw() {
  geojson.remove();
  geojson = L.geoJson(Data, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
  pie_update(pie_data);
}

function highlightFeature(e) {
  geojson.setStyle(style);
  var layer = e.target;
  click_control = 1;
  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
  hover_data(layer.feature.properties);
  state = layer.feature.properties.name;
  pie_update(pie_data);
}

function resetHighlight(e) {
  //   map.flyTo([37.8, -96], 4);
  click_control = 0;
  geojson.resetStyle(e.target);
  info.update();
  reset_pie();
  pie_update(pie_data);
  state = "US Overall";
}

// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

// function clickControl(e) {
//   if (click_control == 0) {
//     console.log(click_control);
//     highlightFeature(e);
//     console.log(click_control);
//   } else {
//     resetHighlight(e);
//   }
// }
function onEachFeature(feature, layer) {
  layer.on({
    click: highlightFeature,
    dblclick: resetHighlight,
    // click: clickControl,
  });
}

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<h4>The total number of Alcohol Dependents</h4>" +
    (props
      ? "<b>" + props.name + "</b><br />" + props.TotalAmount + " people "
      : "Click a State to check - Double click to release");
};

info.addTo(map);

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 1000, 2000, 5000, 10000, 15000, 20000, 25000],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

legend.addTo(map);

function reset_pie() {
  if (year_number == 2010) {
    console.log("update");
    pie_data = {
      Dependents12to17: 40209,
      Dependents18to25: 216579,
      DependentsOver26: 587018,
    };
  } else if (year_number == 2011) {
    console.log("update");
    pie_data = {
      Dependents12to17: 33691,
      Dependents18to25: 206994,
      DependentsOver26: 578792,
    };
  } else if (year_number == 2012) {
    console.log("update");
    pie_data = {
      Dependents12to17: 31124,
      Dependents18to25: 203720,
      DependentsOver26: 590667,
    };
  } else if (year_number == 2013) {
    console.log("update");
    pie_data = {
      Dependents12to17: 28593,
      Dependents18to25: 200394,
      DependentsOver26: 602695,
    };
  } else if (year_number == 2014) {
    pie_data = {
      Dependents12to17: 25595,
      Dependents18to25: 195190,
      DependentsOver26: 582092,
    };
    console.log("update");
  }
}

var width = 450;
height = 450;
margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg1 = d3
  .select("#piechart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
function hover_data(props) {
  pie_data = {
    Dependents12to17: props.Dependents12to17,
    Dependents18to25: props.Dependents18to25,
    DependentsOver26: props.DependentsOver26,
  };
}

// set the color scale
var color = d3
  .scaleOrdinal()
  .domain(["Dependents12to17", "Dependents18to25", "DependentsOver26"])
  .range(["#f89e35", "#aaa", "#405275"]);

// A function that create / update the plot for a given variable:
function pie_update(data) {
  // Compute the position of each group on the pie:
  var pie = d3
    .pie()
    .value(function (d) {
      return d.value;
    })
    .sort(function (a, b) {
      return d3.ascending(a.key, b.key);
    }); // This make sure that group order remains the same in the pie chart

  var data_ready = pie(d3.entries(data));

  var tooltip = d3
    .select("#piechart") // NEW
    .append("div") // NEW
    .attr("class", "tooltip")
    .style("opacity", 0); // NEW

  // tooltip.append('div')                                           // NEW
  //     .attr('class', 'label');                                      // NEW

  // tooltip.append('div')
  // .attr('class', 'count');

  // map to data
  // this is all the data about arc(data, index, angle etc)
  var u = svg1.selectAll("path").data(data_ready);

  // var arc = svg.selectAll("g.src")
  u.transition()
    .duration(1000)
    .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u.enter()
    .append("path")
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("transform", "translate(0, 0)")
    .on("mouseover", function (d, i) {
      d3.select(this).transition().duration("50").attr("opacity", ".85");
      tooltip.transition().duration(50).style("opacity", 1);

      tooltip
        .html(
          "<p>State: " +
            state +
            "</p> <p> " +
            d.data.key +
            ": " +
            d.data.value +
            "</p>"
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");

      // tooltip.select('.label').html(d.data.key + ": ");
      // console.log(d.data.value);
      // tooltip.select('.count').html(d.data.value);
      tooltip.style("display", "block");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition().duration("50").attr("opacity", "1");
      div.transition().duration("50").style("opacity", 0);
      tooltip.style("display", "none");
    });

  // remove the group that is not present anymore
  u.exit().remove();
}

// initialize the dashboard
var slider = d3.select("#year");
slider.on("change", function () {
  getGeo(this.value);
  year_number = this.value;
  redraw();
});

getGeo(2014);
pie_update(pie_data);
draw();
