const mainParent = document.querySelector("#accordionExample");

const testEntries = [
  {
    url: "https://google.com",
    name: "demo",
    data: ["q", "w", "e"]
  },
  {
    name: "demo1",
    data: ["4", "5", "6"]
  }
]

initModal(testEntries);

function initModal(entries) {
  mainParent.innerHTML = entries.map(createEntry).join("");
}

function clearModal() {
  mainParent.innerHTML = "";
}

function copy2clipboard(value) {
  navigator.clipboard.writeText(value)
    .then(() => console.log("copied!"))
    .catch(error => console.warn(error));
}

function createEntry(entry, index) {
  const collapse = `collapse-${index}`;
  return `
  <div class="card">
    <div class="card-header">
      <button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#${collapse}" aria-expanded="false" aria-controls="${collapse}">
        ${entry.url ? 
          `<a href="${entry.url}" target="_blank">${entry.name}</a>`
          : `<span>${entry.name}</span>`}
      </button>
    </div>

    <div id="${collapse}" class="collapse" data-parent="#accordionExample">
      <div class="card-body">
        ${entry.data.map(createPasswordEntry).join("")}
      </div>
    </div>
  </div>
  `
}

function createPasswordEntry(value) {
  return `
  <div class="input-group input-group-sm my-1">
    <div class="input-group-prepend">
      <button 
        class="btn btn-primary"
        type="button"
        id="button-addon1"
        onclick="copy2clipboard('${value}')"
      >Copy</button>
    </div>
    <input
      type="text"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      value="${value}" readonly
    >
  </div>
  `
}