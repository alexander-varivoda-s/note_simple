const BASE_PATH = '/api/users';

export default client => ({
  login: (params, config = {}) =>
    client.post(`${BASE_PATH}/login`, params, config),
  logout: (config = {}) => client.get(`${BASE_PATH}/logout`, config),
  register: (params, config = {}) => client.post(BASE_PATH, params, config),
  verifyEmail: (token, config = {}) =>
    client.get(`${BASE_PATH}/verify/${token}`, config),
  getUser: (config = {}) => client.get(BASE_PATH, config),
  forgotPassword: (params, config = {}) =>
    client.post(`${BASE_PATH}/forgot-password`, params, config),
  resetPassword: (params, config = {}) =>
    client.post(`${BASE_PATH}/reset-password`, params, config),
});
