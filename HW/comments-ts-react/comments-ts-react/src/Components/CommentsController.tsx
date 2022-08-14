import React, { FormEvent, useEffect, useState, useRef, useContext } from "react";
import { CommentsError, CommentT, Status } from "../model/CommentT";
import { Filter, Order } from "../model/Filter";
import CommentList from "./CommentsList";
import CommentsFilter from "./CommentsFilter";
import ErrorHandler from "./ErrorHandler";
import CommentInputs from "./CommentInputs";
import { CommentContext } from "../App";
type CommentsControllerT = React.FC & { nextId: number, };
type CommentControllerP = {
  latest:CommentT,
setLatest:(c:CommentT)=>void
}
type FieldName = "title" | "body";


function CommentsController({setLatest,latest}:CommentControllerP) {
  // const {setLatest} = useContext(CommentContext);
  const [comments, setComments] = useState<CommentT[]>([]);
  const [error, setError] = useState<CommentsError>({
    status: false,
    message: "",
  });

  const firstRender = useRef(true);
  useEffect(() => {
    const fetchComments = async () => { const cJson = localStorage.getItem("comments");
    let nextCommentId = localStorage.getItem("next-id");
    CommentsController.nextId = nextCommentId ? JSON.parse(nextCommentId) : 0;
    if (cJson) {
      const commentsDB:CommentT[] = await JSON.parse(cJson)
      setComments(commentsDB);
      setLatest(commentsDB.reduce((prev, current) => (+prev.modified > +current.modified) ? prev : current));
    }
  } 
    fetchComments().catch((err) => console.log(err));

   
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem("comments", JSON.stringify(comments));
      localStorage.setItem(
        "next-id",
        JSON.stringify(CommentsController.nextId)
      );
      
    } else {
      firstRender.current = false;

    }
  }, [comments]);
  const onStatusChange = (comment: CommentT) => {
    setComments(
      comments.map((currC) => currC.id === comment.id
        ? {
          ...currC,
          status: currC.status === Status.ACTIVE
            ? Status.SUSPENDED
            : Status.ACTIVE,
        }
        : currC
      )
    );
  };
  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.has("title") && formData.has("body")) {
      const now = Date.now();
      const newComment: CommentT = {
        id: CommentsController.nextId,
        created: now,
        modified: now,
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        status: Status.ACTIVE,
      };
      if (validInput(newComment)) {
        CommentsController.nextId += 1;
        setComments([...comments, newComment]);
        setError({ status: false });
      } else {
        setError({ status: true, message: "Title should be less than 80 characters and body should be less than 512 characters" });
      }
    }
  };
  const handleDelete = (commentToDel: CommentT) => {
    setComments(comments.filter((comment) => comment.id !== commentToDel.id));
  };
  const handleEdit = (commentToEdit: CommentT) => {
    const formEl = document.querySelector("form") as HTMLFormElement;
    if (formEl !== null) {
      const formFields: NodeListOf<HTMLInputElement> = document.querySelectorAll(".comment-form input.comment-field");
      if (formFields) {
        formFields.forEach((field) => {
          field.value = commentToEdit[field.name as FieldName];
        });
        const button = formEl.lastChild as HTMLButtonElement;
        const submitChanges = formEl.querySelector("button");
        if (submitChanges) {
          submitChanges.classList.toggle("hidden");
          submitChanges.onclick = (e) => {
            e.preventDefault();
            const edittedComment = { ...commentToEdit };
            const tempCommentTitle = formEl.elements[0] as HTMLInputElement;
            const tempCommentBody = formEl.elements[1] as HTMLInputElement;
            edittedComment.title = tempCommentTitle.value;
            edittedComment.body = tempCommentBody.value;
            if (validInput(edittedComment)) {
              setComments(
                comments.map((currC) => currC.id === edittedComment.id
                  ? {
                    ...currC,
                    title: formFields[0].value,
                    body: formFields[1].value,
                    modified: Date.now(),
                  }
                  : currC
                )
              );
              formEl.reset();
              button.classList.toggle("hidden");
              submitChanges.classList.toggle("hidden");
              setError({ status: false });
            }
            else {
              setError({ status: true, message: "Title should be less than 80 characters and body should be less than 512 characters" });
            }
          };
        }
        button.classList.toggle("hidden");
      }
    }
  };
  const validInput = (comment: CommentT) => {
    if (comment.title.length > 80 || comment.body.length > 512) {
      return false;
    } else {
      setError({ status: false, message: '' });
      setLatest(comment);

      return true;
    }
  };


  return (
    <>
      <ErrorHandler error={error} />
      <CommentsFilter
        comments={comments}
        handleSubmitComment={handleSubmitComment}
        onStatusChange={onStatusChange}
        handleDelete={handleDelete}
        handleEdit={handleEdit} />
    </>
  );
}
CommentsController.nextId = 0;
export default CommentsController;
