import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center bg-success text-white fixed-bottom py-3'>Copyright &copy; To Do App in Django and React</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
