document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
        const bulgariaCenterLat = 42.7333;
        const bulgariaCenterLng = 25.4858;
        const initialZoom = 7;

        const firesMap = L.map('map').setView([bulgariaCenterLat, bulgariaCenterLng], initialZoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(firesMap);

      
        const activeFireClockIcon = L.icon({
            iconUrl: 'DESIGN/icons8-flag-100 (1).png', 
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        const extinguishedFireClockIcon = L.icon({
            iconUrl: 'DESIGN/icons8-flag-100.png', 
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        const mockFireIncidents = [
            { lat: 42.6977, lng: 23.3219, description: "Градски пожар - Център на София", status: "active" },
            { lat: 42.78, lng: 23.20, description: "Горски пожар - Витоша, близо до хижа", status: "extinguished" },
            { lat: 42.1354, lng: 24.7453, description: "Промишлен пожар - Индустриална зона Пловдив", status: "active" },
            { lat: 42.20, lng: 24.90, description: "Полеви пожар - близо до Асеновград", status: "extinguished" },
            { lat: 43.2047, lng: 27.9105, description: "Пожар на открито - около Варна", status: "active" },
            { lat: 43.25, lng: 27.80, description: "Пожар в къща - квартал Кайсиева градина", status: "extinguished" },
            { lat: 42.45, lng: 27.55, description: "Горски пожар - Източна страна на Меден Рудник", status: "active" },
            { lat: 42.60, lng: 27.40, description: "Сухи треви - край Атанасовско езеро", status: "extinguished" },
            { lat: 42.52, lng: 27.70, description: "Пожар в къща - с. Равнец", status: "active" },
            { lat: 43.08, lng: 25.62, description: "Сухи треви - около Велико Търново", status: "extinguished" },
            { lat: 43.15, lng: 25.50, description: "Пожар в склад - Горна Оряховица", status: "active" },
            { lat: 42.02, lng: 23.10, description: "Горски пожар - Рила планина", status: "active" },
            { lat: 41.80, lng: 23.40, description: "Сухи треви - близо до Сандански", status: "extinguished" },
            { lat: 43.40, lng: 24.60, description: "Полеви пожар - близо до Плевeн", status: "active" },
            { lat: 42.42, lng: 25.63, description: "Пожар в къща - Стара Загора", status: "extinguished" },
            { lat: 43.85, lng: 25.96, description: "Индустриален пожар - Русе", status: "active" }
        ];

        mockFireIncidents.forEach(fire => {
            let iconToUse;
            let popupStatusText;

            if (fire.status === "active") {
                iconToUse = activeFireClockIcon;
                popupStatusText = "<b>Статус: Активен</b>";
            } else {
                iconToUse = extinguishedFireClockIcon;
                popupStatusText = "<b>Статус: Изгасен</b>";
            }

            L.marker([fire.lat, fire.lng], { icon: iconToUse })
                .addTo(firesMap)
                .bindPopup(`<b>Пожар:</b><br>${fire.description}<br>${popupStatusText}`);
        });

        const generalFireDepartmentLat = 42.6953;
        const generalFireDepartmentLng = 23.3235;
        const fireDepartmentIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/1005/1005085.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });
        L.marker([generalFireDepartmentLat, generalFireDepartmentLng], {icon: fireDepartmentIcon})
            .addTo(firesMap)
            .bindPopup("<b>ГДПБЗН - София</b><br>Централа");
    }
});