L.mapbox.accessToken = mapToken;

var map = L.mapbox.map('radius-map', 'mapbox.streets');
var myLayer = L.mapbox.featureLayer().addTo(map);

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
      map.locate();
}

var RADIUS = 3000;
var filterCircle = L.circle(L.latLng(37, 55), RADIUS, {
    opacity: 1,
    weight: 1,
    fillOpacity: 0.4
}).addTo(map);

var featureLayer = L.mapbox.featureLayer()
    .addTo(map);

let feturesPoints = [];
for (i = 0; i < places.features.length; i++) {
    let tmp = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [places.features[i].geometry.coordinates[0], places.features[i].geometry.coordinates[1]]
        },
        properties: { }
    }
    feturesPoints.push(tmp);
}

featureLayer.setGeoJSON({
    type: "FeatureCollection",
    features: feturesPoints
});

map.on('mousemove', function(e) {
    filterCircle.setLatLng(e.latlng);
    featureLayer.setFilter(function points(feature) {
        return e.latlng.distanceTo(L.latLng(
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0])) < RADIUS;
    });
});

map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);
    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'МОЕ МЕСТОПОЛОЖЕНИЕ',
            'marker-color': '#ff8888',
        }
    });

});

