const inputBox = document.getElementById("inputBox")
const addBtn = document.getElementById("addBox")
const toDoList = document.getElementById("todoList")

let editToDo = null
//function to add to do
const addToDo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("you must write some thing here to do")
        return false
    }
    if (addBtn.value === "Edit") {

        editLocalTodos(editToDo.target.previousElementSibling.innerHTML);
        editToDo.target.previousElementSibling.innerHTML = inputText
        addBtn.value = "Add"
        inputBox.value = ""
    } else {
        // creating p tag
        const li = document.createElement('li')
        const p = document.createElement('p')
        p.innerHTML = inputText
        li.appendChild(p)
        //creating edit btn
        const editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        editBtn.classList.add("btn", "editBtn")
        li.appendChild(editBtn)
        //creating delete Btn
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Remove"
        deleteBtn.classList.add("btn", "deleteBtn")
        li.appendChild(deleteBtn)
        toDoList.appendChild(li)
        inputBox.value = ''
        saveLocalTodo(inputText);
    }

}
//Function to update :(edit/delete) to do
const updateDisplay = (e) => {
    if (e.target.innerHTML === "Remove") {
        toDoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML
        inputBox.focus()
        addBtn.value = 'Edit'
        editToDo = e;
    }
}
//save to do on local storage
const saveLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("GM"))
    }

    todos.push(todo)
    localStorage.setItem("GM", JSON.stringify(todos))


}
//Get to do from local storage
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("GM"))
        todos.forEach(todo => {
            // creating p tag
            const li = document.createElement('li')
            const p = document.createElement('p')
            p.innerHTML = todo
            li.appendChild(p)
            //creating edit btn
            const editBtn = document.createElement("button")
            editBtn.innerText = "Edit"
            editBtn.classList.add("btn", "editBtn")
            li.appendChild(editBtn)
            //creating delete Btn
            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Remove"
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn)
            toDoList.appendChild(li)
        });
    }
}
// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("GM") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("GM"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    // Array functions : slice / splice
    todos.splice(todoIndex, 1);
    localStorage.setItem("GM", JSON.stringify(todos));
    console.log(todoIndex);

}
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("GM"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("GM", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getLocalTodos)
addBtn.addEventListener('click', addToDo)
toDoList.addEventListener('click', updateDisplay)