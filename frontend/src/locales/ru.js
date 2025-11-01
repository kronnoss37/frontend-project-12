const ru = {
  translation: {
    navbar: {
      brand: 'Hexlet Chat',
      logoutButton: 'Выйти',
    },
    loginPage: {
      altImage: 'Войти',
      question: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    loginForm: {
      title: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      submitButton: 'Войти',
    },
    signUpPage: {
      altImage: 'Регистрация',
    },
    signUpForm: {
      title: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      passwordConfirmLabel: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
    },
    notFoundPage: {
      notFoundText: 'Страница не найдена',
      description: 'Но вы можете перейти',
      mainPageText: 'на главную страницу',
    },
    chatForm: {
      sendButton: 'Отправить',
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
    },
    messages: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    channels: {
      title: 'Каналы',
      addButton: '+',
      channelPrefix: '#',
      dropdown: {
        toggle: 'Управление каналом',
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    modals: {
      addTitle: 'Добавить канал',
      removeTitle: 'Удалить канал',
      renameTitle: 'Переименовать канал',
      cancelButton: 'Отменить',
      sendButton: 'Отправить',
      removeButton: 'Удалить',
      nameChannelLabel: 'Имя канала',
      removeConfirmation: 'Уверены?',
    },
    loadingButton: {
      status: 'Загрузка...',
    },
    controlErrors: {
      requiredField: 'Обязательное поле',
      identicalPasswords: 'Пароли должны совпадать',
      fieldLength: 'От 3 до 20 символов',
      minPasswordSymbols: 'Не менее 6 символов',
      uniqueField: 'Должно быть уникальным',
      authError: 'Неверные имя пользователя или пароль',
      signupError: 'Такой пользователь уже существует',
    },
    notifications: {
      errors: {
        addChannel: 'Ошибка при добавлении канала',
        removeChannel: 'Ошибка при удалении канала',
        renameChannel: 'Ошибка при переименовании канала',
        authError: 'Ошибка при авторизации',
        signupError: 'Ошибка при регистрации',
        network: 'Ошибка соединения',
        server: 'Ошибка на стороне сервера',
      },
      success: {
        addChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удалён',
        auth: 'Вы вошли в аккаунт!',
        registration: 'Регистрация прошла успешно!',
      },
    },
  },
}

export default ru
