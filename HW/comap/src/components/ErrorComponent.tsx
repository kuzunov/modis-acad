import React from 'react'

type Props = {
    error?:Error;
}

const ErrorComponent = (props: Props) => {
  return (
    <div>Oops. Something went wrong</div>
  )
}

export default ErrorComponent