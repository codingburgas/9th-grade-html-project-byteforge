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

        const carCrashIcon = L.icon({
            iconUrl: 'DESIGN/icons8-car-crash-100.png',
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -38]
        });

        const activeFireMarkers = [];
        const extinguishedFireMarkers = [];
        const fireStationMarkers = [];
        const carCrashMarkers = [];

        const fireIncidentsClusterGroup = L.markerClusterGroup();
        const carCrashesClusterGroup = L.markerClusterGroup();

        // Helper function to add a small random offset
        function getRandomOffset(coordinate) {
            const offsetRange = 0.0005; // Adjust this value to control the spread
            return coordinate + (Math.random() * offsetRange * 2) - offsetRange;
        }

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
            let popupStatusText;
            // Apply random offset to coordinates
            const lat = getRandomOffset(fire.lat);
            const lng = getRandomOffset(fire.lng);
            const marker = L.marker([lat, lng]);

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
            { lat: 42.4950, lng: 27.4729, description: "РДПБЗН - Бургас" },
            { lat: 43.0809, lng: 25.6292, description: "РДПБЗН - Велико Търново" },
            { lat: 43.4075, lng: 24.6225, description: "РДПБЗН - Плевен" },
            { lat: 42.4259, lng: 25.6318, description: "РДПБЗН - Стара Загора" },
            { lat: 43.8447, lng: 25.9680, description: "РДПБЗН - Русе" },
            { lat: 42.0207, lng: 23.0970, description: "РДПBЗН - Благоевград" },
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
            // Apply random offset to coordinates
            const lat = getRandomOffset(department.lat);
            const lng = getRandomOffset(department.lng);
            const marker = L.marker([lat, lng], { icon: fireDepartmentIcon })
                             .bindPopup(`<b>${department.description}</b>`);
            fireStationMarkers.push(marker);
        });

        const fireStationsLayerGroup = L.layerGroup(fireStationMarkers);
        firesMap.addLayer(fireStationsLayerGroup);

        const mockCarCrashes = [
            { lat: 42.4980, lng: 27.4700, description: "Лек инцидент - кръстовище ул. Индустриална, Бургас", time: "14:30" },
            { lat: 42.5150, lng: 27.4500, description: "Катастрофа - път за Слънчев бряг, Бургас", time: "16:00" },
            { lat: 42.4800, lng: 27.4000, description: "Пътно произшествие - ж.к. Меден Рудник, Бургас", time: "10:00" },
            { lat: 42.5080, lng: 27.4850, description: "Инцидент с камион - изход за Айтос, Бургас", time: "08:15" },
            { lat: 42.6970, lng: 23.3220, description: "Верижна катастрофа - бул. Витоша, София", time: "17:45" },
            { lat: 42.7050, lng: 23.2800, description: "Сблъсък - околовръстен път, София", time: "18:00" },
            { lat: 42.6500, lng: 23.3500, description: "ПТП - бул. Цариградско шосе, София", time: "15:20" },
            { lat: 42.1500, lng: 24.7500, description: "Катастрофа с пострадали - бул. Васил Априлов, Пловдив", time: "09:00" },
            { lat: 42.1300, lng: 24.7200, description: "Лек инцидент - Сточна гара, Пловдив", time: "11:00" },
            { lat: 43.2000, lng: 27.9100, description: "ПТП - център Варна", time: "13:10" },
            { lat: 43.2300, lng: 27.8500, description: "Сблъсък - кв. Владиславово, Варна", time: "16:40" },
            { lat: 43.0800, lng: 25.6200, description: "Инцидент - Велико Търново", time: "14:00" },
            { lat: 43.4000, lng: 24.6000, description: "Пътно произшествие - Плевен", time: "10:30" },
            { lat: 42.4200, lng: 25.6300, description: "Сблъсък - Стара Загора", time: "11:50" },
            { lat: 43.8500, lng: 25.9600, description: "Катастрофа - Русе", time: "09:55" }
        ];

        mockCarCrashes.forEach(crash => {
            // Apply random offset to coordinates
            const lat = getRandomOffset(crash.lat);
            const lng = getRandomOffset(crash.lng);
            const marker = L.marker([lat, lng], { icon: carCrashIcon })
                             .bindPopup(`<b>Пътно Произшествие:</b><br>${crash.description}<br>Време: ${crash.time}`);
            carCrashMarkers.push(marker);
        });

        carCrashesClusterGroup.addLayers(carCrashMarkers);

        const filterActiveFiresCheckbox = document.getElementById('filterActiveFires');
        const filterExtinguishedFiresCheckbox = document.getElementById('filterExtinguishedFires');
        const filterFireStationsCheckbox = document.getElementById('filterFireStations');
        const filterCarCrashesCheckbox = document.getElementById('filterCarCrashes');

        function updateFireIncidents() {
            fireIncidentsClusterGroup.clearLayers();

            if (filterActiveFiresCheckbox.checked) {
                fireIncidentsClusterGroup.addLayers(activeFireMarkers);
            }
            if (filterExtinguishedFiresCheckbox.checked) {
                fireIncidentsClusterGroup.addLayers(extinguishedFireMarkers);
            }
            
            if (filterActiveFiresCheckbox.checked || filterExtinguishedFiresCheckbox.checked) {
                if (!firesMap.hasLayer(fireIncidentsClusterGroup)) {
                    firesMap.addLayer(fireIncidentsClusterGroup);
                }
            } else {
                firesMap.removeLayer(fireIncidentsClusterGroup);
            }
        }

        function updateFireStations() {
            if (filterFireStationsCheckbox.checked) {
                firesMap.addLayer(fireStationsLayerGroup);
            } else {
                firesMap.removeLayer(fireStationsLayerGroup);
            }
        }

        function updateCarCrashes() {
            if (filterCarCrashesCheckbox.checked) {
                firesMap.addLayer(carCrashesClusterGroup);
            } else {
                firesMap.removeLayer(carCrashesClusterGroup);
            }
        }

        filterActiveFiresCheckbox.addEventListener('change', updateFireIncidents);
        filterExtinguishedFiresCheckbox.addEventListener('change', updateFireIncidents);
        filterFireStationsCheckbox.addEventListener('change', updateFireStations);
        filterCarCrashesCheckbox.addEventListener('change', updateCarCrashes);

        updateFireIncidents();
        updateFireStations();
        updateCarCrashes();
    }
});