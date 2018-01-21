import Navigation from './navigation';

class SpatialNavigation {
  constructor() {
    this.focusedPath = null;
    this.setState = null;

    this.handleFocused = this.handleFocused.bind(this);
    document.addEventListener('sn:focused', this.handleFocused);
  }

  init(updateState) {
    if (!this.setState) {
      this.setState = updateState;
    }

    Navigation.init();
    Navigation.focus();
  }

  destroy() {
    this.setState = null;
    Navigation.uninit();
    document.removeEventListener('sn:focused', this.handleFocused);
  }

  handleFocused(ev) {
    if (this.focusedPath !== ev.detail.sectionId) {
      this.setState(ev.detail.sectionId);
      Navigation.focus(ev.detail.sectionId);
    }
  }

  getCurrentFocusedPath() {
    return this.focusedPath;
  }

  setCurrentFocusedPath(focusPath) {
    this.focusedPath = focusPath;
    Navigation.focus(focusPath);
  }

  addFocusable(focusPath, focusDOMElement) {
    this.removeFocusable(focusPath);

    Navigation.add(focusPath, {selector: focusDOMElement});
    Navigation.makeFocusable(focusPath);
  }

  removeFocusable(focusPath) {
    Navigation.remove(focusPath);
  }
}

export default new SpatialNavigation();
