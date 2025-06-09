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


        const activeFireFlagIcon = L.icon({
            iconUrl: 'DESIGN/icons8-flag-100 (1).png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        const extinguishedFireFlagIcon = L.icon({
            iconUrl: 'DESIGN/icons8-flag-100.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        const fireDepartmentIcon = L.icon({
            iconUrl: 'DESIGN/icons8-fire-station-100.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

       
        const activeFireMarkers = [];
        const extinguishedFireMarkers = [];
        const fireStationMarkers = []; 

       
        const fireIncidentsClusterGroup = L.markerClusterGroup();


        const mockFireIncidents = [
           
            { lat: 42.6977, lng: 23.3219, description: "Градски пожар - Център на София", status: "active" },
            { lat: 42.7050, lng: 23.3300, description: "Пожар в жилищна сграда - Младост 1", status: "active" },
            { lat: 42.6850, lng: 23.3100, description: "Дребен пожар - близо до НДК", status: "active" },
            { lat: 42.7100, lng: 23.2700, description: "Пожар в сметище - Владая", status: "extinguished" },
            { lat: 42.7800, lng: 23.2000, description: "Пожар в сметище - Близо до София", status: "extinguished" },
            { lat: 42.6700, lng: 23.3300, description: "Инцидент с отпадъци - Красна поляна", status: "extinguished" },
            { lat: 42.7000, lng: 23.2900, description: "Пожар в къща - Драгалевци", status: "active" },
            { lat: 42.6600, lng: 23.2800, description: "Сухи треви - Бояна", status: "extinguished" },
            { lat: 42.7080, lng: 23.3450, description: "Пожар в гараж - Студентски град", status: "active" },

           
            { lat: 42.1354, lng: 24.7453, description: "Промишлен пожар - Индустриална зона Пловдив", status: "active" },
            { lat: 42.1500, lng: 24.7500, description: "Пожар в склад - Тракия", status: "active" },
            { lat: 42.1200, lng: 24.7200, description: "Сухи треви - Асеновградско шосе", status: "active" },
            { lat: 42.0800, lng: 24.8800, description: "Полеви пожар - близо до Асеновград", status: "extinguished" },
            { lat: 42.1600, lng: 24.7300, description: "Гаражен пожар - Кършияка", status: "extinguished" },
            { lat: 42.1000, lng: 24.7000, description: "Пожар в храсти - Коматево", status: "active" },
            { lat: 42.1700, lng: 24.7600, description: "Мазе - център Пловдив", status: "active" },

           
            { lat: 43.2047, lng: 27.9105, description: "Пожар на открито - около Варна", status: "active" },
            { lat: 43.2150, lng: 27.9250, description: "Храсти - Морска градина", status: "active" },
            { lat: 43.1950, lng: 27.8800, description: "Отпадъци - Владиславово", status: "active" },
            { lat: 43.2400, lng: 27.8000, description: "Пожар в къща - квартал Кайсиева градина", status: "extinguished" },
            { lat: 43.2200, lng: 27.9500, description: "Малък пожар - Виница", status: "extinguished" },
            { lat: 43.1800, lng: 27.9000, description: "Пожар в магазин - център Варна", status: "active" },

           
            { lat: 42.4980, lng: 27.4700, description: "Пожар в контейнер - Център Бургас", status: "active" },
            { lat: 42.5800, lng: 27.4200, description: "Сухи треви - край Атанасовско езеро", status: "extinguished" },
            { lat: 42.5200, lng: 27.7000, description: "Пожар в къща - с. Равнец", status: "active" },
            { lat: 42.5500, lng: 27.6500, description: "Полеви пожар - близо до Камено", status: "extinguished" },
            { lat: 42.5000, lng: 27.5000, description: "Пожар в жилищна сграда - Славейков", status: "active" },

            
            { lat: 43.0800, lng: 25.6200, description: "Сухи треви - около Велико Търново", status: "extinguished" },
            { lat: 43.0900, lng: 25.6300, description: "Отпадъци - Западна зона", status: "extinguished" },
            { lat: 43.1500, lng: 25.5000, description: "Пожар в склад - Горна Оряховица", status: "active" },
            { lat: 43.1600, lng: 25.5200, description: "Пожар в цех - Лясковец", status: "active" },
            { lat: 43.0600, lng: 25.6000, description: "Пожар в къща - Дебелец", status: "active" },

            
            { lat: 42.0200, lng: 23.1000, description: "Горски пожар - Рила планина", status: "active" },
            { lat: 41.8000, lng: 23.4000, description: "Сухи треви - близо до Сандански", status: "extinguished" },
            { lat: 41.7500, lng: 23.5000, description: "Дребен пожар - Петрич", status: "active" },
            { lat: 42.0500, lng: 23.1500, description: "Полеви пожар - близо до Симитли", status: "extinguished" },

            
            { lat: 43.4000, lng: 24.6000, description: "Полеви пожар - близо до Плевeн", status: "active" },
            { lat: 43.4100, lng: 24.6100, description: "Пожар в земеделска земя - Долна Митрополия", status: "active" },
            { lat: 43.3900, lng: 24.6300, description: "Пожар в жилищна сграда - Център Плевен", status: "active" },

            
            { lat: 42.4200, lng: 25.6300, description: "Пожар в къща - Стара Загора", status: "extinguished" },
            { lat: 42.5000, lng: 25.4000, description: "Сухи треви - Казанлък", status: "extinguished" },
            { lat: 42.4000, lng: 25.6000, description: "Полеви пожар - Диневи", status: "active" },

            
            { lat: 43.8500, lng: 25.9600, description: "Индустриален пожар - Русе", status: "active" },
            { lat: 43.8600, lng: 25.9700, description: "Малък пожар - ДЗС", status: "active" },
            { lat: 43.8400, lng: 25.9500, description: "Пожар в магазин - Център Русе", status: "active" },

           
            { lat: 42.6841, lng: 26.3190, description: "Пожар в жилищна сграда - Сливен", status: "active" },
            { lat: 43.2081, lng: 23.5516, description: "Горски пожар - Враца", status: "active" },
            { lat: 43.5684, lng: 27.8286, description: "Полеви пожар - Добрич", status: "extinguished" },
            { lat: 43.2721, lng: 26.9242, description: "Дребен пожар - Шумен", status: "active" },
            { lat: 41.6367, lng: 25.3789, description: "Пожар в гора - Кърджали", status: "active" },
            { lat: 41.6500, lng: 25.4000, description: "Сухи треви - Момчилград", status: "extinguished" },
        ];

        
        mockFireIncidents.forEach(fire => {
            let iconToUse;
            let popupStatusText;
            const marker = L.marker([fire.lat, fire.lng]);

            if (fire.status === "active") {
                marker.setIcon(activeFireFlagIcon);
                popupStatusText = "<b>Статус: Активен</b>";
                activeFireMarkers.push(marker); 
            } else {
                marker.setIcon(extinguishedFireFlagIcon);
                popupStatusText = "<b>Статус: Изгасен</b>";
                extinguishedFireMarkers.push(marker); 
            }
            marker.bindPopup(`<b>Пожар:</b><br>${fire.description}<br>${popupStatusText}`);
        });

       
        fireIncidentsClusterGroup.addLayers(activeFireMarkers);
        fireIncidentsClusterGroup.addLayers(extinguishedFireMarkers);
        firesMap.addLayer(fireIncidentsClusterGroup);


       
        const mockFireDepartments = [
            { lat: 42.6953, lng: 23.3235, description: "ГДПБЗН - София (Централа)" },
            { lat: 42.1481, lng: 24.7617, description: "РДПБЗН - Пловдив" },
            { lat: 43.2141, lng: 27.9147, description: "РДПБЗН - Варна" },
            { lat: 42.4950, lng: 27.4729, description: "РДПБЗН - Бургас" }, // Centered Burgas
            { lat: 43.0809, lng: 25.6292, description: "РДПБЗН - Велико Търново" },
            { lat: 43.4075, lng: 24.6225, description: "РДПБЗН - Плевен" },
            { lat: 42.4259, lng: 25.6318, description: "РДПБЗН - Стара Загора" },
            { lat: 43.8447, lng: 25.9680, description: "РДПБЗН - Русе" },
            { lat: 42.0207, lng: 23.0970, description: "РДПБЗН - Благоевград" },
            { lat: 41.6367, lng: 25.3789, description: "РДПБЗН - Кърджали" },
            { lat: 42.6841, lng: 26.3190, description: "РДПБЗН - Сливен" },
            { lat: 43.2081, lng: 23.5516, description: "РДПБЗН - Враца" },
            { lat: 43.5684, lng: 27.8286, description: "РДПБЗН - Добрич" },
            { lat: 43.2721, lng: 26.9242, description: "РДПБЗН - Шумен" },
            { lat: 42.6860, lng: 23.2750, description: "Пожарна служба - Люлин, София" },
            { lat: 42.1600, lng: 24.7800, description: "Пожарна служба - Източен, Пловдив" },
            { lat: 43.2000, lng: 27.9000, description: "Пожарна служба - Аспарухово, Варна" },
            { lat: 42.5300, lng: 27.4800, description: "Пожарна служба - Изгрев, Бургас" },
            { lat: 43.1000, lng: 25.6500, description: "Пожарна служба - Търново (север)" }
        ];

        
        mockFireDepartments.forEach(department => {
            const marker = L.marker([department.lat, department.lng], { icon: fireDepartmentIcon })
                             .bindPopup(`<b>${department.description}</b>`);
            fireStationMarkers.push(marker); // Store in fire stations list
        });

       
        const fireStationsLayerGroup = L.layerGroup(fireStationMarkers);
        firesMap.addLayer(fireStationsLayerGroup);


       
        const filterActiveFiresCheckbox = document.getElementById('filterActiveFires');
        const filterExtinguishedFiresCheckbox = document.getElementById('filterExtinguishedFires');
        const filterFireStationsCheckbox = document.getElementById('filterFireStations');

     
        function updateFireIncidents() {
            fireIncidentsClusterGroup.clearLayers();

            if (filterActiveFiresCheckbox.checked) {
                fireIncidentsClusterGroup.addLayers(activeFireMarkers); 
            }
            if (filterExtinguishedFiresCheckbox.checked) {
                fireIncidentsClusterGroup.addLayers(extinguishedFireMarkers); 
            }
            
        }

       
        function updateFireStations() {
            if (filterFireStationsCheckbox.checked) {
                firesMap.addLayer(fireStationsLayerGroup); 
            } else {
                firesMap.removeLayer(fireStationsLayerGroup); 
            }
        }

        
        filterActiveFiresCheckbox.addEventListener('change', updateFireIncidents);
        filterExtinguishedFiresCheckbox.addEventListener('change', updateFireIncidents);
        filterFireStationsCheckbox.addEventListener('change', updateFireStations);

    }
});