import React from 'react';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import SpatialNavigation from '../src/spatial-navigation';
import withFocusable from '../src/with-focusable';

describe('withFocusable', () => {
  const Component = () => <div />;
  const renderComponent = ({
    focusPath,
    currentFocusPath,
    setFocus = jest.fn(),
  }) => {
    const EnhancedComponent = withFocusable(Component);
    return mount(
      <EnhancedComponent focusPath={focusPath} />,
      { context: { currentFocusPath, setFocus } }
    );
  };

  let component;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('injects focusPath as prop', () => {
    component = renderComponent({ focusPath: 'focusPath' });
    expect(component.find(Component).prop('focusPath')).toEqual('focusPath');
  });

  describe('when element focusPath is the same as currentFocusPath', () => {
    it('injects focused prop as true', () => {
      const focusPath = 'focusPath1';
      component = renderComponent({ currentFocusPath: focusPath, focusPath });

      expect(component.find(Component).prop('focused')).toBe(true);
    });
  });

  describe('when element focusPath is different than currentFocusPath', () => {
    it('injects focused prop as true', () => {
      component = renderComponent({
        currentFocusPath: 'focusPath1',
        focusPath: 'focusPath2',
      });

      expect(component.find(Component).prop('focused')).toBe(false);
    });
  });

  describe('about setFocus injected prop', () => {
    it('injects function to children', () => {
      component = renderComponent({ focusPath: 'focusPath' });
      expect(component.find(Component).prop('setFocus')).not.toBeFalsy();
    });

    it('binds configured focusPath as first parameter', () => {
      const setFocusSpy = jest.fn();
      component = renderComponent({
        focusPath: 'focusPath',
        setFocus: setFocusSpy,
      });

      const setFocus = component.find(Component).prop('setFocus');
      setFocus();

      expect(setFocusSpy).toHaveBeenCalledWith('focusPath');
    });

    it('sends setFocus parameter as second parameter', () => {
      const setFocusSpy = jest.fn();
      component = renderComponent({
        focusPath: 'focusPath',
        setFocus: setFocusSpy,
      });

      const setFocus = component.find(Component).prop('setFocus');
      setFocus('otherFocusPath');

      expect(setFocusSpy).toHaveBeenCalledWith('focusPath', 'otherFocusPath');
    });
  });

  describe('lifecycle', () => {
    beforeEach(() => {
      spyOn(SpatialNavigation, 'addFocusable');
      spyOn(SpatialNavigation, 'removeFocusable');
    });

    it('adds focusable after component mounts', () => {
      component = renderComponent({ focusPath: 'focusPath' });
      // TODO: back toHaveBeenCalledWith, testing DOM Element
      expect(SpatialNavigation.addFocusable).toHaveBeenCalled();
    });

    it('removes focusable after component unmounts', () => {
      component = renderComponent({ focusPath: 'focusPath' });

      component.unmount();
      // TODO: back toHaveBeenCalledWith, testing DOM Element
      expect(SpatialNavigation.removeFocusable).toHaveBeenCalled();
    });
  });
});
