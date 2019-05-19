import { FLASH_MESSAGE, CLEAR_FLASH_MESSAGES } from '../constants';

export default function flashReducer(state = [], action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return [...action.messages];

    case CLEAR_FLASH_MESSAGES:
      return [];

    default:
      return state;
  }
}
