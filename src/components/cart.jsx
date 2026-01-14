import React, { useState, useEffect } from 'react';

const AppCart = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 🔧 نجيب السلة من localStorage لما المكون يتحمل
    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('extractCart');
                console.log('📦 localStorage content:', savedCart);
                
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    console.log('✅ Parsed cart:', parsedCart);
                    setCart(parsedCart);
                } else {
                    console.log('🆕 No cart found, starting empty');
                    setCart([]);
                }
            } catch (error) {
                console.error('❌ Error loading cart:', error);
                setCart([]);
            }
        };

        loadCart();
        
        // نسمع لأي تغييرات في localStorage من نافذة أخرى
        window.addEventListener('storage', loadCart);
        
        return () => {
            window.removeEventListener('storage', loadCart);
        };
    }, []);

    // 🔧 نحفظ السلة في localStorage مع كل تغيير
    useEffect(() => {
        console.log('💾 Saving cart to localStorage:', cart);
        localStorage.setItem('extractCart', JSON.stringify(cart));
    }, [cart]);

    // إضافة منتج للسلة
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            let newCart;

            if (existingProduct) {
                newCart = prevCart.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newCart = [...prevCart, {
                    id: product.id,
                    name: product.title,
                    price: 150,
                    quantity: 1,
                    image: product.image
                }];
            }

            console.log('🛒 New cart after addition:', newCart);
            return newCart;
        });
    };

    // نجعل الدوال متاحة للاستخدام الخارجي
    useEffect(() => {
        window.addToCartGlobal = addToCart;
        console.log('🌐 Global functions registered');
    }, []);

    // حذف منتج من السلة
    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(item => item.id !== productId);
            console.log('🗑️ Cart after removal:', newCart);
            return newCart;
        });
    };

    // تحديث الكمية
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prevCart => {
            const newCart = prevCart.map(item =>
                item.id === productId 
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            console.log('📊 Cart after quantity update:', newCart);
            return newCart;
        });
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* زر السلة في ال Navbar */}
            <button 
                className="cart-btn btn btn-outline-primary position-relative"
                onClick={() => setIsCartOpen(true)}
                style={{ border: 'none', background: 'transparent' }}
            >
                🛒 
                {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* نافذة السلة */}
            {isCartOpen && (
                <div className="cart-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1050
                    }}
                >
                    <div className="cart-sidebar"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '400px',
                            height: '100%',
                            backgroundColor: 'white',
                            boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
                            padding: '20px',
                            overflowY: 'auto'
                        }}
                    >
                        <div className="cart-header d-flex justify-content-between align-items-center mb-4">
                            <h3>🛒 سلة التسوق ({totalItems})</h3>
                            <button 
                                className="close-btn btn btn-sm btn-outline-secondary"
                                onClick={() => setIsCartOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* عناصر السلة */}
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="text-center">
                                    <p className="empty-cart text-muted">السلة فارغة</p>
                                    <small className="text-info">جربي تضيفي منتجات من صفحة المنتجات</small>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="cart-item border-bottom pb-3 mb-3">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="item-info flex-grow-1">
                                                <strong>{item.name}</strong>
                                                <p className="mb-1 text-success">{item.price} جنيه</p>
                                                <small className="text-muted">الكمية: {item.quantity}</small>
                                            </div>
                                            <div className="item-controls d-flex align-items-center gap-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 fw-bold">{item.quantity}</span>
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {cart.length > 0 && (
                            <div className="cart-footer border-top pt-3">
                                <p className="total h5 text-center text-primary">الإجمالي: {total} جنيه</p>
                                <button 
                                    className="checkout-btn btn btn-success w-100 mt-3"
                                    onClick={() => {
                                        if (cart.length === 0) {
                                            alert("السلة فارغة!");
                                            return;
                                        }
                                        alert(`طلبك يحتوي على ${totalItems} منتجات\nالإجمالي: ${total} جنيه\nسيتم التواصل معك قريباً!`);
                                    }}
                                >
                                    إتمام الطلب
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AppCart;