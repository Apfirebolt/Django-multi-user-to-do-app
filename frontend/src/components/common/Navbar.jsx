import React from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout, reset } from '../../features/auth/AuthSlice'
import { FaSignOutAlt } from 'react-icons/fa'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  console.log('User data is now from user ', user)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  return (
    <header>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>To Do</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {user ?
             <Nav className='mr-auto'>
             <LinkContainer to='/task'>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
             </LinkContainer>
             <LinkContainer to='/category'>
               <Nav.Link>
                Category
               </Nav.Link>
             </LinkContainer>
             <LinkContainer to='/task'>
               <Nav.Link>
                Task
               </Nav.Link>
             </LinkContainer>
           </Nav>
           :
           <Nav className='mr-auto'>
              <LinkContainer to='/login'>
                <Nav.Link>
                  Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link>
                  Register
                </Nav.Link>
              </LinkContainer>
            </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
