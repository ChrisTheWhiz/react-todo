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

    function handleInputChange(e, projectIndex, todoIndex) {
        const newState = [...todos];
        if (typeof todoIndex !== 'undefined') {
            // change in a todo
            newState[projectIndex].todos[todoIndex].content = e.target.value;
        } else {
            // change in a project name
            newState[projectIndex].projectName = e.target.value;
        }
        setTodos(newState);
    }

    function handleInputKeyDown(e, projectIndex, todoIndex) {
        if (e.key === 'Enter') {
            const tempState = [...todos];
            if (typeof todoIndex !== 'undefined') {
                // change in a todo
                tempState[projectIndex].todos.splice(todoIndex + 1, 0, {content: '', isCompleted: false});
                setTimeout(() => {
                    // document.forms[0].elements[i + 1].focus();
                    document.forms[0].elements[projectIndex+todoIndex+3].focus();
                }, 0);
            } else {
                // change in a project name
                tempState[projectIndex].todos.splice(0, 0, {content: '', isCompleted: false});
                setTimeout(() => {
                    document.forms[0].elements[projectIndex+1].focus();
                }, 0);
            }
            setTodos(tempState);
        }
    }

    function handleRemoveCommand(projectIndex, todoIndex) {
        const tempState = [...todos];
        tempState[projectIndex].todos.splice(todoIndex, 1);
        setTodos(tempState);
    }

    function toggleTodoCompleteAtIndex(projectIndex, todoIndex) {
        const temporaryTodos = [...todos];
        temporaryTodos[projectIndex].todos[todoIndex].isCompleted = !temporaryTodos[projectIndex].todos[todoIndex].isCompleted;
        setTodos(temporaryTodos);
    }

    function setCloseButton(mode, projectIndex, todoIndex) {
        const tempState = [...todos];
        tempState[projectIndex].todos[todoIndex].showCloseButton = mode;
        setTodos(tempState);
    }

    return (
        <div className="app">
            <div className="header">
                <h2>React Todo App</h2>
                <button>Clear Local Storage</button>
            </div>
            <form className="todo-list">
                {todos.map((project, projectIndex) => (
                    <div className="todo-category" key={projectIndex}>
                        <input className="category-header"
                               type="text"
                               value={project.projectName}
                               onChange={e => handleInputChange(e, projectIndex)}
                               onKeyDown={e => handleInputKeyDown(e, projectIndex)}
                        />
                        <ul>
                            {project.todos.map((todo, todoIndex) => (
                                <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`} key={todoIndex}
                                     onMouseEnter={() => setCloseButton(true, projectIndex, todoIndex)}
                                     onMouseLeave={() => setCloseButton(false, projectIndex, todoIndex)}
                                >
                                    {/* eslint-disable-next-line*/}
                                    <div className="checkbox"
                                         onClick={() => toggleTodoCompleteAtIndex(projectIndex, todoIndex)}>
                                        {todo.isCompleted && (
                                            <span>&#x2714;</span>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={todo.content}
                                        onChange={e => handleInputChange(e, projectIndex, todoIndex)}
                                        onKeyDown={e => handleInputKeyDown(e, projectIndex, todoIndex)}
                                    />
                                    {todo.showCloseButton? <button type="button" className='close'
                                                                   onClick={() => handleRemoveCommand(projectIndex, todoIndex)}
                                    >x</button>: null}
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
