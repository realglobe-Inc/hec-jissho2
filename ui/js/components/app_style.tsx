/**
 * Style of the whole application.
 */
import * as React from 'react'
import { ApButtonStyle } from 'apeman-react-button'

const { color } = require('../../config')

class AppStyle extends React.Component<{}, {}> {
  render () {
    return (
      <div className='app_style'>
        <ApButtonStyle highlightColor={color} />
      </div>
    )
  }
}

export default AppStyle
