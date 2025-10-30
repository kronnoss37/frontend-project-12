const handleErrors = (error) => {
  if (error.response?.status === 401) {
    return { type: 'auth', notificationPath: 'notifications.errors.authError' };
  }

  if (error.response?.status === 409) {
    return { type: 'signup', notificationPath: 'notifications.errors.signupError' };
  }

  if (error?.code === 'ERR_NETWORK') {
    return { notificationPath: 'notifications.errors.network' };
  }

  if (error.response?.status >= 500) {
    return { notificationPath: 'notifications.errors.server' };
  }

  return null
}

export default handleErrors
