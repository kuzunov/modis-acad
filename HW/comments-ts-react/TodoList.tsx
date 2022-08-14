import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React from 'react'
import { TodoListener } from './shared-types';
import Todo, { TodoStatus } from './todo-model'
import { FilterType } from './TodoApp'
import TodoItem from './TodoItem';
import './TodoList.css';

type TodoListProps = {
    todos: Todo[],
    filter: FilterType,
    onUpdateTodo: TodoListener,
    onDeleteTodo: TodoListener,
}

export default function TodoList({todos,filter,...rest}: TodoListProps) {
  return (
    <div className='TodoList'>
        {todos.filter(todo => !filter? true : todo.status === filter)
        .map((todo) => 
            <TodoItem key = {todo.id} todo={todo} {...rest}/>
            )
        }
      </div>
  )
}