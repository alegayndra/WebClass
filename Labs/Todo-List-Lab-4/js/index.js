console.log("index.js loading");

let buttons = {
    submitButton: {},
    clearButton: {},
    markAllButton: {},
    deleteButton: {}
}
let todo = document.getElementById("todoList");
let buttonsKeys = Object.keys(buttons);

// Post new todo
let sumbitButton = document.getElementById("submitButton");
sumbitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let text = document.getElementById("newTodo");
    let content = text.value;

    while (content[0] == "") {
        content = content.replace(" ", "");
    }

    if (content != "") {

        let divNode = document.createElement("DIV");
        let spanNode = document.createElement("SPAN");
        let inputNode = document.createElement("INPUT");
        let textNode = document.createTextNode(content);

        inputNode.setAttribute("type", "checkbox");
        inputNode.setAttribute("class", "checkBox");
        spanNode.setAttribute("class", "checkboxText");
        divNode.setAttribute("class", "todo");

        spanNode.appendChild(textNode);
        divNode.appendChild(inputNode);
        divNode.appendChild(spanNode);
        todo.appendChild(divNode);

        text.value = "";
    }
});

let clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", (event) => {
    let boxes = document.getElementsByClassName("checkBox");

    let boxesKeys = Object.keys(boxes);

    boxesKeys.forEach((item)=>{
        boxes[item].checked = false;
    })
});

let markAllButton = document.getElementById("markAllButton");
markAllButton.addEventListener("click", (event) => {
    let boxes = document.getElementsByClassName("checkBox");
    let boxesKeys = Object.keys(boxes);

    boxesKeys.forEach((item)=>{
        boxes[item].checked = true;
    })
});

let deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", (event) => {
    var todoList = document.getElementById("todoList"); 
    todoList.innerHTML = "";
});

/*
    References:
    - how to set attributes to elements: https://www.w3schools.com/jsref/dom_obj_checkbox.asp
    - how to remove elements: https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
    - how to remove text from a string: https://justcode.me/how-to/remove-text-from-string-in-javascript/
    - how to create elements: https://www.w3schools.com/jsref/met_document_createelement.asp
*/