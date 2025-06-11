document.addEventListener('DOMContentLoaded', () => {

    let fireTeams = [
        { id: 1, name: "Екип Алфа", status: "free" },
        { id: 2, name: "Екип Браво", status: "on_mission" },
        { id: 3, name: "Екип Чарли", status: "accepting_signal" },
        { id: 4, name: "Екип Делта", status: "free" },
        { id: 5, name: "Екип Ехо", status: "on_mission" },
        { id: 6, name: "Екип Фокстрот", status: "accepting_signal" }
    ];

    const teamsListDiv = document.getElementById('teamsList');

    function getStatusDotClass(status) {
        if (status === "on_mission") {
            return "status-red";
        } else if (status === "accepting_signal") {
            return "status-orange";
        } else {
            return "status-green";
        }
    }

    function renderTeams() {
        teamsListDiv.innerHTML = '';

        fireTeams.forEach(team => {
            const teamBox = document.createElement('div');
            teamBox.classList.add('team-item');

            const teamNameText = document.createElement('span');
            teamNameText.classList.add('team-name');
            teamNameText.textContent = team.name;
            teamBox.appendChild(teamNameText);

            const dotElement = document.createElement('span');
            dotElement.classList.add('status-dot');
            dotElement.classList.add(getStatusDotClass(team.status));
            teamBox.appendChild(dotElement);

            const controlsDiv = document.createElement('div');
            controlsDiv.classList.add('team-controls');

            const freeButton = document.createElement('button');
            freeButton.textContent = 'ЗВ';
            freeButton.onclick = () => updateTeamStatus(team.id, 'free');
            controlsDiv.appendChild(freeButton);

            const signalButton = document.createElement('button');
            signalButton.textContent = 'СП';
            signalButton.onclick = () => updateTeamStatus(team.id, 'accepting_signal');
            controlsDiv.appendChild(signalButton);

            const missionButton = document.createElement('button');
            missionButton.textContent = 'НМ';
            missionButton.onclick = () => updateTeamStatus(team.id, 'on_mission');
            controlsDiv.appendChild(missionButton);

            teamBox.appendChild(controlsDiv);

            teamsListDiv.appendChild(teamBox);
        });
    }

    function updateTeamStatus(teamId, newStatus) {
        const teamToUpdate = fireTeams.find(team => team.id === teamId);

        if (teamToUpdate) {
            teamToUpdate.status = newStatus;
            renderTeams();
        }
    }

    renderTeams();
});