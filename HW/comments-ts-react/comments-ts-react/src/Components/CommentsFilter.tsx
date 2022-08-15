import React, { FormEvent, useEffect, useState } from 'react'
import { CommentT, Status } from '../model/CommentT'
import CommentsList from './CommentsList';
import {Filter} from '../model/Filter';
import CommentInputs from './CommentInputs';

type CommentsFilterProps = {
    comments: CommentT[],
    handleSubmitComment:(e:FormEvent<HTMLFormElement>)=>void,
    onStatusChange:(comment:CommentT)=>void
    handleDelete:(comment:CommentT) => void,
    handleEdit:(comment:CommentT) => void
}

const CommentsFilter = ({comments,handleSubmitComment,...rest}:CommentsFilterProps) => {
  const [filter, setFilter] = useState<Filter>({
    status: 2,
    //order: 'asc'
  });
  
  const [filteredComments, setFilteredComments] = useState<CommentT[]>(comments);
    useEffect(() => {
      (filter.status===2)?setFilteredComments(comments.sort((a,b)=>b.modified-a.modified)):handleFilterChange(filter.status)
    }, [comments] )
  
  const handleFilterChange = async (status:number) => {
    setFilter({status:status})

    if (status!==Status.ALL){
      setFilteredComments(comments.filter((comment)=>comment.status===status).sort((a,b)=>b.modified-a.modified));

    } else setFilteredComments(comments);
  }

  return (<>
    <CommentInputs handleFilterChange={handleFilterChange} handleSubmitComment = {handleSubmitComment} />
    <CommentsList comments = {filteredComments} {...rest}/>
    </>
  )
}

export default CommentsFilter;