export const usersObject = {
  'benante': 'Tommaso',
  'carlosbuitragosan': 'Carlos',
  'cazanelena': 'Elena',
  'DeepsDali': 'Deepa',
  'dylancobb': 'Dylan',
  'EunbyulNa': 'Eun',
  'generateGeorgina': 'Georgina',
  'GeorgeKlemperer': 'George',
  'isobelbutler': 'Isobel',
  'JamesESS': 'James',
  'matt-powelldev2784': 'Matt',
  'nichgalzin': 'Nich',
  'sgroi-l': 'Laurie',
  'ShaughnAnderson94': 'Shaughn',
  'tess-phillips': 'Tess',
  'yuqingwwang': 'Yuqing'
};

export function populateDropdown() {
  const dropdown = document.getElementById("userDropdown");
  for (const username in usersObject) {
    const option = document.createElement("option");
    option.value = username;
    option.textContent = usersObject[username];
    dropdown.appendChild(option);
  }
}
