mapboxgl.accessToken = mapToken;

let directions = new MapboxDirections({
    accessToken: mapToken,
    unit: 'metric',
    profile: 'mapbox/walking',
    interactive: false,
    controls: false
});

const map = new mapboxgl.Map({
    container: 'routes-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [37.615173, 55.759978],
    zoom: 10
});
 
let pointsArr = []
var addFunc = function(pointsArr, a, b) {
    let arr = [];
    arr.push(a);
    arr.push(b);
    pointsArr.push(arr);
}

for (i = 0; i < places.features.length; i++) {
    var description = `<h3>${places.features[i].title}</h3><p>${places.features[i].location}</p><button class="btn btn-success" onclick='addFunc(pointsArr,
        ${places.features[i].geometry.coordinates[0]}, ${places.features[i].geometry.coordinates[1]})'> Добавть точку</button>`
    new mapboxgl.Marker()
    .setLngLat(places.features[i].geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        description
    )
    )
    .addTo(map);
}



map.on('click', function() { 
    if (pointsArr.length > 1){ 
        for (let i = 0; i < pointsArr.length - 2; i++) { 
            let min_s = 10000000  
            let next_id = -1  
            for (let j = i+1; j < pointsArr.length; j++) { 
                let s = (pointsArr[i][0] - pointsArr[j][0])**2 + (pointsArr[i][1] - pointsArr[j][1])**2; 
                if (s < min_s) { 
                    min_s = s;  
                    next_id = j; 
                } 
            } 
            let c = pointsArr[i + 1]  
            pointsArr[i + 1] = pointsArr[next_id]  
            pointsArr[next_id] = c 
        } 
        directions.removeRoutes() 
        for (let i = 0; i < pointsArr.length; i++) { 
            directions.setOrigin(pointsArr[0]); 
            if (i === pointsArr.length - 1) { 
                directions.setDestination(pointsArr[pointsArr.length - 1]); 
            } else { 
                directions.addWaypoint(i, pointsArr[i]); 
            } 
        } 
    } 
});

map.addControl(directions, 'top-left');