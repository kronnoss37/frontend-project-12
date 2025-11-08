import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import signupPicture from '../assets/signup.jpg'
import SignUpForm from '../components/Forms/SignUpForm'

const SignUpPage = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={9} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body as={Row} className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={signupPicture} roundedCircle alt={t('signUpPage.altImage')} width="250px" />
              </Col>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpPage
