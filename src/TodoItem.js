import React from 'react';

export default function TodoItem(props) {
    const {todo, projectIndex, todoIndex, setCloseButton, handleInputChange, handleInputKeyDown, toggleTodoCompleteAtIndex, handleRemoveCommand} = props;


    return <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}
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
            id={`${projectIndex}-${todoIndex}`}
            type="text"
            value={todo.content}
            onChange={e => handleInputChange(e, projectIndex, todoIndex)}
            onKeyDown={e => handleInputKeyDown(e, projectIndex, todoIndex)}
        />
        {todo.showCloseButton ? <button type="button" className='close'
                                        onClick={() => handleRemoveCommand(projectIndex, todoIndex)}
        >X</button> : null}
    </div>
}