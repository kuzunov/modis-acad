import { Component } from 'react';
import { MOCK_TODOS } from './mock-todos';
import './App.css';
import Todo, { TodoStatus } from './todo-model';
import TodoList from './TodoList';

export type FilterType = TodoStatus | undefined;

interface TodoAppState {
  todos:Todo[];
  filter: FilterType;
}

export default class TodoApp extends Component<{},TodoAppState> {
  state:Readonly<TodoAppState> = {
    todos: MOCK_TODOS,
    filter: undefined
  }

  constructor(props: {}) {
    super(props);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
  }

handleTodoUpdate(todo:Todo):void {
  this.setState(({todos})=>({todos: todos.map(td=>td.id===todo.id?todo:td)}));
};
handleTodoDelete(todo:Todo){
  this.setState(({todos})=>({todos: todos.filter(td => td.id !==todo.id)}));
}
  render(){
    return <div className="App">
    <header className="App-header">
      <h2>
        React TODOs Demo!
        <TodoList todos={this.state.todos} filter = {this.state.filter}
        onUpdateTodo = {this.handleTodoUpdate}
        onDeleteTodo = {this.handleTodoDelete}
        />
      </h2>
    </header>
  </div>
  };
}
