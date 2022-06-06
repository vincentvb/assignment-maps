mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map2 = new mapboxgl.Map({
  container: "map2",
  style: "mapbox://styles/vincentvanbuskirk/cl3ue8n9r005h14o8313atdpn",
  zoom: 3,
  maxZoom: 9,
  minZoom: 3,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: "albers",
});

map2.on("load", function () {
  map2.addLayer(
    {
      id: "us_police_dots",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/policeBrutality.geojson",
      },
      paint: {
        "circle-radius": 5,
        "circle-color": "#6193c7",
        "circle-stroke-color": "#000000",
        "circle-opacity": 0.5,
      },
    },
    "waterway-label"
  );
  map2.addLayer(
    {
      id: "us_state_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    },
    "us_police_dots"
  );
});

map2.on("click", "us_police_dots", function (e) {
  var stateName = e.features[0].properties.state;
  var cityName = e.features[0].properties.city;
  var date = e.features[0].properties.date;
  var description = e.features[0].properties.description;
  var url = e.features[0].properties.url;

  stateName = stateName.toUpperCase();
  cityName = cityName.toUpperCase();

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
        <h4>
            ${cityName}, ${stateName}
        </h4>
        <p>
            <b>${date}</b> | <a href=${url} target="_blank">Video</a>
        </p>
        <p>
            ${description}
        </p>
    `
    )
    .addTo(map2);
});
map2.on("mouseenter", "us_police_dots", function () {
  map2.getCanvas().style.cursor = "pointer";
});
map2.on("mouseleave", "us_police_dots", function () {
  map2.getCanvas().style.cursor = "";
});
