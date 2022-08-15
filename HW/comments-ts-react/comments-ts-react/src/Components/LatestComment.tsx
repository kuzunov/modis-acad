import React from 'react'
import { CommentT } from '../model/CommentT'
import ReactMarkdown from 'react-markdown'

type Props = {comment: CommentT}

function LatestComment({comment}: Props) {
  return (
    (comment.id)?<div className='comment-wrapper'>
      Latest Comment:
        <div className='title'> <ReactMarkdown>{comment.title}</ReactMarkdown></div>
        <div className='body'><ReactMarkdown>{comment.body}</ReactMarkdown></div>
        <div className='dates'>
        C: {new Date(comment.created).toLocaleString('bg-BG')}; M: {new Date(comment.modified).toLocaleString('bg-BG')}
        </div>
    </div>:<>No comments yet!</>
  )
}

export default LatestComment