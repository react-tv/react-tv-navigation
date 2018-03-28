import Navigation from './navigation';

class SpatialNavigation {
  constructor() {
    this.handleFocused = this.handleFocused.bind(this);
    this.navigableFilter = this.navigableFilter.bind(this);
    this.handleNavigationFailed = this.handleNavigationFailed.bind(this);

    this.destroy();
    this.bindFocusEvent();
  }

  init(updateState) {
    if (!this.setState) {
      this.setState = updateState;
    }

    Navigation.init();
    Navigation.focus();
    this.bindFocusEvent();
  }

  destroy() {
    this.focusedPath = null;
    this.setState = null;

    Navigation.uninit();
    this.unbindFocusEvent();
  }

  bindFocusEvent() {
    if (!this.listening) {
      this.listening = true;
      document.addEventListener('sn:focused', this.handleFocused);
      document.addEventListener('sn:navigatefailed', this.handleNavigationFailed);
    }
  }

  unbindFocusEvent() {
    document.removeEventListener('sn:focused', this.handleFocused);
    document.removeEventListener('sn:navigatefailed', this.handleNavigationFailed);
    this.listening = false;
  }

  handleFocused(ev) {
    if (this.focusedPath !== ev.detail.sectionId) {
      this.setState(ev.detail.sectionId);
      Navigation.focus(ev.detail.sectionId);
    }
  }

  handleNavigationFailed({ detail: { direction } }) {
    if (!this.getCurrentFocusedPath()) {
      return;
    }

    const currentFocusedPaths = this.getCurrentFocusedPath().split('/');

    let currentFocusedGroup = '';
    if (currentFocusedPaths.length > 2) {
    currentFocusedGroup = currentFocusedPaths
      .slice(0, currentFocusedPaths.length - 2)
      .join('/');
    }

    this.setCurrentFocusedPath(currentFocusedGroup);
    Navigation.move(direction)
  }

  getCurrentFocusedPath() {
    return this.focusedPath;
  }

  setCurrentFocusedPath(focusPath) {
    this.focusedPath = focusPath;
    Navigation.focus(focusPath);
  }

  navigableFilter(element, focusPath) {
    if (!this.getCurrentFocusedPath()) {
      return true;
    }

    const currentFocusedPaths = this.getCurrentFocusedPath().split('/');

    let currentFocusedGroup = '';
    if (currentFocusedPaths.length > 1) {
      currentFocusedGroup = currentFocusedPaths
        .slice(0, currentFocusedPaths.length - 1)
        .join('/');
    }

    return focusPath.startsWith(currentFocusedGroup);
  }

  isFocusable(focusDOMElement) {
    return !!(focusDOMElement && Navigation.getSectionId(focusDOMElement));
  }

  addFocusable(focusDOMElement, { focusPath, onEnterPressHandler, disabled }) {
    if (!focusDOMElement) {
      return;
    }

    this.removeFocusable(focusDOMElement, { onEnterPressHandler });

    if (disabled) {
      return;
    }

    const params = [{ selector: focusDOMElement, navigableFilter: this.navigableFilter }];
    if (focusPath) {
      params.unshift(focusPath);
    }

    focusDOMElement.addEventListener('sn:enter-down', onEnterPressHandler);
    const sectionId = Navigation.add(...params);
    Navigation.makeFocusable(sectionId);
  }

  removeFocusable(focusDOMElement, { onEnterPressHandler }) {
    if (!this.isFocusable(focusDOMElement)) {
      return;
    }

    const sectionId = Navigation.getSectionId(focusDOMElement);
    Navigation.remove(sectionId);
    focusDOMElement.removeEventListener('sn:enter-down', onEnterPressHandler);
  }
}

export default new SpatialNavigation();
