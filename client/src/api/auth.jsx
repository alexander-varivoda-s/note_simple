export default client => ({
  login: (params, config = {}) => client.post('/users/login', params, config),
  logout: (config = {}) => client.get('/users/logout', config),
  register: (params, config = {}) => client.post('/users', params, config),
  verifyEmail: (token, config = {}) => client.get(`/users/verify/${token}`, config),
  getUser: (config = {}) => client.get('/users', config),
  forgotPassword: (params, config = {}) => client.post('/users/forgot-password', params, config),
  resetPassword: (params, config = {}) => client.post('/users/reset-password', params, config),
});
