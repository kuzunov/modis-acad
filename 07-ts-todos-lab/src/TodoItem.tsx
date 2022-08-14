import React from "react";
import { TodoListener } from "./shared-types";
import Todo, { TodoStatus } from "./todo-model";
import "./TodoItem.css";

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: TodoListener;
  onDeleteTodo: TodoListener;
}

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo}: TodoItemProps) => {
  function handleCompletion(e:React.MouseEvent) {
    onUpdateTodo({...todo, status:TodoStatus.Completed});
  }
  function handleDelete(e:React.MouseEvent) {
    onDeleteTodo(todo);
  }
  return (
    <div className="TodoItem">
      <span className="TodoItem-text">
        <span className="TodoItem-id">{todo.id}</span>
        {todo.text}
        <span className="TodoItem-right">
          <span className="TodoItem-status">{TodoStatus[todo.status]}</span>
          {todo.status ===TodoStatus.Active? 
          <span className="TodoItem-button" onClick={handleCompletion}>Complete</span>
          
          :<span className="TodoItem-button" onClick={handleDelete}>Delete</span>  
        }
          </span>
      </span>
    </div>
  );
};
export default TodoItem;
