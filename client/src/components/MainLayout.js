import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProfileImg from './img/profile.png';
import LogoImg from './img/logo.png';

function MainLayout () {
    return(
        <>
            <div class="sidebar" style={{marginLeft: 30, marginRight: 30}}>
            <Navbar style={{backgroundColor: '#FF847C', borderRadius: 10, paddingTop: 15, paddingBottom: 15, paddingLeft: 5, paddingRight: 5}}>
                <Container>
                <Navbar.Brand href="/"><img src={LogoImg} /></Navbar.Brand>
                    <Nav className="justify-contend-end">
                        <Nav.Link href='/profile'><img src={ProfileImg}/></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        </>
      
    );
    
}

export default MainLayout;

