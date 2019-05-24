export default client => ({
  fetchTags: (config = {}) => client.get('/tags', config),
});
