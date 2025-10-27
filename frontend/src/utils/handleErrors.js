const handleErrors = (error) => {

  if (error?.code === 'ERR_NETWORK') {
    return { notificationPath: 'Network' };
  }

  if (error.response?.status >= 500) {
    return { notificationPath: 'Server' };
  }

  return null
}

export default handleErrors