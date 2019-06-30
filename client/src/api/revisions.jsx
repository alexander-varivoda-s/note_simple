const BASE_PATH = '/api/revisions';

export default client => ({
  fetchRevisions: (id, config = {}) => client.get(`${BASE_PATH}/${id}`, config),
});
