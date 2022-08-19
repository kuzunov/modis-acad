import React from 'react'
import { FilterChangeListener } from './shared-types';
import { TodoStatus } from './todo-model';
import { FilterType } from './TodoApp'

type TodoFilterProps = {
    filter: FilterType;
    onFilterChange: FilterChangeListener;
}

function TodoFilter({filter,onFilterChange}: TodoFilterProps) {
    const handleFilterChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value === "0"? undefined:parseInt(e.target.value));
    }
  return (
    <select value={filter} onChange={handleFilterChange} className='TodoFilter'>
        <option value="0">All</option>
        <option value = {TodoStatus.Active}>Active</option>
        <option value = {TodoStatus.Completed}>Completed</option>
        <option value = {TodoStatus.Cancelled}>Cancelled</option>
    </select>
  )
}

export default TodoFilter
