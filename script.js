const downloadButton = document.getElementById("download-completed");
const savePdfButton = document.getElementById("save-pdf");
const wordLimitedFields = [...document.querySelectorAll("[data-max-words]")];

function limitWords(value, maxWords) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return value;
  return words.slice(0, maxWords).join(" ");
}

function applyCurrentValuesToClone(clone) {
  const originalFields = [...document.querySelectorAll("input, textarea")];
  const clonedFields = [...clone.querySelectorAll("input, textarea")];

  originalFields.forEach((input, index) => {
    const clonedInput = clonedFields[index];
    if (!clonedInput) return;

    if (input.type === "checkbox") {
      if (input.checked) {
        clonedInput.setAttribute("checked", "checked");
      } else {
        clonedInput.removeAttribute("checked");
      }
      return;
    }

    if (input.tagName === "TEXTAREA") {
      clonedInput.textContent = input.value;
      return;
    }

    clonedInput.setAttribute("value", input.value);
  });
}

function buildCompletedDocument() {
  const clone = document.documentElement.cloneNode(true);
  applyCurrentValuesToClone(clone);

  clone.querySelectorAll("script").forEach((element) => element.remove());
  clone.querySelectorAll("input").forEach((input) => {
    input.setAttribute("disabled", "disabled");
  });
  clone.querySelectorAll("textarea").forEach((textarea) => {
    textarea.setAttribute("disabled", "disabled");
  });

  return `<!doctype html>\n${clone.outerHTML}`;
}

wordLimitedFields.forEach((field) => {
  field.addEventListener("input", () => {
    const maxWords = Number(field.dataset.maxWords || 20);
    const limitedValue = limitWords(field.value, maxWords);
    if (field.value !== limitedValue) {
      field.value = limitedValue;
    }
  });
});

downloadButton?.addEventListener("click", () => {
  const html = buildCompletedDocument();
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "alimentacion-posible-mis-respuestas.html";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

savePdfButton?.addEventListener("click", () => {
  window.print();
});
