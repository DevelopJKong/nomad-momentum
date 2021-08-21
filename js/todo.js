//localStorage는 배열은 넣을수 없습니다 오로지 텍스트만 넣을수있습니다

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

const TODOS_KEY = "todos";

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }


function deleteToDo(event){
const li = event.target.parentElement;
li.remove();
toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
saveToDos();
}


function paintToDo(newToDo){
     const li = document.createElement("li");
     li.id = newToDo.id;
     const span = document.createElement("span");
     const button = document.createElement("button");
     button.innerText = "📌"
     button.addEventListener("click",deleteToDo);
     
     li.appendChild(span);
     li.appendChild(button);

     span.innerText = newToDo.text;
     toDoList.appendChild(li);
    
}




function handleToDoSumbit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newToDoObj = {
        text:newToDo,
        id:Date.now()

    };
    toDoInput.value ="";
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSumbit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
