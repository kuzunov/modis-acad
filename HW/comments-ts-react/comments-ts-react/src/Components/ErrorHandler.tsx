import React from 'react'
import { CommentsError } from '../model/CommentT'

type ErrorProps = {
    error:CommentsError
}

const ErrorHandler = ({error}: ErrorProps) => {
  return (
        (error.status)? <div className='error'>{error.message}</div>:<></>
        )
  
}

export default ErrorHandler