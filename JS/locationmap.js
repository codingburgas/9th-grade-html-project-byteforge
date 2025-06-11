document.addEventListener('DOMContentLoaded', () => {

    

    
    const locationInput = document.getElementById('location');
    let map;

    
    map = L.map('map').setView([42.628710, 25.322102], 6);

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 

  
    let marker;

    
    map.on('click', (e) => { 
        
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        
        const formattedCoords = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        
        locationInput.value = formattedCoords;

        
        if (marker) {
            marker.remove();
        }

        
        marker = L.marker([lat, lng]).addTo(map);

        
        marker.bindPopup(`Избрано местоположение: ${formattedCoords}`).openPopup();
    });

});