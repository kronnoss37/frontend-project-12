const handleErrors = (error) => {
  if (error.response?.status === 401) {
    return { type: 'auth' };
  }

  if (error.response?.status === 409) {
    return { type: 'signup' };
  }

  if (error?.code === 'ERR_NETWORK') {
    return { notificationPath: 'Network' }
  }

  if (error.response?.status >= 500) {
    return { notificationPath: 'Server' }
  }

  return null
}

export default handleErrors
