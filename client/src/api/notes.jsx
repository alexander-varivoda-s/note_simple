export default client => ({
  fetchNotes: (config = {}) => client.get('/notes', config),
});
