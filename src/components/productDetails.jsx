import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import productsData from './productsData';

export default function ProductDetails() {
    const { id } = useParams();
    const product = productsData.find(item => item.id === parseInt(id));

    if (!product) {
        return (
            <Container className="text-center py-5">
                <h2>المنتج غير موجود</h2>
                <Link to="/" className="btn btn-primary">العودة للمنتجات</Link>
            </Container>
        );
    }

    const handleAddToCart = () => {
        console.log('🎯 محاولة إضافة المنتج:', product.title);
        
        // الطريقة الجديدة البسيطة
        if (window.addToCartGlobal) {
            // استخدم الدالة العامة من AppCart
            window.addToCartGlobal({
                id: product.id,
                title: product.title,
                price: product.price || 150,
                image: product.image
            });
            
            // رسالة نجاح
            alert(`تم إضافة ${product.title} إلى السلة! 🛒`);
            
            // تأثير بسيط على زر السلة
            const cartBtn = document.querySelector('.cart-btn');
            if (cartBtn) {
                cartBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartBtn.style.transform = 'scale(1)';
                }, 300);
            }
            
        } else {
            // نسخة احتياطية إذا الدوال العامة مش جاهزة
            console.log('⚠️ الدوال العامة مش جاهزة، استخدام نسخة احتياطية');
            
            try {
                const cartKey = 'shopping_cart_v3'; // نفس المفتاح في AppCart
                const currentCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
                
                const existingIndex = currentCart.findIndex(item => item.id === product.id);
                
                let newCart;
                if (existingIndex >= 0) {
                    // زيادة الكمية
                    newCart = [...currentCart];
                    newCart[existingIndex] = {
                        ...newCart[existingIndex],
                        quantity: newCart[existingIndex].quantity + 1
                    };
                } else {
                    // إضافة جديد
                    newCart = [...currentCart, {
                        id: product.id,
                        name: product.title,
                        price: typeof product.price === 'string' ? 
                              parseInt(product.price.replace(/[^0-9]/g, '')) || 150 : 
                              product.price || 150,
                        quantity: 1,
                        image: product.image
                    }];
                }
                
                localStorage.setItem(cartKey, JSON.stringify(newCart));
                alert(`تم إضافة ${product.title} إلى السلة!`);
                
            } catch (error) {
                console.error('❌ خطأ في الإضافة:', error);
                alert('عذراً، حدث خطأ. حاولي مرة أخرى.');
            }
        }
    };

    const handleBuyNow = () => {
        console.log('🚀 بدء الشراء السريع');
        // أولاً نضيف للسلة
        handleAddToCart();
        // ثم نفتح رابط الشراء
        setTimeout(() => {
            window.open(product.link, '_blank');
        }, 300);
    };

    return (
        <section id="product-details" className='block product-details-block py-5'>
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Link to="/" className="btn btn-outline-secondary">
                        ← العودة للمنتجات
                    </Link>
                </div>
                
                <Row>
                    <Col md={6} className="mb-4">
                        <div className="product-image-wrapper text-center">
                            <img 
                                src={product.image} 
                                alt={product.title} 
                                className="img-fluid rounded shadow"
                                style={{ 
                                    maxHeight: '500px', 
                                    objectFit: 'cover',
                                    width: '100%',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <div className="product-info">
                            <h1 className="product-title mb-3" style={{ color: '#333', fontSize: '2.5rem' }}>
                                {product.title}
                            </h1>
                            
                            <h3 className="product-subtitle text-muted mb-4" style={{ fontSize: '1.5rem' }}>
                                {product.subtitle}
                            </h3>
                            
                            <p className="product-description lead mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                {product.description}
                            </p>
                            
                            <div className="product-price mb-3">
                                <h4 className="text-primary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                    {product.price}
                                </h4>
                            </div>
                            
                            {product.features && product.features.length > 0 && (
                                <div className="product-features mb-4">
                                    <h5 style={{ color: '#555', marginBottom: '1rem' }}>المميزات:</h5>
                                    <ul className="list-unstyled">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="mb-2" style={{ fontSize: '1.1rem' }}>
                                                <span className="text-success me-2">✓</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="product-actions mt-5">
                                <div className="d-flex flex-column flex-md-row gap-3">
                                    <Button
                                        variant="success" 
                                        size="lg"
                                        onClick={handleAddToCart}
                                        className="flex-fill"
                                        style={{ 
                                            padding: '12px 24px',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        🛒 إضافة إلى السلة
                                    </Button>

                                    <Button 
                                        as="a" 
                                        href={product.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        variant="primary" 
                                        size="lg"
                                        onClick={handleBuyNow}
                                        className="flex-fill"
                                        style={{ 
                                            padding: '12px 24px',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        🚀 شراء سريع
                                    </Button>
                                </div>
                                
                                <div className="mt-3 text-center">
                                    <button 
                                        onClick={() => {
                                            console.log('🧪 اختبار الدوال:', {
                                                addToCartGlobal: typeof window.addToCartGlobal,
                                                cartData: JSON.parse(localStorage.getItem('shopping_cart_v3'))
                                            });
                                        }}
                                        className="btn btn-sm btn-outline-info"
                                    >
                                        🧪 اختبار الاتصال
                                    </button>
                                    <br />
                                    <small className="text-muted mt-2 d-block">
                                        ✅ الضمان: إرجاع خلال 14 يوم | 📦 توصيل سريع | 🔒 دفع آمن
                                    </small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* قسم المنتجات ذات الصلة */}
                <Row className="mt-5">
                    <Col>
                        <h3 className="text-center mb-4">منتجات قد تعجبك</h3>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            {productsData
                                .filter(p => p.id !== product.id)
                                .slice(0, 3)
                                .map(relatedProduct => (
                                    <Link 
                                        key={relatedProduct.id}
                                        to={`/product/${relatedProduct.id}`}
                                        className="text-decoration-none"
                                        style={{ transition: 'transform 0.3s' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div className="card" style={{ 
                                            width: '200px',
                                            border: 'none',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                        }}>
                                            <img 
                                                src={relatedProduct.image} 
                                                alt={relatedProduct.title}
                                                className="card-img-top"
                                                style={{ 
                                                    height: '150px', 
                                                    objectFit: 'cover',
                                                    borderRadius: '8px 8px 0 0'
                                                }}
                                            />
                                            <div className="card-body text-center">
                                                <h6 className="card-title" style={{ height: '40px', overflow: 'hidden' }}>
                                                    {relatedProduct.title}
                                                </h6>
                                                <p className="text-primary fw-bold">{relatedProduct.price}</p>
                                                <Button 
                                                    variant="outline-success" 
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        // استخدم نفس handleAddToCart مع المنتج المرتبط
                                                        if (window.addToCartGlobal) {
                                                            window.addToCartGlobal({
                                                                id: relatedProduct.id,
                                                                title: relatedProduct.title,
                                                                price: relatedProduct.price || 150,
                                                                image: relatedProduct.image
                                                            });
                                                            alert(`تم إضافة ${relatedProduct.title} إلى السلة!`);
                                                        } else {
                                                            handleAddToCart(relatedProduct);
                                                        }
                                                    }}
                                                >
                                                    إضافة للسلة
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
