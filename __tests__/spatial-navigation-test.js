import SpatialNavigation from '../src/spatial-navigation';

describe('SpatialNavigation', () => {
  describe('initialize', () => {
    let setStateSpy;

    beforeEach(() => {
      setStateSpy = jest.fn();
      SpatialNavigation.init(setStateSpy);
    });

    it('listens to sn:focused event', () => {
      const event = new CustomEvent('sn:focused', {
        detail: { sectionId: 'focusPath' },
      });
      document.dispatchEvent(event);

      expect(setStateSpy).toHaveBeenCalled();
    });

    describe('when focusing the same focused element', () => {
      beforeEach(() => {
        SpatialNavigation.focused = 'focusPath';
      });

      it('does nothing', () => {
        const event = new CustomEvent('sn:focused', {
          detail: { sectionId: 'focusPath' },
        });
        document.dispatchEvent(event);

        expect(setStateSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('destroy', () => {

  });
});
