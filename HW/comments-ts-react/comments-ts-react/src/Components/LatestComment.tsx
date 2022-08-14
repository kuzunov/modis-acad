import React from 'react'
import { CommentT } from '../model/CommentT'
import CommentsList from './CommentsList'

type Props = {comment: CommentT}

function LatestComment({comment}: Props) {
  return (
    <div className='comment-wrapper'>
      Latest Comment:
        <div className='title'> {comment.title} </div>
        <div className='body'>{comment.body}</div>
        <div className='dates'>
        C: {new Date(comment.created).toLocaleString('bg-BG')}; M: {new Date(comment.modified).toLocaleString('bg-BG')}
        </div>
    </div>
  )
}

export default LatestComment