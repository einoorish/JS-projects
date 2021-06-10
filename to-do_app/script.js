const form = document.getElementById("form");
const input = document.getElementById("input");
const todosList = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {addTodo(todo);});
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    var todoText;
    if (todo) todoText = todo.text;
    else todoText = input.value;

    const todoEl = document.createElement("li");
    todoEl.innerText = todoText;

    if (todo && todo.completed)
        todoEl.classList.add("completed");

    todoEl.addEventListener("click", () => {
        todoEl.classList.toggle("completed");
        saveChanges();
    });

    todoEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        todoEl.remove();
        saveChanges();
    });

    todosList.appendChild(todoEl);
    saveChanges();
    input.value = "";
}

function saveChanges() {
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
