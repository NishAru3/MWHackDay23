const rankingsData = [
    { rank: 1, name: 'Random Name 1', points: 1000 },
    { rank: 2, name: 'Random Name 2', points: 950 },
    { rank: 3, name: 'Random Name 3', points: 890 },
  ];
  
  function renderRankingsTable() {
    const tableBody = document.querySelector("#rankings-table tbody");
    
    rankingsData.forEach((player) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${player.rank}</td>
        <td>${player.name}</td>
        <td>${player.points}</td>
      `;
      tableBody.appendChild(row);
    });
  }
    document.addEventListener("DOMContentLoaded", renderRankingsTable);
  