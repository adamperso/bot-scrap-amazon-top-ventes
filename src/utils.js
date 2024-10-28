
const fs = require('fs');

function saveToJson(data, filename = 'results.json') {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, jsonData);
  console.log(`Les résultats ont été sauvegardés dans ${filename}`);
}

function displayResults(data) {
  Object.entries(data).forEach(([key, values]) => {
    console.log(`\n${key}:`);
    values.forEach((value, index) => {
      console.log(`${index + 1}. ${value}`);
    });
  });
}

module.exports = {
  saveToJson,
  displayResults
};
