import React from 'react'
import { Link } from 'react-router'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

import LoginForm from '../components/Forms/LoginForm'
import loginPicture from '../assets/login.jpg'

const LoginPage = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body as={Row} className="p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={loginPicture} roundedCircle alt="Войти" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
