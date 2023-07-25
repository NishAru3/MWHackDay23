matchData = `{
    "matches": [
        
    ]
}`

players = new Map();

document.getElementById("addMatchBtn").addEventListener("click", addMatch);

function addMatch() {
  jsonData = JSON.parse(matchData);
  jsonData.matches.push({
    p1: document.getElementById("winner").value,
    p2: document.getElementById("loser").value,
    s1: document.getElementById("winner-score").value,
    s2: document.getElementById("loser-score").value,
  });
  matchData = JSON.stringify(jsonData);
  updateLeaderboard();
}

function updateLeaderboard() {
    jsonData = JSON.parse(matchData);
    jsonData.matches.forEach(myFunction);
    displayLeaderboard();
    players = new Map();
    console.log(data)
}

function myFunction(row) {
    winner = row.p1
    if (players.has(winner)) {
        wins = players.get(winner)[0]
        losses = players.get(winner)[1]
    }
    else {
        wins = 0
        losses = 0
    }
    players.set(winner, [wins + 1, losses, wins / (wins + losses)])

    loser = row.p2
    if (players.has(loser)) {
        wins = players.get(loser)[0]
        losses = players.get(loser)[1]
    }
    else {
        wins = 0
        losses = 0
    }
    players.set(loser, [wins, losses+1, wins / (wins + losses)])

    console.log(players)

}

function displayLeaderboard(){
    let table = '<table border="1">';
    table += `<h1>Leaderboard</h1>
    <thead><tr><th>Rank</th><th>Name</th><th>Wins</th><th>Losses</th><th>Win%</th></tr></thead><tbody>`;
    Array.from(players.keys()).forEach((player, index) => {
        table = table + `<tr>`;
        table = table + `<td>0</td>`;
        table = table + `<td>${player}</td>`;
        table = table + `<td>${players.get(player)[0]}</td>`;
        table = table + `<td>${players.get(player)[1]}</td>`;
        table = table + `<td>${players.get(player)[2]}</td>`;
        table += `</tr>`;
     });
     table += "</tbody></table>";
     document.getElementById("leaderboard").innerHTML = table;
 }
