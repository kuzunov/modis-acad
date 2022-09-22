import React, { Component } from 'react'


class UncontrolledFormClass extends Component<{},{}> {
    inpitRef = React.createRef<HTMLInputElement>

  render() {
    return (
      <div>UncontrolledFormClass</div>
    )
  }
}

export default UncontrolledFormClass