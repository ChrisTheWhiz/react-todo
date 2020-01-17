import React, {useState} from 'react';
import {TodosService} from "./todosData";
import './App.scss';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import TodoCategory from "./TodoCategory";

const todoRepo = new TodosService();

function App() {

    const [todos, setState] = useState(() => todoRepo.getTodos());

    /// helper function
    function setTodos(newState) {
        todoRepo.updateTodos(newState);
        setState(newState);
    }

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
                    document.getElementById(`${projectIndex}-${todoIndex + 1}`).focus()
                }, 0);
            } else {
                // change in a project name
                tempState[projectIndex].todos.splice(0, 0, {content: '', isCompleted: false});
                setTimeout(() => {
                    // document.forms[0].elements[projectIndex + 1].focus();
                    document.getElementById(`${projectIndex}-0`).focus()
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
        // const tempState = [...todos];
        // tempState[projectIndex].todos[todoIndex].showCloseButton = mode;
        // setTodos(tempState);
        const closeButton = document.getElementById(`${projectIndex}-${todoIndex}`).nextSibling;
        closeButton.style.display = mode ? 'block' : 'none';
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

    function createNewProject() {
        const newState = [...todos];
        newState.splice(0, 0, {
                projectName: '',
                todos: [
                    {
                        content: '',
                        isCompleted: false,
                    }
                ]
            }
        );
        setTodos(newState);
    }

    function removeCompletedTodos() {
        const newState = [...todos];

        todos.forEach((project) => {
            project.todos = project.todos.filter((todo) => {
                return !todo.isCompleted;
            })
        });

        setTodos(newState);
    }

    function appReset() {
        todoRepo.clearLocalStorage();
        window.location.reload();
    }

    return (
        <div className="app">
            <div className="header">
                <h2>React Todo App</h2>
                <div className="buttons">
                    <button onClick={() => removeCompletedTodos()}>Remove Completed</button>
                    <button onClick={() => createNewProject()}>Add new project</button>
                    <button onClick={() => appReset()}>Clear Local Storage</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setTrashVisibility(true)}>
                <Droppable droppableId="trash">
                    {(provided, snapshot) => (
                        <div className={`trash ${snapshot.isDraggingOver ? 'active' : ''}`}
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                             id="trash"
                        >DELETE
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
