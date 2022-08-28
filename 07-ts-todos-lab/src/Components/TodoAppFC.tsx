import { Component, useEffect, useState } from 'react';
import './App.css';
import Todo, { TodoStatus } from './todo-model';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TodosApi } from './rest-api-client';
import { Immutable, Optional } from './shared-types';
import TodoInput from './TodoInput';

export type FilterType = TodoStatus | undefined;

// interface TodoAppState {
//   todos:Todo[];
//   filter: FilterType,
//   errors: string|undefined;
//   editedTodo: Optional<Todo>;
// }

const TodoAppFC = () =>  {
  // state:Immutable<TodoAppState> = {
  //   todos: [],
  //   filter: undefined,
  //   errors: undefined,
  //   editedTodo: undefined,
  // }
const [todos, setTodos] = useState<Todo[]>([]);
const [filter, setFilter] = useState<FilterType>(undefined);
const [errors, setErrors] = useState<Optional<string>>(undefined);
const [editedTodo, setEditedTodo] = useState<Optional<Todo>>(undefined);
useEffect(() => {
  (async () => {try {
    const allTodos = await  TodosApi.findAll();
    setTodos(allTodos);
    setErrors(undefined)
  }
  catch (err) {
    setErrors((err as any).toString())
  }})()
  
},[])

const handleTodoEdit = (todo:Todo) => {
  setEditedTodo(todo)
}
const handleTodoDelete = async (todo:Todo) => {
  try {
    await TodosApi.deleteById(todo.id);
    setTodos(todos.filter(td => td.id !== todo.id));
    setErrors(undefined)
  }
  catch (err){
    setErrors((err as any).toString())
  }
}
const handleTodoSubmit = async (todo:Todo) => {
  try {
    if (todo.id) {
      const updated = await TodosApi.update(todo);
      setTodos(todos.map(td=>td.id===updated.id?updated:td));
      setErrors(undefined)

    } else {
  const created = await (TodosApi.create(todo))
  setTodos(todos.concat(created));
  setErrors(undefined)
    }
}
  catch (err) {
    setErrors((err as any).toString())

  }
}
const handleFilterChange = (filter:FilterType) => {
setFilter(filter);
};
    return <div className="App">
    <header className="App-header">
      <h2>
        {errors && <div className='errors'>{errors}</div>}
        React TODOs Demo!
        <TodoInput key = {editedTodo?.id} todo = {editedTodo}onCreateTodo={handleTodoSubmit} onTodoEdit= {handleTodoEdit}>
          <label htmlFor='id'>Todo ID</label>
          <label htmlFor='status'>Todo Status</label>
          <label htmlFor='deadline'>Todo Deadline</label>
          <label htmlFor='text'>Todo Text</label>
        </TodoInput>
        <TodoFilter filter={filter} onFilterChange={handleFilterChange}/>
        <TodoList todos={todos} filter = {filter}
        onUpdateTodo = {handleTodoSubmit}
        onDeleteTodo = {handleTodoDelete}
        onCreateTodo = {handleTodoSubmit}
        onEditTodo = {handleTodoEdit}
        />
      </h2>
    </header>
  </div>
};
export default TodoAppFC;
