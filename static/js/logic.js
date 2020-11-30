// Creating map object
var myMap = L.map("mapid", {
    center: [36.77, -119.4179],
    zoom: 5
});

// Adding tile layer
var streetlayer=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
})

var satellitelayers=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY   
})
streetlayer.addTo(myMap);
var baseMaps={
    street:streetlayer,
    satellite:satellitelayers
}
L.control.layers(baseMaps).addTo(myMap)

// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function getcolor(i){
    return i > 90 ? "#EA2C2C" :
    i > 70  ? "#EA822C" :
    i > 50  ? "#EE9C00" :
    i > 30  ? "#EECC00" :
    i > 10  ?  "#D4EE00" :
             "#98EE00";
  }
// Grabbing our GeoJSON data..
d3.json(link, function (data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        // Passing in our style object
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.properties.place + "</h2>");

        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng,{
                radius:(feature.properties.mag)*5,
                fillColor:getcolor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(myMap);
})