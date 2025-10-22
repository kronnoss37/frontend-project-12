import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

const ChatForm = () => {
  const [message, setMessage] = useState('')
  const isInvalid = !message.trim()

  const onChange = ({ target: { value } }) => {
    setMessage(value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('Отправить сообщение')
    // addMessage { body: 'new message', channelId: '1', username: 'admin } - function in Chat component, get here via props
    // body -> message, channelId -> currentChannel.id, username ->  username from store
  }

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup className={isInvalid ? 'has-validation' : ''}>
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={message}
            onChange={onChange}
          />
          <Button type="submit" variant="light" className="btn-group-vertical" disabled={isInvalid} onSubmit={onSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right-square"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              >
              </path>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default ChatForm
