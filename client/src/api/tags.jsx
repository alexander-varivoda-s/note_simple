const BASE_PATH = '/api/tags';

export default client => ({
  fetchTags: (config = {}) => client.get(BASE_PATH, config),
  createTag: (name, config = {}) => client.post(BASE_PATH, { name }, config),
  deleteTag: (tagId, config = {}) =>
    client.delete(`${BASE_PATH}/${tagId}`, config),
});
