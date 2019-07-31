import { createAction } from 'redux-actions';

export const emptyTrash = createAction('EMPTY_TRASH');
export const emptyTrashSucceeded = createAction('EMPTY_TRASH_SUCCEEDED');
export const emptyTrashFailure = createAction('EMPTY_TRASH_FAILURE');
