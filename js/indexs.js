'use strict';

var data = (localStorage.getItem('todolist')) ? (JSON.parse(localStorage.getItem('todolist'))) : {
    todo:[],
    completed:[]
};

renderTodoList();



document.getElementById("add").addEventListener('click',function(){
    var txt = document.getElementById('item').value;
    if(txt){
       addItem(txt);
    }
});

document.getElementById('item').addEventListener('keydown',function(e){
    var value = this.value;
    if(e.code == 'Enter' && value){
        addItem(value);
    }
});

function addItem(value){
    data.todo.push(value);
    addItemToDOM(value);
    document.getElementById('item').value = '';
    dataObjectUpdated();
}




function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(var i = 0;i < data.todo.length; i++){
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for(var j = 0; j < data.completed.length; j++){
        var value = data.completed[i];
        addItemToDOM(value,true);
    }
}

function dataObjectUpdated(){
   
    localStorage.setItem("todolist",JSON.stringify(data));
}

function removeItem(e){
    // console.log(e.target);
    //点击i <i class="icon iconfont icon-delete"></i> 
  // 点击button <button class="remove"><i class="icon iconfont icon-delete"></i></button>
    // 所以换成了this
    // console.log(this);
    var item = this.parentNode.parentNode;//li
	var parent = item.parentNode;//ul
    parent.removeChild(item);
    
    var id = parent.id;
    var text = item.innerText;

    if(id == 'todo'){
        data.todo.splice(data.todo.indexOf(text),1);
    }else {
        data.completed.splice(data.completed.indexOf(text),1);
    }

  
    dataObjectUpdated();

}

function completeItem(){
    var item = this.parentNode.parentNode;//li
    var parent = item.parentNode;//ul
    var id = parent.id;
    var text = item.innerText;

    if(id == 'todo'){
        data.todo.splice(data.todo.indexOf(text),1);
        data.completed.push(text);
    }else {
        data.completed.splice(data.completed.indexOf(text),1);
        data.todo.push(text);
    }


    dataObjectUpdated();

    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item,target.childNodes[0]);
}

function addItemToDOM(text,completed) {
    var listTodo = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var removeIcon = document.createElement('i');
    removeIcon.classList.add('icon','iconfont','icon-delete');
    var selectIcon = document.createElement('i');
    selectIcon.classList.add('icon','iconfont','icon-selected');
   
    var liItem = document.createElement('li');
    liItem.innerText = text;

    var divItem = document.createElement('div');
    divItem.classList.add('buttons');

    var removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.appendChild(removeIcon);

    removeButton.addEventListener('click',removeItem);

    var selectButtom = document.createElement('button');
    selectButtom.classList.add('complete');
    selectButtom.appendChild(selectIcon);

    selectButtom.addEventListener('click',completeItem);

    divItem.appendChild(removeButton);
    divItem.appendChild(selectButtom);

    liItem.appendChild(divItem);


    listTodo.insertBefore(liItem,listTodo.childNodes[0]);
}