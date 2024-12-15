const TASK_INPUT=document.querySelector(".new-task__text");
const ADD_BUTTON=document.querySelector(".button--add");
const INCOMPLETE_TASKS_HOLDER=document.querySelector(".incomplete-tasks");
const COMPLETED_TASKS_HOLDER=document.querySelector(".completed-tasks");


/** New task list item */
function createNewTaskElement(taskString){

    let listItem=document.createElement("li");

    let checkBox=document.createElement("input");
    let label=document.createElement("label");
    let editInput=document.createElement("input");
    let editButton=document.createElement("button");

    let deleteButton=document.createElement("button");
    let deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className='label task';

    checkBox.type="checkbox";
    checkBox.className="input checkbox";
    editInput.type="text";
    editInput.className="input-text task";

    editButton.innerText="Edit";
    editButton.className="button button--edit";

    deleteButton.className="button button--delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className='delete-icon';
    deleteButtonImg.alt="delete icon";
    deleteButton.appendChild(deleteButtonImg);

    listItem.className="list-item";
    listItem.append(...[checkBox, label, editInput, editButton, deleteButton]);
    return listItem;
}



/** Create a new list item with the text from the #new-task: */
function addTask(){
    console.log("Add Task...");
    if (!TASK_INPUT.value) return;
    let listItem=createNewTaskElement(TASK_INPUT.value);

    //Append listItem to incompleteTaskHolder
    INCOMPLETE_TASKS_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    TASK_INPUT.value="";
}


/** Edit an existing task. */
function editTask(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem=this.parentNode;

    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".button--edit");
    let containsClass=listItem.classList.contains("list-item--editmode");
    //If class of the parent is editmode
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode
    label.classList.toggle("label--editmode");
    editInput.classList.toggle("input-text--editmode");
    listItem.classList.toggle("list-item--editmode");
};


/** Delete task. */
function deleteTask(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    ul.removeChild(listItem);

}


/** Mark task completed */
function taskCompleted(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    let listItem=this.parentNode;
    let label=listItem.querySelector("label");
    label.classList.toggle("label--completed-task");
    COMPLETED_TASKS_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


/** Mark task as incomplete.*/
function taskIncomplete(){
    console.log("Incomplete Task...");
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    let listItem=this.parentNode;
    let label=listItem.querySelector("label");
    label.classList.toggle("label--completed-task");
    INCOMPLETE_TASKS_HOLDER.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}







//Set the click handler to the addTask function.
ADD_BUTTON.addEventListener("click",addTask);


function bindTaskEvents(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector(".button--edit");
    let deleteButton=taskListItem.querySelector(".button--delete");


    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (let i=0; i<INCOMPLETE_TASKS_HOLDER.children.length;i++){
    bindTaskEvents(INCOMPLETE_TASKS_HOLDER.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<COMPLETED_TASKS_HOLDER.children.length;i++){
    bindTaskEvents(COMPLETED_TASKS_HOLDER.children[i],taskIncomplete);
}




