import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { LOGIN_ROUTE } from '../utils/consts';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LIBRARY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from '../utils/consts';
import '../style/MainLayout.css'



function MainLayout() {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(user.isAuth)
        if(!user.isAuth){
            navigate(LOGIN_ROUTE)
        }
      }, [user.isAuth]);

    const profileClick = async () => {
        navigate(PROFILE_ROUTE)
    }
    const mainClick = async () => {
        navigate(MAIN_ROUTE)
    }
    const libraryClick = async () => {
        navigate(LIBRARY_ROUTE)
    }
    return (
        <>
            <div class="header">
                <Navbar style={{ backgroundColor: '#FF847C', borderRadius: 10, paddingTop: 15, paddingBottom: 15, paddingLeft: 5, paddingRight: 5 }}>
                    <Container style={{ padding: 0 }}>
                        <Navbar.Brand onClick={() => mainClick()} style={{ color: 'white' }}>ЛОГОТИП</Navbar.Brand>
                        <Nav className="justify-contend-end">
                            <div onClick={profileClick} class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                                    <g clip-path="url(#clip0_70_125)">
                                        <rect x="-6" y="-6" width="50" height="50" rx="10" fill="white" />
                                        <path d="M23.75 13.4583C23.75 14.928 23.1661 16.3376 22.1268 17.3768C21.0876 18.4161 19.678 19 18.2083 19C16.7386 19 15.329 18.4161 14.2897 17.3768C13.2505 16.3376 12.6666 14.928 12.6666 13.4583C12.6666 11.9886 13.2505 10.579 14.2897 9.53974C15.329 8.50048 16.7386 7.91663 18.2083 7.91663C19.678 7.91663 21.0876 8.50048 22.1268 9.53974C23.1661 10.579 23.75 11.9886 23.75 13.4583Z" fill="black" />
                                        <path d="M27.9142 31.6667H9.41607C8.77957 31.6667 8.42015 30.9684 8.81757 30.4713C10.583 28.2593 14.7092 23.75 19 23.75C23.3177 23.75 27.0164 28.3195 28.5427 30.5156C28.8911 31.0175 28.5269 31.6667 27.9157 31.6667H27.9142Z" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_70_125">
                                            <rect width="38" height="38" rx="10" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div class="sidebar">
                <nav class="sidebar-nav">
                    <div onClick={() => mainClick()} class='main-div cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" class="svg-sidebar">
                            <path d="M10.8569 4.75H6.78617C5.66162 4.75 4.75 5.66162 4.75 6.78617V10.8569C4.75 11.9815 5.66162 12.8931 6.78617 12.8931H10.8569C11.9815 12.8931 12.8931 11.9815 12.8931 10.8569V6.78617C12.8931 5.66162 11.9815 4.75 10.8569 4.75Z" fill="black" />
                            <path d="M10.8569 14.9293H6.78617C5.66162 14.9293 4.75 15.8409 4.75 16.9654V21.0362C4.75 22.1607 5.66162 23.0723 6.78617 23.0723H10.8569C11.9815 23.0723 12.8931 22.1607 12.8931 21.0362V16.9654C12.8931 15.8409 11.9815 14.9293 10.8569 14.9293Z" fill="black" />
                            <path d="M10.8569 25.1069H6.78617C5.66162 25.1069 4.75 26.0185 4.75 27.1431V31.2138C4.75 32.3384 5.66162 33.25 6.78617 33.25H10.8569C11.9815 33.25 12.8931 32.3384 12.8931 31.2138V27.1431C12.8931 26.0185 11.9815 25.1069 10.8569 25.1069Z" fill="black" />
                            <path d="M21.0361 4.75H16.9654C15.8408 4.75 14.9292 5.66162 14.9292 6.78617V10.8569C14.9292 11.9815 15.8408 12.8931 16.9654 12.8931H21.0361C22.1607 12.8931 23.0723 11.9815 23.0723 10.8569V6.78617C23.0723 5.66162 22.1607 4.75 21.0361 4.75Z" fill="black" />
                            <path d="M31.2139 4.75H27.1431C26.0186 4.75 25.1069 5.66162 25.1069 6.78617V10.8569C25.1069 11.9815 26.0186 12.8931 27.1431 12.8931H31.2139C32.3384 12.8931 33.25 11.9815 33.25 10.8569V6.78617C33.25 5.66162 32.3384 4.75 31.2139 4.75Z" fill="black" />
                            <path d="M21.0361 14.9293H16.9654C15.8408 14.9293 14.9292 15.8409 14.9292 16.9654V21.0362C14.9292 22.1607 15.8408 23.0723 16.9654 23.0723H21.0361C22.1607 23.0723 23.0723 22.1607 23.0723 21.0362V16.9654C23.0723 15.8409 22.1607 14.9293 21.0361 14.9293Z" fill="black" />
                            <path d="M21.0361 25.1069H16.9654C15.8408 25.1069 14.9292 26.0185 14.9292 27.1431V31.2138C14.9292 32.3384 15.8408 33.25 16.9654 33.25H21.0361C22.1607 33.25 23.0723 32.3384 23.0723 31.2138V27.1431C23.0723 26.0185 22.1607 25.1069 21.0361 25.1069Z" fill="black" />
                            <path d="M31.2139 14.9293H27.1431C26.0186 14.9293 25.1069 15.8409 25.1069 16.9654V21.0362C25.1069 22.1607 26.0186 23.0723 27.1431 23.0723H31.2139C32.3384 23.0723 33.25 22.1607 33.25 21.0362V16.9654C33.25 15.8409 32.3384 14.9293 31.2139 14.9293Z" fill="black" />
                            <path d="M31.2139 25.1069H27.1431C26.0186 25.1069 25.1069 26.0185 25.1069 27.1431V31.2138C25.1069 32.3384 26.0186 33.25 27.1431 33.25H31.2139C32.3384 33.25 33.25 32.3384 33.25 31.2138V27.1431C33.25 26.0185 32.3384 25.1069 31.2139 25.1069Z" fill="black" />
                        </svg>
                        <h2>Главная</h2>
                    </div>
                    <div onClick={() => libraryClick()} class='main-div cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" class="svg-sidebar">
                            <path d="M7.91663 11.0833H30.0833M7.91663 19H30.0833M7.91663 26.9167H30.0833" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2>Библиотека</h2>
                    </div>
                </nav>
            </div>

            <div class="main">
                <div class='containers'>
                    <Outlet />
                </div>
            </div>
        </>

    );

}

export default MainLayout;

