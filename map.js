mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vincentvanbuskirk/cl3ue8n9r005h14o8313atdpn',
    maxZoom: 9,
    minZoom: 3,
    center: [-85.5, 37.7]
});

map.on("load", function () {
    map.addLayer(
        {
          id: "state-outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/statesElections.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 1.5,
          },
        },
        "waterway-label"
      );
  map.addLayer(
    {
      id: "us_counties",
      maxzoom: 9,
      minzoom: 5.5,
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Farming",
          "#3498DB",
          "Nonspecialized",
          "#A569BD",
          "Maufacturing",
          "#117864",
          "Recreation",
          "#34495E",
          "Federal\/State Government",
          "#EA8379",
          "Mining",
          "#2ECC71",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "state-outline"
  );
  map.addLayer(
    {
      id: "us_counties",
      minzoom: 5,
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Farming",
          "#3498DB",
          "Nonspecialized",
          "#A569BD",
          "Maufacturing",
          "#117864",
          "Recreation",
          "#34495E",
          "Federal\/State Government",
          "#EA8379",
          "Mining",
          "#2ECC71",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "state-outline"
  );
  map.addLayer(
    {
      id: "us_states",
      maxzoom: 5,
      type: "fill",
      source: {
        type: "geojson",
        data: "data/stateFinal.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Farming",
          "#3498DB",
          "Nonspecialized",
          "#A569BD",
          "Manufacturing",
          "#117864",
          "Recreation",
          "#34495E",
          "Federal\/State Government",
          "#EA8379",
          "Mining",
          "#2ECC71",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "us_counties"
  );
});

map.on("click", "us_counties", function (e) {
  var stateName = e.features[0].properties.State; 
  var countyName = e.features[0].properties.County_name;
  var winner = e.features[0].properties.Economic_Type_Label;
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
      countyName + ", " + stateName + 
        "</h4>" +
        "<h2>" +
        winner +
        "</h2>" +
        "<p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "us_counties", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "us_counties", function () {
  map.getCanvas().style.cursor = "";
});

map.on("click", "us_states", function (e) {
    var stateName = e.features[0].properties.STATE_NAME; 
    var winner = e.features[0].properties.Economic_Type_Label;
    stateName = stateName.toUpperCase();
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
        stateName + 
          "</h4>" +
          "<h2>" +
          winner +
          "</h2>" +
          "<p>"
      )
      .addTo(map);
  });

  map.on("mouseenter", "us_states", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "us_states", function () {
    map.getCanvas().style.cursor = "";
  });