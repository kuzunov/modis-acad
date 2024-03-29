import React, { Children, Component, ReactElement} from 'react'
import { text } from 'stream/consumers';
import { StringLiteral } from 'typescript';
import { IdType, Optional, TodoListener } from './shared-types';
import Todo, { TodoStatus } from './todo-model';
import './TodoInput.css'

type State = {}

interface TodoInputProps {
  todo: Optional<Todo>;
onCreateTodo: TodoListener;
onTodoEdit: TodoListener
children:ReactElement[];
}
interface TodoInputState {
    id: string;
    text: string;
    status: TodoStatus;
    deadline: string;
}
type IdToLabelMap = {
  [Prop in keyof TodoInputState]?:ReactElement
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
  state: Readonly<TodoInputState> = {
    id: this.props.todo?.id?.toString() || '',
    text: this.props.todo?.text || '',
    status: this.props.todo?.status || TodoStatus.Active,
    deadline: this.props.todo?.deadline || '',
  }
  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const fieldName = e.target.name;
    this.setState({[fieldName]: e.target.value}as unknown as TodoInputState)
  }
  handleTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onCreateTodo(new Todo(
      this.state.text,
      this.state.deadline,
      this.state.status,
      this.state.id? parseInt(this.state.id):undefined));
    this.setState({text: '', deadline: this.state.deadline})
  }
  handleTodoReset = (e: React.FormEvent) => {
    e.preventDefault(); 
    this.setState({text: '',deadline:'',id:''})
   
  }
  

  render() {
    const children = Children.toArray(this.props.children)
    const idToLabelMap: IdToLabelMap = {};
    const labels = children.filter(child => {
      if (typeof child ==='object' && "type" in child){
        return child.type ==='label'
      }
    })
    labels.forEach( label => {
      const labelElem = label as ReactElement<{htmlFor:string}>
      idToLabelMap[labelElem.props.htmlFor as keyof TodoInputState] = labelElem;

    })

    
    return (
      <form className = "TodoInput-form" onSubmit={this.handleTodoSubmit}>
        {/* <label htmlFor='TodoInput-id'>ID</label> */}

        {idToLabelMap.id}
        <input type='text' id = 'text' name = 'text' defaultValue={this.state.id}
        disabled />
         {/* <label htmlFor='TodoInput-text'>What to do next?</label> */}
         {idToLabelMap.text}

        <input type='text' id = 'text' name = 'text' value={this.state.text}
        onChange={this.handleFieldChange}></input>
        {/* <label htmlFor='TodoInput-status'>Status:</label> */}
        {idToLabelMap.status}
<select value={this.state.status} onChange={this.handleFieldChange} name="status" className='TodoFilter'>
        <option value = {TodoStatus.Active}>Active</option>
        <option value = {TodoStatus.Completed}>Completed</option>
        <option value = {TodoStatus.Cancelled}>Cancelled</option>
    </select>
        {idToLabelMap.deadline}
        <input type='date' id = 'deadline' name = 'deadline' value={this.state.deadline}
        onChange={this.handleFieldChange}></input>
        <button type="submit" className='button button5'>Submit</button>
        <button type="button" className='button button3' onClick={this.handleTodoReset}>Reset</button>
      </form>
    )
  }
}

export default TodoInput