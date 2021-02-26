'use strict';

class Todo{
    constructor(form, input, todoList, todoListCompleted){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoListCompleted = document.querySelector(todoListCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render(){
        // очистка списка дел
        this.todoList.textContent = '';
        this.todoListCompleted.textContent = '';

        //создание элемента списка
        // тк createItem передается как коллбэк, у него нет своего this, поэтому либо стрелочная функция, либо после него передать this
        this.todoData.forEach(this.createItem); 

        //добавление в localStorage
        this.addToStorage();
    }
    
    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoListCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

        this.input.value = '';
    }

    addTodo(e){
        e.preventDefault();

        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('Нельзя добавить пустое дело!');
        }
    }
    // генерация случайного значения ключа
    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target){
        // нахожу ключ элемента
        const itemKey = target.closest('.todo-item').key;

        // удаляю из коллекции по ключу
        this.todoData.delete(itemKey);

        this.render();
    }

    completeItem(target){
        // нахожу ключ элемента
        const itemKey = target.closest('.todo-item').key;
        // получаю элемент коллекции по ключу и меняю его свойство completed на противоположное
        this.todoData.get(itemKey).completed = !this.todoData.get(itemKey).completed;
        
        this.render();
    }

    // определяет на какую кнопку кликнули
    handler(){
        const container = document.querySelector('.todo-container');
        
        container.addEventListener('click', (e) => {
            let target = e.target;

            if(target.matches('.todo-remove')){
                this.deleteItem(target);
            } else if(target.matches('.todo-complete')){
                this.completeItem(target);
            }
        });
    }

    init(){
        // без bind в addTodo this является form
        this.form.addEventListener('submit', this.addTodo.bind(this)); 
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();