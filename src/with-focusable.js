import ReactTV from 'react-tv';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import lifecycle from 'recompose/lifecycle';
import getContext from 'recompose/getContext';
import setPropTypes from 'recompose/setPropTypes';

import SpatialNavigation from './spatial-navigation';

const withFocusable = compose(
  setPropTypes({
    focusPath: PropTypes.string.isRequired,
  }),
  getContext({
    setFocus: PropTypes.func,
    currentFocusPath: PropTypes.string,
  }),
  mapProps(({ currentFocusPath, setFocus, focusPath, ...props }) => ({
    focused: currentFocusPath === focusPath,
    setFocus: setFocus.bind(null, focusPath),
    focusPath,
    ...props,
  })),
  lifecycle({
    componentDidMount() {
      SpatialNavigation.addFocusable(
        ReactTV.findDOMNode(this),
        this.props.focusPath
      );
    },
    componentWillUnmount() {
      SpatialNavigation.removeFocusable(ReactTV.findDOMNode(this));
    },
  }),
);

export default withFocusable;
