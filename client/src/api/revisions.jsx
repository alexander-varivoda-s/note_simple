export default client => ({
  fetchRevisions: (id, config = {}) => client.get(`/revisions/${id}`, config),
});
