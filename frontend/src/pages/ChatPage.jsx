import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';

import Main from '../components/Main';


const ChatPage = () => {
  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <Main />
      </Row>
    </Container>
  );
}

export default ChatPage
