const BASE_PATH = '/api/notes';

export default client => ({
  fetchNotes: (config = {}) => client.get(BASE_PATH, config),
  addNote: (params, config = {}) => client.post(BASE_PATH, params, config),
  pinNote: (params, config = {}) =>
    client.patch(`${BASE_PATH}/${params.id}/pin`, params, config),
  unpinNote: (params, config = {}) =>
    client.patch(`${BASE_PATH}/${params.id}/unpin`, params, config),
  updateNote: (noteId, params, config = {}) =>
    client.patch(`${BASE_PATH}/${noteId}`, params, config),
  tagNote: (tagId, noteId, config = {}) =>
    client.patch(`${BASE_PATH}/${noteId}/tag/${tagId}`, {}, config),
  untagNote: (tagId, noteId, config = {}) =>
    client.patch(`${BASE_PATH}/${noteId}/untag/${tagId}`, {}, config),
});
