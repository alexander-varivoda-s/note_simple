export default client => ({
  fetchTags: (config = {}) => client.get('/tags', config),
  createTag: (name, config = {}) => client.post('/tags', { name }, config),
  deleteTag: (tagId, config = {}) => client.delete(`/tags/${tagId}`, config),
  tagNote: (tagId, noteId, config = {}) =>
    client.patch(`/notes/${noteId}/tag/${tagId}`, {}, config),
  untagNote: (tagId, noteId, config = {}) =>
    client.patch(`/notes/${noteId}/untag/${tagId}`, config),
});
