   mapboxgl.accessToken = mapToken ;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // must have
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 8// starting zoom
    });

    const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup (new mapboxgl.Popup({offset: 35}).setHTML(`<h6>${listing.location}</h6> <p> Exact Location Provided after booking</p>`)
    .setMaxWidth("300px")
     )
    .addTo(map);