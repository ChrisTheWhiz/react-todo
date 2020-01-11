import React, {useState} from 'react';
import './App.scss';
import './Styles.scss';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


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
            // {
            //     projectName: 'Groceries',
            //     todos: [
            //         {
            //             content: '1kg Carrots',
            //             isCompleted: false,
            //         },
            //         {
            //             content: '2 Cauliflowers',
            //             isCompleted: false,
            //         },
            //         {
            //             content: '1kg Button Mushrooms',
            //             isCompleted: false,
            //         },
            //     ]
            // }
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
                    document.forms[0].elements[projectIndex + todoIndex + 3].focus();
                }, 0);
            } else {
                // change in a project name
                tempState[projectIndex].todos.splice(0, 0, {content: '', isCompleted: false});
                setTimeout(() => {
                    document.forms[0].elements[projectIndex + 1].focus();
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

    function onDragEnd(result) {
        const {destination, source} = result;
        const tempState = [...todos];
        setTrashVisibility(false);

        if (!destination) {
            return;
        } else if (destination.droppableId === 'trash') {
            tempState.splice(parseInt(source.index.toString()), 1);
            setTodos(tempState);
            return;
        }

        if (destination.index === source.index) return;

        tempState.splice(parseInt(source.index.toString()), 1);
        tempState.splice(destination.index, 0, todos[source.index]);

        setTodos(tempState);
    }

    function setTrashVisibility(mode) {
        const el = document.getElementById('trash');
        mode ? el.style.opacity = '1' : el.style.opacity = '0';
    }

    return (
        <div className="app">
            <div className="header">
                <h2>React Todo App</h2>
                <button>Clear Local Storage</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setTrashVisibility(true)}>
                <Droppable droppableId="trash">
                    {(provided, snapshot) => (
                        <div className={`trash ${snapshot.isDraggingOver ? 'active' : ''}`}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                             id="trash"
                        >TRASHCAN
                            <div style={{display: 'none'}}>{provided.placeholder}</div>
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="todo-list">
                    {(provided) => (
                        <form className="todo-list"
                              ref={provided.innerRef}
                              {...provided.droppableProps}>
                            {provided.placeholder}
                            {todos.map((project, projectIndex) => (
                                <Draggable
                                    key={projectIndex}
                                    draggableId={projectIndex.toString()}
                                    index={projectIndex}
                                >
                                    {(provided) => (
                                        <div className="todo-category"
                                             key={projectIndex}
                                             {...provided.draggableProps}
                                             ref={provided.innerRef}
                                        >
                                            <span className="drag-handle"
                                                  {...provided.dragHandleProps}
                                            >≡</span>
                                            <input
                                                className="category-header"
                                                type="text"
                                                value={project.projectName}
                                                onChange={e => handleInputChange(e, projectIndex)}
                                                onKeyDown={e => handleInputKeyDown(e, projectIndex)}
                                            />
                                            <ul>
                                                {project.todos.map((todo, todoIndex) => (
                                                    <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}
                                                         key={todoIndex}
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
                                                        {todo.showCloseButton ? <button type="button" className='close'
                                                                                        onClick={() => handleRemoveCommand(projectIndex, todoIndex)}
                                                        >x</button> : null}
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </form>)}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default App;
