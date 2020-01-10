import React, {useState} from 'react';
import './App.scss';
import './Styles.scss';

function App() {

    const [todos, setTodos] = useState([
        {
            projectName: 'Programming',
            todos: [
                {
                    content: 'Learn Hooks',
                    isCompleted: true,
                },
                {
                    content: 'Style the app',
                    isCompleted: true,
                },
                {
                    content: 'Migrate to TypeScript',
                    isCompleted: false,
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
    ]);

    function handleKeyDown(e, i) {
        if (e.key === 'Enter') {
            createTodoAtIndex(e, i);
        }
        if (e.key === 'Backspace' && todos[i].content === '') {
            e.preventDefault();
            return removeTodoAtIndex(i);
        }
    }

    function removeTodoAtIndex(i) {
        if (i === 0 && todos.length === 1) return;
        setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
        setTimeout(() => {
            if (i) document.forms[0].elements[i - 1].focus();
        }, 0);
    }

    function createTodoAtIndex(e, i) {
        const newTodos = [...todos];
        newTodos.splice(i + 1, 0, {
            content: '',
            isCompleted: false,
        });
        setTodos(newTodos);
        setTimeout(() => {
            document.forms[0].elements[i + 1].focus();
        }, 0);
    }

    function updateTodoAtIndex(e, i) {
        const newTodos = [...todos];
        newTodos[i].content = e.target.value;
        setTodos(newTodos);
    }

    function toggleTodoCompleteAtIndex(index) {
        const temporaryTodos = [...todos];
        temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
        setTodos(temporaryTodos);
    }

    return (
        <div className="app">
            <div className="header">
                <h2>React Todo App</h2>
                <button>Clear Local Storage</button>
            </div>
            <form className="todo-list">
                {todos.map((project) => (
                    <div className="todo-category" key={project.projectName}>
                        <input className="category-header"
                               type="text"
                               value={project.projectName}
                        />
                        <ul>
                            {project.todos.map((todo, i) => (
                                <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`} key={i}>
                                    {/* eslint-disable-next-line*/}
                                    <div className="checkbox" onClick={() => toggleTodoCompleteAtIndex(i)}>
                                        {todo.isCompleted && (
                                            <span>&#x2714;</span>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={todo.content}
                                        onKeyDown={e => handleKeyDown(e, i)}
                                        onChange={e => updateTodoAtIndex(e, i)}
                                    />
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default App;
