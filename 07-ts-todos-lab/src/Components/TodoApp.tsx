import { Component } from 'react';
import './App.css';
import Todo, { TodoStatus } from './todo-model';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { TodosApi } from './rest-api-client';
import { Immutable, Optional } from './shared-types';
import TodoInput from './TodoInput';

export type FilterType = TodoStatus | undefined;

interface TodoAppState {
  todos:Todo[];
  filter: FilterType,
  errors: string|undefined;
  editedTodo: Optional<Todo>;
}

export default class TodoApp extends Component<{},TodoAppState> {
  state:Immutable<TodoAppState> = {
    todos: [],
    filter: undefined,
    errors: undefined,
    editedTodo: undefined,
  }

async componentDidMount(){
  try {
    const allTodos = await  TodosApi.findAll();
    this.setState({todos:allTodos, errors:undefined})
  }
  catch (err) {
    this.setState({errors:(err as any).toString()})
  }
}
handleTodoEdit = (todo:Todo) => {
  this.setState({editedTodo:todo})
}
handleTodoDelete = async (todo:Todo) => {
  try {
    await TodosApi.deleteById(todo.id);
    this.setState(({todos})=>({todos: todos.filter(td => td.id !== todo.id),errors:undefined}));
  }
  catch (err){
      this.setState({errors:(err as any).toString()})
  }
}
handleTodoSubmit = async (todo:Todo) => {
  try {
    if (todo.id) {
      const updated = await TodosApi.update(todo);
      this.setState(({todos})=>({todos: todos.map(td=>td.id===updated.id?updated:td), errors:undefined}));
    } else {
  const created = await (TodosApi.create(todo))
  this.setState (({todos}) => ({todos: todos.concat(created), errors: undefined}))
    }
}
  catch (err) {
    this.setState({errors:(err as any).toString()})

  }
}
handleFilterChange = (filter:FilterType) => {
this.setState({filter:filter});
};
  render(){
    return <div className="App">
    <header className="App-header">
      <h2>
        {this.state.errors && <div className='errors'>{this.state.errors}</div>}
        React TODOs Demo!
        <TodoInput key = {this.state.editedTodo?.id} todo = {this.state.editedTodo}onCreateTodo={this.handleTodoSubmit} onTodoEdit= {this.handleTodoEdit}/>
        <TodoFilter filter={this.state.filter} onFilterChange={this.handleFilterChange}/>
        <TodoList todos={this.state.todos} filter = {this.state.filter}
        onUpdateTodo = {this.handleTodoSubmit}
        onDeleteTodo = {this.handleTodoDelete}
        onCreateTodo = {this.handleTodoSubmit}
        onEditTodo = {this.handleTodoEdit}
        />
      </h2>
    </header>
  </div>
  };
}
