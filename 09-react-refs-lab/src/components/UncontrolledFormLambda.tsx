import React, { useRef } from 'react'

type Props = {}

const UncontrolledFormLambda = (props: Props) => {

    const nameRef = useRef<HTMLInputElement>(null)
    const ageRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        alert(name.current?.value)
    }
  return (
    <form onSubmit={handleSubmit}>
   <input ref={nameRef} type="text" />
   <input ref={ageRef} type="number" />
  <input type="submt">Submit</input>
  <input type="button" onClick={()=>ageRef.current?.focus()}>FocusAge</input>
  </form>
  )
}