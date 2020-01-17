import React, {useState} from 'react';
import './App.scss';
import './Styles.scss';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {placeholderTodos} from "./todos.service";
import TodoCategory from "./TodoCategory";


function App() {

    const [todos, setTodos] = useState(placeholderTodos);

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
                            <ul>
                                {todos.map((project, projectIndex) => (
                                    <li key={projectIndex}>
                                        <Draggable
                                            draggableId={projectIndex.toString()}
                                            index={projectIndex}
                                        >
                                            {(provided) => (
                                                <TodoCategory {...{
                                                    projectIndex,
                                                    provided,
                                                    project,
                                                    handleInputChange,
                                                    handleInputKeyDown,
                                                    setCloseButton,
                                                    toggleTodoCompleteAtIndex,
                                                    handleRemoveCommand
                                                }}/>
                                            )}
                                        </Draggable>
                                    </li>
                                ))}
                            </ul>
                        </form>)}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default App;
