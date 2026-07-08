const downloadButton = document.getElementById("download-completed");

function applyCurrentValuesToClone(clone) {
  const originalInputs = [...document.querySelectorAll("input")];
  const clonedInputs = [...clone.querySelectorAll("input")];

  originalInputs.forEach((input, index) => {
    const clonedInput = clonedInputs[index];
    if (!clonedInput) return;

    if (input.type === "checkbox") {
      if (input.checked) {
        clonedInput.setAttribute("checked", "checked");
      } else {
        clonedInput.removeAttribute("checked");
      }
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

  return `<!doctype html>\n${clone.outerHTML}`;
}

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
