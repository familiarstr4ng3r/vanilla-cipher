
const keyInput = document.getElementById("key");
const passwordCheckbox = document.getElementById("password");
const input = document.getElementById("input");
const output = document.getElementById("output");

const encryptButton = document.getElementById("btn-encrypt");
const decryptButton = document.getElementById("btn-decrypt");
const dectyptPasswordsButton = document.getElementById("btn-decrypt-passwords");

const cipher = new Cipher();

// updateVisual();

encryptButton.addEventListener("click", () => {
  const { method, data } = cipher.encrypt(input.value);
  updateAlert(`Encrypted with ${method}`);
  output.value = Helper.getChunkedString(data, 32);

  // updateVisual();
});

decryptButton.addEventListener("click", () => {
  const encrypted = Helper.getSingleString(output.value);
  const { method, data } = cipher.decrypt(encrypted);
  updateAlert(`Decrypted with ${method}`);
  input.value = data;

  // updateVisual();
});

dectyptPasswordsButton.addEventListener("click", () => {
  const encrypted = Helper.getSingleString(output.value);
  const { data } = cipher.decrypt(encrypted);
  const parsed = JSON.parse(data);
  if (Array.isArray(parsed)) {
    const needed = ["name", "data", "createdAt", "updatedAt"];
    if (parsed.every(e => Object.keys(e).every(k => needed.includes(k)))) {
      initModal(parsed);
    }
    else {
      clearModal();
      alert("💩");
    }
  }
});

passwordCheckbox.addEventListener("change", () => {
  keyInput.type = passwordCheckbox.checked ? "text" : "password";
});

keyInput.addEventListener("input", () => {
  const key = keyInput.value.trim();
  cipher.update(key);
});

[input, output].forEach(element => {
  element.addEventListener("dragover", handleDragOver);
  element.addEventListener("drop", handleDrop);
});

document.querySelectorAll(".download-btn").forEach(element => {
  element.addEventListener("click", (e) => {
    const targetId = element.getAttribute("data-target");
    const target = document.querySelector(targetId);
    Helper.downloadTextAsFile(`${targetId}.txt`, target.value);
  });
});

// input.addEventListener("input", () => updateVisual());
// output.addEventListener("input", () => updateVisual());

// function updateVisual() {
//   validateButton(input.value, encryptButton);
//   validateButton(output.value, decryptButton);
// }

// function validateButton(text, button) {
//   button.disabled = text.trim().length == 0;
// }

function updateAlert(text) {
  const time = new Date().toLocaleTimeString();
  const a = document.getElementById("cipher-alert");
  if (a) a.textContent = `${time} - ${text}`;
}

// ! drag functions

function handleDrop(event) {
  event.preventDefault();

  const files = Array.from(event.dataTransfer.files);
  const file = files[0];

  Helper.readFileAsText(file).then(data => {
    event.target.value = data;
  });
}

function handleDragOver(event) {
  event.preventDefault(); // ? does nothing
  event.dataTransfer.dropEffect = "move";
}
