export default client => ({
  login: (params, config = {}) => client.post('/users/login', params, config),
  logout: (config = {}) => client.get('/users/logout', config),
  register: (params, config = {}) => client.post('/users', params, config),
  verifyEmail: (token, config = {}) => client.post(`/users/verify/${token}`, config),
});
