var taskInput=document.querySelector(".new-task__text");
var addButton=document.querySelector(".button--add");
var incompleteTaskHolder=document.querySelector(".incomplete-tasks");
var completedTasksHolder=document.querySelector(".completed-tasks");


/** New task list item */
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");

    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

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
var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}


/** Edit an existing task. */
var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".button--edit");
    var containsClass=listItem.classList.contains("list-item--editmode");
    //If class of the parent is .editmode
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
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}


/** Mark task completed */
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    let label=listItem.querySelector("label");
    label.classList.toggle("label--completed-task");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


/** Mark task as incomplete.*/
var taskIncomplete=function(){
    console.log("Incomplete Task...");
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    let label=listItem.querySelector("label");
    label.classList.toggle("label--completed-task");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}







//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".button--edit");
    var deleteButton=taskListItem.querySelector(".button--delete");


    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




