import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import mapProps from 'recompose/mapProps'
import lifecycle from 'recompose/lifecycle'
import getContext from 'recompose/getContext'

import SpatialNavigation from './spatial-navigation'

const withFocusable = ({
  focusPath = ''
} = {}) => compose(
  getContext({
    setFocus: PropTypes.func,
    currentFocusPath: PropTypes.string,
  }),
  mapProps(({ currentFocusPath, setFocus, ...props }) => ({
    focused: currentFocusPath === focusPath,
    setFocus: setFocus.bind(null, focusPath),
    focusPath,
    ...props,
  })),
  lifecycle({
    componentDidMount() {
      SpatialNavigation.addFocusable(focusPath)
    },
    componentWillUnmount() {
      SpatialNavigation.removeFocusable(focusPath)
    },
  }),
)

export default withFocusable
