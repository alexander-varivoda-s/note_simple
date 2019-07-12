import { HIDE_REVISION_SELECTOR, SHOW_REVISION_SELECTOR } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const toggleRevisionSelectorVisibilityAction = isVisible => ({
  type: isVisible ? SHOW_REVISION_SELECTOR : HIDE_REVISION_SELECTOR,
});
