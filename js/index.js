'use strict';

document.getElementById("add").addEventListener('click',function() {
	var value = document.getElementById("item").value;
	if(value) {
		addItem(value);
		document.getElementById('item').value ="";
	} 
});

/*
function removeItem(e){
	console.log(e.target); // 点击i输出<i></i> 点击button.remove 输出Button 
}
*/

function removeItem() {
	var item = this.parentNode.parentNode;//li
	var parent = item.parentNode;//ul
	parent.removeChild(item);
	console.log("ss");
}

function compltete() {
	var item = this.parentNode.parentNode; //li
	var parent = item.parentNode; //ul.todo/ul.completed
	var id = parent.id;

	var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item,target.childNodes[0]);
}

function addItem(text){
	var list = document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var iconDelete = document.createElement('i');
	iconDelete.classList.add('icon','iconfont','icon-delete');
	
	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.appendChild(iconDelete);

	remove.addEventListener('click',removeItem);

	var iconSelect = document.createElement('i');
	iconSelect.classList.add('icon','iconfont','icon-selected');

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.appendChild(iconSelect);

	complete.addEventListener('click',compltete);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);

	list.insertBefore(item,list.childNodes[0]);
}