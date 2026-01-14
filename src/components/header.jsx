import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Appcart from './cart';

export default function AppHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    
    // دالة للانتقال للقسم مع التعامل مع React Router
    const handleSectionClick = (sectionId) => {
        if (location.pathname !== '/') {
            // إذا مش في الصفحة الرئيسية، اروحي لها أول
            navigate('/');
             // انتظري شوية علشان الصفحة تتحمل ثم اعملي scroll
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        } else {
            // إذا في الصفحة الرئيسية، اعملي scroll مباشرة
            scrollToSection(sectionId);
        }
    };

    // دالة الـ scroll
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return(
        <Navbar expand="lg"  fixed="top">
            <Container>
                {/* ⬇️ اللوجو المعدل */}
                <Navbar.Brand 
                    as={Link} 
                    to="/" 
                    className="d-flex align-items-center text-decoration-none"
                    style={{ gap: '10px' }}
                >
                    <img 
                        src={logo} 
                        alt="Extract Logo" 
                        style={{ 
                            width: '50px', 
                            height: '50px',
                            display: 'block'
                        }} 
                    />
                    <span 
                        className="text-dark fw-bold" 
                        style={{ fontSize: '1.5rem' }}
                    >
                        EXTRACT
                    </span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-item me-auto">
                        {/* الأقسام */}
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('home')}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('about')}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('products')}
                        >
                            Products
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('skincare')}
                        >
                            Skin Care
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('reviews')}
                        >
                            Reviews
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('haircare')}
                        >
                            Hair Care
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('productlist')}
                        >
                            Best Seller
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('blog')}
                        >
                            Blog
                        </Nav.Link>
                        <Nav.Link 
                            as="button" 
                            className="nav-link-btn"
                            onClick={() => handleSectionClick('contact')}
                        >
                            Contact
                        </Nav.Link>
                        

                      
                        
                        {/* السلة */}
                        <Appcart />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}