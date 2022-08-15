import React from 'react'
import { CommentT} from '../model/CommentT'
import Comment from './Comment'

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