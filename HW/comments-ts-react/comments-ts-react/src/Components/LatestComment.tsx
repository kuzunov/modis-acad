import React from 'react'
import { CommentT } from '../model/CommentT'

type Props = {comment: CommentT}

function LatestComment({comment}: Props) {
  return (
    (comment.id)?<div className='comment-wrapper'>
      Latest Comment:
        <div className='title'> {comment.title} </div>
        <div className='body'>{comment.body}</div>
        <div className='dates'>
        C: {new Date(comment.created).toLocaleString('bg-BG')}; M: {new Date(comment.modified).toLocaleString('bg-BG')}
        </div>
    </div>:<>No comments yet!</>
  )
}

export default LatestComment