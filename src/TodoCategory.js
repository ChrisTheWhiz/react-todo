import TodoItem from "./TodoItem";
import React from "react";

export default function TodoCategory(props) {
    const {projectIndex, provided, project, handleInputChange, handleInputKeyDown, setCloseButton, toggleTodoCompleteAtIndex, handleRemoveCommand} = props;

    return <div className="todo-category"
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
                <li key={todoIndex}>
                    <TodoItem
                        {...{
                            todo,
                            projectIndex,
                            todoIndex,
                            setCloseButton,
                            handleInputChange,
                            handleInputKeyDown,
                            toggleTodoCompleteAtIndex,
                            handleRemoveCommand
                        }}
                    />
                </li>
            ))}
        </ul>
    </div>
}