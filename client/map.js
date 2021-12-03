var map;
//geoJson data 
var geojson = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'properties': {},
            'coordinates': [
                [12.450256347656248, 43.092960677116295],
                [12.0904541015625, 42.70867781741311]
            ]
        }
    }]
};
isMapReady = false;
var marker1;
var marker2;
//display map on page
function mapShow() {
    if (!map) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FwMjQiLCJhIjoiY2t2MjN5dXNsMW55czJucXE0Y3Z1cDVubSJ9.33RKSUTCtdnjp9xyxlymkw';
        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [12.450256347656248, 43.092960677116295], // starting position [lng, lat]
            zoom: 4, // starting zoom
        });
        map.on('load', () => {
            console.log("OOOOOOOOOOOOOOOOOOOOOKKKKKKK");
            isMapReady = true;
            var geolocate = new mapboxgl.GeolocateControl();
            map.addControl(geolocate);

            geolocate.on('geolocate', function(e) {
                var lon = e.coords.longitude;
                var lat = e.coords.latitude
                var position = [lon, lat];
                console.log(position);
            });
        });
    }
}
//function function that geolocates YOU.
function geolocate() {
    mapShow();
}
//function that draws line between 2 cities
function line() {
    drawGeo();
    marker();
    const coordinates = geojson.features[0].geometry.coordinates;

    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
    );

    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    for (const coord of coordinates) {
        bounds.extend(coord);
    }
    map.fitBounds(bounds, {
        padding: 20
    });
}
//function that remove line between 2 cities previously created
function remove() {
    if (isMapReady) {
        if (map.getLayer('route')) {
            map.removeLayer('route');
        }
        if (map.getSource('route')) {
            map.removeSource('route');
        }
        if (marker1) {
            marker1.remove();
        }
        if (marker2) {
            marker2.remove();
        }

    }
}
//draw geo
function drawGeo() {
    if (isMapReady) {
        //draw GeoJson when the map loads
        map.addSource('route', {
            'type': 'geojson',
            'data': geojson,
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#151414',
                'line-width': 3
            }
        });
    }
}
//add marker on the map 
function marker() {
    if (isMapReady) {
        marker1 = new mapboxgl.Marker({
                color: "#B94E48",
                draggable: false
            }).setLngLat([12.450256347656248, 43.092960677116295])
            .addTo(map);
        marker2 = new mapboxgl.Marker({
                color: "#EBDEEB",
                draggable: false
            }).setLngLat([12.0904541015625, 42.70867781741311])
            .addTo(map);
    }
}
//add map style satellite
function satellite() {
    if (isMapReady) {
        map.setStyle('mapbox://styles/mapbox/satellite-v9');
    }
}
//add map style dark
function dark() {
    if (isMapReady) {
        map.setStyle('mapbox://styles/mapbox/dark-v10');
    }
}
//add map style dark  
function light() {
    if (isMapReady) {
        map.setStyle('mapbox://styles/mapbox/light-v10');
    }
}