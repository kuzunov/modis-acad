import React from 'react'
import { CommentT, Status } from '../model/CommentT';
import ReactMarkdown from 'react-markdown'

type CommentProps = {
   comment: CommentT,
   onStatusChange:(c:CommentT)=>void,
   handleDelete:(comment:CommentT) => void,
   handleEdit:(comment:CommentT) => void
}


const  Comment = ({comment,onStatusChange,handleDelete,handleEdit}:CommentProps) => {
    const changeStatus = () => {
        onStatusChange(comment);
    };
    const onDelete = () => {
        handleDelete(comment);
    }
    const onEdit = () => {
        handleEdit(comment);
    }
    return (
    <div className='comment-wrapper'>
        <div className='title'> <ReactMarkdown>{comment.title}</ReactMarkdown></div>
        <div className='body'><ReactMarkdown>{comment.body}</ReactMarkdown></div>
        <div className='dates'>
        C: {new Date(comment.created).toLocaleString('bg-BG')}; M: {new Date(comment.modified).toLocaleString('bg-BG')}
        </div>
        <div className = 'comment-status'>
            <input type="radio" name={`status-${comment.id}`} checked={comment.status===Status.ACTIVE?true:false} onChange={changeStatus}/>Active
            <input type="radio" name={`status-${comment.id}`} checked={comment.status===Status.SUSPENDED?true:false} onChange={changeStatus}/>Suspended
        </div>
        <div className = 'buttons'>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    </div>
  )
}

export default Comment;
