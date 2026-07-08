const savePdfButton = document.getElementById("save-pdf");
const wordLimitedFields = [...document.querySelectorAll("[data-max-words]")];

function limitWords(value, maxWords) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return value;
  return words.slice(0, maxWords).join(" ");
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

savePdfButton?.addEventListener("click", () => {
  window.print();
});
