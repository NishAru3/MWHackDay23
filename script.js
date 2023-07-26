
// Onload function
document.addEventListener("DOMContentLoaded", function() {
  console.log("website loaded")
  updateLeaderboard();
});


const matchModal = document.getElementById("matchModal");
const openMatchModalBtn = document.getElementById("openMatchModalBtn");
const closeMatchModalBtn = document.getElementsByClassName("close")[0];
const closeSearchModalBtn = document.getElementsByClassName("close")[1];

const searchModal = document.getElementById("searchModal");
const openSearchModalBtn = document.getElementById("openSearchModalBtn"); 



// Open the modal
openMatchModalBtn.addEventListener("click", function() {
  matchModal.style.display = "block";
});

openSearchModalBtn.addEventListener("click", function() {
  searchModal.style.display = "block";
  console.log(users);
  console.log(matches);
  fillSearchModal();
});

// Close the modal when the close button or outside modal area is clicked
closeMatchModalBtn.addEventListener("click", function() {
  matchModal.style.display = "none";
});
closeSearchModalBtn.addEventListener("click", function() {
  searchModal.style.display = "none";
});


window.addEventListener("click", function(event) {
  if (event.target === matchModal) {
    matchModal.style.display = "none";
  }
  if (event.target === searchModal) {
    searchModal.style.display = "none";
  } 
});

document.getElementById("addMatchBtn").addEventListener("click", addMatchButton);

function addMatchButton() {

  let p1 = document.getElementById("winner").value;
  let p2 = document.getElementById("loser").value;
  let s1 = document.getElementById("winner-score").value;
  let s2 = document.getElementById("loser-score").value;

  addMatch(p1,p2,s1,s2);

  updateLeaderboard();
  matchModal.style.display = "none";
}

function updateLeaderboard() {
  const userArr = getSortedPlayers();
  userArr.map((user,index) => {
    user["rank"] = index + 1
    user["winratio"] =  Math.round(( user["wins"]/user["played"] + Number.EPSILON) * 100) / 100
  });
  displayLeaderboard(userArr);
}

function displayLeaderboard(arr){
  table = ``;
  arr.forEach((player) => {
      table += `<tr>`;
      table += `<td>${player["rank"]}</td>`;
      table += `<td>${player["name"]}</td>`;
      table += `<td>${player["wins"]}</td>`;
      table += `<td>${player["played"]}</td>`;
      table += `<td>${player["winratio"]}</td>`;
      table += `</tr>`;
  });
  document.getElementById("leaderbody").innerHTML = table;
}


function fillSearchModal() {
  const name = (document.getElementById("textField").value);
  output = ``;
  if (!(name in users)) {
    output += `<h1>Bad Input</h1>`
    output += `<div class="padder">`
    output += `<h4>Please input a valid player name</h4>`
    output += `</div>`
  } else {
    const userArr = getSortedPlayers();
    var info = null;
    userArr.forEach((user,index) => {
      if (user["name"] == name) {
        info = user
        info["rank"] = index + 1
        info["winratio"] =  Math.round(( user["wins"]/user["played"] + Number.EPSILON) * 100) / 100
      }
    });
    output += `<h1>Rank ${info["rank"]+". "+name}</h1>`
    info["matches"].forEach((match,index) => {
      output += `<div class="padder">`
      if (matches[match]["winner"] == name) {
        output += `<h4><span class="win">WON: </span>`
      } else {
        output += `<h4><span class="loss">LOST: </span>`
      }
      output += `${matches[match]["winner"]}, ${matches[match]["wScore"]}-${matches[match]["lScore"]}</h4>`
      output += `</div>`
    });
  }

  document.getElementById("insideSearch").innerHTML = output;
}

// API CALLS


function makeID() {
  return crypto.randomUUID();
}

function getUsers() {
  console.log(users)
}

function getSortedPlayers() {
  let outputArr = []
  for (var key in users) {
    outputArr.push(users[key]);
  }
  outputArr.sort(function(a, b) {
    var x = a["wins"];
    var y = b["wins"];
    return ((x > y) ? -1 : 1);
  });
  return outputArr;
}

function addMatch(wName, lName, wScore,lScore){

  if (wName == lName || wName == "" || lName == "") {
    return;
  }

  winner = findUser(wName);
  loser = findUser(lName);

  matchID = makeID();

  matches[matchID] = {
    "winner": wName,
    "loser": lName,
    "wScore": wScore,
    "lScore": lScore
  }


  winner["wins"] += 1;
  winner["played"] += 1;
  winner["matches"].push(matchID);
  loser["played"] += 1;
  loser["matches"].push(matchID);
}

function findUser(name) {
  if (!(name in users)) {
    addUser(name);
  }
  return users[name];
}

function addUser(name){
  users[name] = {
    "name": name,
    "wins": 0,
    "played": 0,
    "dep": "EDG",
    "matches": []
  }
}

// DATABASE

// var users = {
// }

var users = {
  "Nishanth": {
      "name": "Nishanth",
      "wins": 3,
      "played": 3,
      "dep": "EDG",
      "matches": [
          "3c49e1da-e7d7-4354-882e-081fb3e94d8d",
          "8308bb35-5855-45ca-b823-05e0abf9d231",
          "3604629d-3ce5-4253-b0a9-64058dcfec88"
      ],
      "rank": 1,
      "winratio": 1
  },
  "Siddhant": {
      "name": "Siddhant",
      "wins": 2,
      "played": 4,
      "dep": "EDG",
      "matches": [
          "3c49e1da-e7d7-4354-882e-081fb3e94d8d",
          "8308bb35-5855-45ca-b823-05e0abf9d231",
          "3e69daf0-1879-4c30-ae00-1f935b2eddbc",
          "dc8ca29d-27d1-40ea-92f2-b92330e048a2"
      ],
      "rank": 2,
      "winratio": 0.5
  },
  "Satvik": {
      "name": "Satvik",
      "wins": 1,
      "played": 5,
      "dep": "EDG",
      "matches": [
          "3e69daf0-1879-4c30-ae00-1f935b2eddbc",
          "dc8ca29d-27d1-40ea-92f2-b92330e048a2",
          "3604629d-3ce5-4253-b0a9-64058dcfec88",
          "ce4af0f8-ce8a-49bc-9870-f98894b3f741",
          "843da9d0-7042-426e-bf32-d913aa5582d9"
      ],
      "rank": 3,
      "winratio": 0.2
  },
  "Chen": {
      "name": "Chen",
      "wins": 0,
      "played": 1,
      "dep": "EDG",
      "matches": [
          "ce4af0f8-ce8a-49bc-9870-f98894b3f741"
      ],
      "rank": 5,
      "winratio": 0
  },
  "Kunal": {
      "name": "Kunal",
      "wins": 1,
      "played": 1,
      "dep": "EDG",
      "matches": [
          "843da9d0-7042-426e-bf32-d913aa5582d9"
      ],
      "rank": 4,
      "winratio": 1
  }
}

// var matches = {}

var matches = {
  "3c49e1da-e7d7-4354-882e-081fb3e94d8d": {
      "winner": "Nishanth",
      "loser": "Siddhant",
      "wScore": "21",
      "lScore": "6"
  },
  "8308bb35-5855-45ca-b823-05e0abf9d231": {
      "winner": "Nishanth",
      "loser": "Siddhant",
      "wScore": "21",
      "lScore": "15"
  },
  "3e69daf0-1879-4c30-ae00-1f935b2eddbc": {
      "winner": "Siddhant",
      "loser": "Satvik",
      "wScore": "21",
      "lScore": "18"
  },
  "dc8ca29d-27d1-40ea-92f2-b92330e048a2": {
      "winner": "Siddhant",
      "loser": "Satvik",
      "wScore": "21",
      "lScore": "16"
  },
  "3604629d-3ce5-4253-b0a9-64058dcfec88": {
      "winner": "Nishanth",
      "loser": "Satvik",
      "wScore": "21",
      "lScore": "5"
  },
  "ce4af0f8-ce8a-49bc-9870-f98894b3f741": {
      "winner": "Satvik",
      "loser": "Chen",
      "wScore": "21",
      "lScore": "17"
  },
  "843da9d0-7042-426e-bf32-d913aa5582d9": {
      "winner": "Kunal",
      "loser": "Satvik",
      "wScore": "21",
      "lScore": "14"
  }
}