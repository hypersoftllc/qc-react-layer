import PT from 'prop-types'
import React from 'react'
import Block from '@qc/react-block'


function Layer(props) {
  const domProps = {
    ...props,
    className: `${props.compClassName} ${props.className}`.trim(),
  }
  delete domProps.children
  delete domProps.compClassName
  return (
    <Block {...domProps}>
      {props.children}
    </Block>
  )
}

Layer.defaultProps = {
  className: '',
  compClassName: 'Layer',
}

Layer.propTypes = {
  children: PT.node,
  className: PT.string,
  compClassName: PT.string,
}

export default Layer
