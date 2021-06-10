const editBtn = document.querySelector(".edit");
const deleteBtn = document.querySelector(".delete");

const main = document.querySelector(".main");
const textArea = document.querySelector("textarea");

editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
});

textArea.addEventListener("input", (e) => {
  const { value } = e.target;

  main.innerHTML = marked(value);
});
