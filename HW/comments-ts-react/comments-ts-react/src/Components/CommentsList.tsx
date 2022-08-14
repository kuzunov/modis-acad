import React, { ChangeEvent, FormEvent } from 'react'
import { CommentT, Status } from '../model/CommentT'
import { Filter } from '../model/Filter'
import Comment from './Comment'
import CommentInputs from './CommentInputs'

type CommentsListProps = {
    comments: CommentT[],
    onStatusChange:(comment:CommentT)=>void
    handleDelete:(comment:CommentT) => void,
    handleEdit:(comment:CommentT) => void,
}

const CommentsList = ({comments,...rest}:CommentsListProps) => {
      
  return (
    <div className='comments-wrapper'>
      <div className='comments-list'>  
      {
      (comments.length>0)?comments.map(comment => {
            
            return <Comment key = {comment.id} comment = {comment} {...rest}/>

        }
      ):<div>Nothing yet</div>}
      </div>
    </div>
  )
}

export default CommentsList