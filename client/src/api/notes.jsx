export default client => ({
  fetchNotes: (config = {}) => client.get('/notes', config),
  addNote: (params, config = {}) => client.post('/notes', params, config),
  pinNote: (params, config = {}) => client.patch(`/notes/${params.id}/pin`, params, config),
  unpinNote: (params, config = {}) => client.patch(`/notes/${params.id}/unpin`, params, config),
});
