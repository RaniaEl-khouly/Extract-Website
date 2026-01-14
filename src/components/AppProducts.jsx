import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productsData from './productsData';

export default function AppProducts() {
    const [activePage, setActivePage] = useState(1);
    const productsPerPage = 6;
    const totalPages = Math.ceil(productsData.length / productsPerPage);

    // حساب المنتجات المعروضة حسب الصفحة
    const startIndex = (activePage - 1) * productsPerPage;
    const currentProducts = productsData.slice(startIndex, startIndex + productsPerPage);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item 
                key={number} 
                active={number === activePage}
                onClick={() => setActivePage(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <section id="products" className='block products-block'> 
            <Container fluid>
                <div className='title-holder'>
                    <h2>منتجاتنا</h2>
                    <div className='subtitle'>اختر من بين أجود المنتجات</div>
                </div>
                
                <Row className='productlist'>
                    {currentProducts.map(product => (
                        <Col sm={6} md={4} key={product.id}>
                            <div className='products-wrapper'>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} alt={product.title} />
                                    <div className='label text-center'>
                                        <h3>{product.title}</h3>
                                        <p>{product.subtitle}</p>
                                        <span className='price'>{product.price}</span>
                                    </div>      
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
                
                {totalPages > 1 && (
                    <div className='pagination-wrapper'>
                        <Pagination>{items}</Pagination>
                    </div>
                )}
            </Container>
        </section>
    );
}