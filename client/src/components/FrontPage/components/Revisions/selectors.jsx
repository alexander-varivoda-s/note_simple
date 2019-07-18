import { FLAGS } from '../../../Shared/constants';

// eslint-disable-next-line import/prefer-default-export
export const getRevisionSelectorVisibilityStatus = state =>
  state[FLAGS].isRevisionSelectorVisible;
