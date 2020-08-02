function readJsonFromFile(file, func) {
  var reader = new FileReader();
  reader.onload = function (event) {
    // console.log(event.target.result);
    var json = JSON.parse(event.target.result);
    func(json);
  };
  reader.readAsText(file);
}

function handleGuildFile(files) {
  readJsonFromFile(files[0], function (json) {
    var roster = json[0].roster;
    var allyCodes = [];
    for (let member of roster) {
      allyCodes.push(member.allyCode);
    }
    console.log(allyCodes);
  });
}

function findToon(member, toonId) {
  for (let toon of member.roster) if (toon.defId == toonId) return toon;
}

function addToons(row, member, toonIds) {
  for (let toonId of toonIds) {
    var toon = findToon(member, toonId);
    if (toon)
      row.push(
        toon.rarity,
        toon.level,
        toon.gear,
        toon.relic.currentTier,
        toon.gp
      );
    else row.push(0, 0, 0, 0, 0);
  }
}

function handleMembersFile(files) {
  var jsTable = [];
  readJsonFromFile(files[0], function (members) {
    console.log(members);
    for (let member of members) {
      var row = [];
      row.push(member.name);
      // var toonIds = ["REYJEDITRAINING", "FINN", "C3POLEGENDARY", "R2D2_LEGENDARY", "BB8"];
      var toonIds = ['EMBO', 'BOBAFETT', 'BOSSK', 'GREEDO', 'CADBANE'];
      addToons(row, member, toonIds);
      jsTable.push(row);
    }
    console.log(jsTable);

    ///////////////////////////////////////////////////

    var table = document.createElement('table');
    for (let jsRow of jsTable) {
      let tr = table.insertRow(-1);
      for (let val of jsRow) {
        let cell = tr.insertCell(-1);
        cell.innerHTML = val;
      }
    }
    let resultDiv = document.getElementById('resultTable');
    resultDiv.appendChild(table);
  });
}

  var jsTable = [];
    console.log(x3m_members);
    for (let member of x3m_members) {
      var row = [];
      row.push(member.name);
      // var toonIds = ["REYJEDITRAINING", "FINN", "C3POLEGENDARY", "R2D2_LEGENDARY", "BB8"];
      var toonIds = ['EMBO', 'BOBAFETT', 'BOSSK', 'GREEDO', 'CADBANE'];
      addToons(row, member, toonIds);
      jsTable.push(row);
    }
    console.log(jsTable);

    ///////////////////////////////////////////////////

    var table = document.createElement('table');
    for (let jsRow of jsTable) {
      let tr = table.insertRow(-1);
      for (let val of jsRow) {
        let cell = tr.insertCell(-1);
        cell.innerHTML = val;
      }
    }
    let resultDiv = document.getElementById('resultTable');
    resultDiv.appendChild(table);
  });
