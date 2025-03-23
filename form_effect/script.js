const labels = document.querySelectorAll(".form label");

labels.forEach((label) => {
  console.log(label.innerHTML);
  let letters = label.innerHTML.split("");
  console.log(letters);
  let newInnerHTML = letters
    .map((letter, index) => {
      const element = `<span style="transition-delay:${50 * (index + 1)}ms;">${letter}</span>`;
      console.log(element);
      return element;
    })
    .join("");
  console.log(newInnerHTML);
});
