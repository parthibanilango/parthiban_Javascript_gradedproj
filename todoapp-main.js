const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-todo-btn");
const saveTaskButton = document.getElementById("edit-todo-btn");
const listBox = document.getElementById("showlist");
const saveInd = document.getElementById("saveIndex");

let todoMap = new Map();

window.onload=start

function start(){
  initiateTodoCounter();
  displayTodoList();
};

function initiateTodoCounter(){
  if(localStorage.getItem("todoCounter") === null){
    localStorage.setItem("todoCounter",0);
  }  
};

function displayTodoList() {

  let todo = localStorage.getItem("todoMap");
  
  if (todo === null) {
    todoMap = new Map();
  } else {
    todoMap = new Map(JSON.parse(todo));
  }
    
  let htmlCode = "";
  
  todoMap.forEach((todoTask, index) =>  {
    htmlCode += 
    `<div class='list-item'>
      <p class='list-item-p'>${todoTask}</p>
      <button onclick='edit(${index})' class='btn2 bg-green'>Edit</button>
      <button onclick='deleteTodo(${index})' class='btn2 bg-red'>Delete</button>
    </div>`;
  });

  listBox.innerHTML = htmlCode;
};

function deleteTodo(ind) {
  let todo = localStorage.getItem("todoMap");
  
  todoMap = new Map(JSON.parse(todo));
  todoMap.delete(ind+""); 
  
  localStorage.setItem("todoMap", JSON.stringify( Array.from(todoMap)));
  
  displayTodoList();
};

function edit(ind) {
  let tempIndex =ind+"";
  saveInd.value = tempIndex;
  
  let todo = localStorage.getItem("todoMap");
  todoMap = new Map(JSON.parse(todo));
 
  text.value = todoMap.get(tempIndex);
  
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
};


addTaskButton.onclick=(e) => {  
  let todo = localStorage.getItem("todoMap");
  
  if (todo === null) {
    todoMap = new Map();
  } else {
    todoMap = new Map(JSON.parse(todo));
  }

  let tempKey = parseInt(localStorage.getItem("todoCounter"))+1;
  localStorage.setItem("todoCounter",tempKey);
  let todomapkey = tempKey+"";
  
  if(text.value !== ""){
    todoMap.set(todomapkey,text.value);
    text.value = "";
    localStorage.setItem("todoMap", JSON.stringify( Array.from(todoMap)));
    displayTodoList();
  }else {
    alert("please enter task name to add")
  }
};

saveTaskButton.onclick=() => {
  let todo = localStorage.getItem("todoMap");
  todoMap = new Map(JSON.parse(todo));
  
  let id = saveInd.value;
  todoMap.set(id, text.value);
  
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  text.value = "";
  localStorage.setItem("todoMap", JSON.stringify( Array.from(todoMap)));
  displayTodoList();
};
