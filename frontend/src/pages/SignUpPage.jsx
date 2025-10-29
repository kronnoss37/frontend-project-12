import React from 'react'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

import signupPicture from '../assets/signup.jpg'
import SignUpForm from '../components/Forms/SignUpForm'

const SignUpPage = () => {
  return (
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col xs={12} md={8} xxl={6}>
          <Card className='shadow-sm'>
            <Card.Body className='d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
              <div>
                <Image src={signupPicture} roundedCircle alt='Регистрация' />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage