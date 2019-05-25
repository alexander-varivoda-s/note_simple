export default client => ({
  fetchNotes: (config = {}) => client.get('/notes', config),
  addNote: (params, config = {}) => client.post('/notes', params, config),
});
