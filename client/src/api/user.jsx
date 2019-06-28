export default client => ({
  updateEmail: (params = {}, config = {}) =>
    client.patch('/users/update-email', params, config),
  updatePassword: (params = {}, config = {}) =>
    client.patch('/users/update-password', params, config),
  deleteAccount: (config = {}) => client.delete('/users', {}, config),
});
