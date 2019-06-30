const BASE_PATH = '/api/users';

export default client => ({
  updateEmail: (params = {}, config = {}) =>
    client.patch(`${BASE_PATH}/update-email`, params, config),
  updatePassword: (params = {}, config = {}) =>
    client.patch(`${BASE_PATH}/update-password`, params, config),
  deleteAccount: (config = {}) => client.delete('/users', {}, config),
});
