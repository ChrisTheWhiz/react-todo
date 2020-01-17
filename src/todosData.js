const placeholderTodos = [
    {
        projectName: 'Programming',
        todos: [
            {
                content: 'Learn Hooks',
                isCompleted: true,
            },
            {
                content: 'Learn local storage',
                isCompleted: true,
            },
            {
                content: 'Create tests',
                isCompleted: true
            }
        ]
    },
    {
        projectName: 'Chores',
        todos: [
            {
                content: 'Clean Keyboard',
                isCompleted: true,
            },
            {
                content: 'Walk Dog',
                isCompleted: false,
            },
            {
                content: 'Do dishes',
                isCompleted: false,
            },
        ]
    },
    {
        projectName: 'Groceries',
        todos: [
            {
                content: '1kg Carrots',
                isCompleted: false,
            },
            {
                content: '2 Cauliflowers',
                isCompleted: false,
            },
            {
                content: '1kg Button Mushrooms',
                isCompleted: false,
            },
        ]
    }
];


export class TodosService {
    todos;

    constructor() {
        if (localStorage.getItem('todosData') === null) {
            this.todos = placeholderTodos;
        } else {
            this.todos = JSON.parse(localStorage.getItem('todosData'));
        }
    }

    getTodos() {
        return this.todos;
    }

    updateTodos(newTodos) {
        this.todos = newTodos;
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('todosData', JSON.stringify(this.todos));
    }

    clearLocalStorage() {
        localStorage.clear();
    }
}