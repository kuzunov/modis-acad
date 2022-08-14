import React, { FormEvent } from 'react'

type Props = {
    handleSubmitComment:(e:FormEvent<HTMLFormElement>)=>void,
    handleFilterChange: (s:number) => void,
}

function CommentInputs({handleFilterChange,handleSubmitComment}: Props) {
    const addCommentForm = () => {
        return (
          <div className = 'comment-form'>
          <form onSubmit={handleSubmitComment}>
            <label>Title</label>
            <input type="text" name="title" className = 'comment-field' />
            <label>Body</label>
            <input type="textarea" name="body" className = 'comment-field'/>
            <button className = 'hidden'>Submit changes</button>
            <input type="submit" value="Submit" name = "submit"/>
          </form>  
          </div>
          )
      }

      const addFilter = () => {
        return (
          <div className = 'filter-fields'>
            <label>Status:</label>
            <select name='status' onChange={(e) => handleFilterChange(Number.parseInt(e.target.value))}>
              <option value={2}>All</option>
              <option value={1}>Active</option>
              <option value={0}>Suspended</option>
            </select>
            {/* <label>Order:</label>
            <select name="order" onChange={handleFilterChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select> */}
          </div>
        );
      }

  return (<>
      <div className='comments-form-wrapper'>{addCommentForm()}</div>
      <div className='comments-filter-wrapper'>{addFilter()}</div>
      </>
  )
}

export default CommentInputs