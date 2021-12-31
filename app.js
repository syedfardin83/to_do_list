//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EventListeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    console.log('Hello');


    //Adding li
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Adding to local storage
    saveLocalTodos(todoInput.value)

    //Check Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //Check Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //Clear todoInput Value
    todoInput.value = '';
}


function deleteCheck(e){
    console.log(e.target);
    const item = e.target;

    //Delete
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation to remove
        todo.classList.add('fall');
        
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    // const todo = item.parentElement;
    // console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                // todo.style.display = "flex";
                todo.style.display = 'flex';
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }


        }
    });
}

function saveLocalTodos(todo){
    //Check if local storage alredy has values
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}