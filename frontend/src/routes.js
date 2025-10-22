const apiPath = '/api/v1'

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: (id = '') => [apiPath, `channels`, id].filter(Boolean).join('/'),
  messagesPath: (id = '') => [apiPath, `messages`, id].filter(Boolean).join('/'),
};

export default routes
