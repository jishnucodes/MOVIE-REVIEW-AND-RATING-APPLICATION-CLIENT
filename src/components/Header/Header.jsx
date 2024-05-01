import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FaUser } from "react-icons/fa";
import './Header.css'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoginState, userDataState } from '../../Store/Atoms/loginAtom';
import DarkMode from '../DarkMode/DarkMode';
import axios from '../../axios/axios';
import { activeLinkState } from '../../Store/Atoms/activeLinkAtom';


const Header = () => {

    const [isLogin, setIsLogin] = useRecoilState(isLoginState)
    const [userData, setUserData] = useRecoilState(userDataState)

    const [activeLink, setActiveLink] = useRecoilState(activeLinkState)



    const navigate = useNavigate()

    //The signin fetch
    useEffect(() => {

        const storedIsLogin = localStorage.getItem('isLogin');
        if (storedIsLogin !== null) {
            setIsLogin(JSON.parse(storedIsLogin));
        }
        if (isLogin) {

            const fetchData = async () => {
                try {
                    console.log("This is the login data");
                    const response = await axios.get('/user/info', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                        }
                    });

                    localStorage.setItem("user", JSON.stringify(response.data));
                    const userDataString = localStorage.getItem("user");

                    if (userDataString) {
                        const userData = JSON.parse(userDataString);
                        setUserData(userData);
                    } else {
                        console.log("No user data found in local storage");
                    }

                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchData();
        }

    }, [isLogin, setIsLogin, setUserData]);



    const handleNavItemClick = (navItem) => {
        setActiveLink(navItem);
    };


    //The handleLoggout
    const handleLoggOut = () => {
        localStorage.removeItem('isSignup')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('user')
        localStorage.removeItem('jwt_token')
        setIsLogin(false)
        setIsSignup(false)
        navigate('/home')
        window.location.reload()
    }


    return (
        <header>
            <Navbar expand="lg" className="py-3" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <span className='logo me-2'>FF</span>
                        FlickFlair
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='text-center text-lg-start navbar_nav'>
                            <Link
                                to={'/home'}
                                className={`ms-lg-3 mt-3 mt-lg-0 ${activeLink === 'home' ? 'active' : ''}`}
                                onClick={() => handleNavItemClick('home')}
                            >
                                Home
                            </Link>
                            <Link
                                to={'/movies'}
                                className={`ms-lg-3 mt-2 mt-lg-0 ${activeLink === 'movie' ? 'active' : ''}`}
                                onClick={() => handleNavItemClick('movie')}
                            >
                                Movies
                            </Link>
                            {
                                isLogin ?
                                    null : (
                                        <Link
                                            to={'/login'}
                                            className={`ms-lg-3 mt-2 mt-lg-0 ${activeLink === 'login' ? 'active' : ''} `}
                                            onClick={() => handleNavItemClick('login')}
                                        >
                                            Login
                                        </Link>
                                    )
                            }
                        </Nav>


                        {
                            isLogin ? (
                                <Nav className='ms-auto text-center text-lg-start justify-content-center align-items-center'>
                                    <DarkMode />
                                    <NavDropdown title={<>
                                        <span className='user_icon me-1'>
                                            <FaUser />
                                        </span>
                                        {userData && userData.username}
                                    </>
                                    }
                                        id="basic-nav-dropdown"
                                        className='me-lg-4 mt-2 mt-lg-0 navbar_dropdown'
                                    >
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/favorites'}

                                                className={`${activeLink === 'favorites' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('favorites')}
                                            >
                                                Favorites
                                            </Link>
                                        </Nav>
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/reviews'}

                                                className={`${activeLink === 'reviews' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('reviews')}
                                            >
                                                Reviews
                                            </Link>
                                        </Nav>
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/update-password'}

                                                className={`${activeLink === 'updatePassword' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('updatePassword')}
                                            >
                                                Update Password
                                            </Link>
                                        </Nav>
                                        {
                                            isLogin ? (
                                                <Nav className='px-3 mb-2'>
                                                    <Link to={'/home'}
                                                        className={`${activeLink === 'logOut' ? 'active' : ''}`}
                                                        onClick={() => {
                                                            handleNavItemClick('logOut')
                                                            handleLoggOut()
                                                        }}
                                                    >
                                                        Log Out
                                                    </Link>
                                                </Nav>

                                            ) : null
                                        }
                                    </NavDropdown>
                                </Nav>
                            ) : (
                                <Nav className='ms-auto text-center text-lg-start justify-content-center align-items-center'>
                                    <DarkMode />
                                    <NavDropdown title="Other"
                                        id="basic-nav-dropdown"
                                        className='me-lg-4 navbar_dropdown'
                                    >
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/favorites'}

                                                className={`${activeLink === 'favorites' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('favorites')}
                                            >
                                                Favorites
                                            </Link>
                                        </Nav>
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/reviews'}

                                                className={`${activeLink === 'reviews' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('reviews')}
                                            >
                                                Reviews
                                            </Link>
                                        </Nav>
                                        <Nav className='px-3 mb-2'>
                                            <Link to={'/user/update-password'}

                                                className={`${activeLink === 'updatePassword' ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick('updatePassword')}
                                            >
                                                Update Password
                                            </Link>
                                        </Nav>
                                        {
                                            isLogin ? (
                                                <Nav className='px-3 mb-2'>
                                                    <Link to={'/home'}
                                                        className={`${activeLink === 'logOut' ? 'active' : ''}`}
                                                        onClick={() => {
                                                            handleNavItemClick('logOut')
                                                            handleLoggOut()
                                                        }}
                                                    >
                                                        Log Out
                                                    </Link>
                                                </Nav>

                                            ) : null
                                        }
                                    </NavDropdown>
                                </Nav>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>

    )
}

export default Header
