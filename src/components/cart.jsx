import React, { useState, useEffect } from 'react';

const AppCart = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    
    // مفتاح التخزين (غير extractCart عشان نتجنب main.jsx)
    const STORAGE_KEY = 'shopping_cart_v3';
    
    // 🔧 تحميل السلة - استخدم try/catch بسيط
    useEffect(() => {
        if (hasLoaded) return;
        
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            console.log('📥 محاولة تحميل:', saved ? 'يوجد بيانات' : 'لا يوجد');
            
            if (saved && saved !== '[]' && saved !== 'null') {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    // تأكد من صحة البيانات
                    const validCart = parsed.filter(item => 
                        item && item.id && item.name && item.price
                    );
                    
                    if (validCart.length > 0) {
                        setCart(validCart);
                        console.log('✅ تم تحميل السلة:', validCart.length, 'منتج');
                    }
                }
            }
        } catch (err) {
            console.log('⚠️ خطأ في التحميل، بدء جديد');
        } finally {
            setHasLoaded(true);
        }
    }, [hasLoaded]);
    
    // 🔧 حفظ السلة - بدون removeItem أبداً
    useEffect(() => {
        if (!hasLoaded) return;
        
        console.log('💾 حالة الحفظ:', cart.length > 0 ? 'يوجد منتجات' : 'فارغة');
        
        try {
            // دايماً استخدم setItem فقط
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            
            // للسلة الفارغة، احفظ أيضاً في sessionStorage
            if (cart.length === 0) {
                sessionStorage.setItem(STORAGE_KEY + '_empty', 'true');
            } else {
                sessionStorage.removeItem(STORAGE_KEY + '_empty');
            }
        } catch (err) {
            // تجاهل الأخطاء
            console.log('⚠️ تجاهل خطأ الحفظ');
        }
    }, [cart, hasLoaded]);
    
    // 🛒 إضافة منتج للسلة
    const addToCart = (product) => {
        if (!product?.id) return;
        
        setCart(prev => {
            // معالجة المنتج
            const fixedProduct = {
                id: product.id,
                name: product.name || product.title || 'منتج',
                price: typeof product.price === 'number' ? product.price : 
                      parseInt(product.price) || 150,
                quantity: 1,
                image: product.image || ''
            };
            
            // البحث عن المنتج الموجود
            const existingIndex = prev.findIndex(item => item.id === fixedProduct.id);
            
            if (existingIndex >= 0) {
                // زيادة الكمية
                const newCart = [...prev];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + 1
                };
                return newCart;
            }
            
            // إضافة جديد
            return [...prev, fixedProduct];
        });
    };
    
    // 🌐 تعريف دالة الإضافة للاستخدام الخارجي
    useEffect(() => {
        if (!hasLoaded) return;
        
        window.addToCartGlobal = (product) => {
            console.log('🛍️ إضافة من خارجي:', product?.name || product?.title);
            addToCart(product);
        };
        
        return () => {
            delete window.addToCartGlobal;
        };
    }, [addToCart, hasLoaded]);
    
    // 🗑️ حذف منتج
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };
    
    // 📊 تحديث الكمية
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        setCart(prev => 
            prev.map(item => 
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };
    
    // 🔼 زيادة الكمية
    const increaseQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (item) updateQuantity(productId, item.quantity + 1);
    };
    
    // 🔽 تقليل الكمية
    const decreaseQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (item?.quantity > 1) {
            updateQuantity(productId, item.quantity - 1);
        } else {
            removeFromCart(productId);
        }
    };
    
    // 🧮 الحسابات
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // مسح السلة
    const clearCart = () => {
        if (cart.length === 0 || window.confirm('هل تريد مسح السلة بالكامل؟')) {
            setCart([]);
        }
    };
    
    // 🎨 واجهة بسيطة ومضمونة
    return (
        <>
            {/* زر السلة */}
            <button 
                onClick={() => setIsCartOpen(true)}
                style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '8px'
                }}
            >
                🛒
                {totalItems > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        background: '#dc3545',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {totalItems}
                    </span>
                )}
            </button>
            
            {/* نافذة السلة */}
            {isCartOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1000
                    }}
                    onClick={() => setIsCartOpen(false)}
                >
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '350px',
                            height: '100%',
                            background: 'white',
                            padding: '20px',
                            overflowY: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* الرأس */}
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h5 style={{ margin: 0 }}>🛒 سلة التسوق ({totalItems})</h5>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* المحتوى */}
                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <p>السلة فارغة</p>
                            </div>
                        ) : (
                            <>
                                {/* المنتجات */}
                                {cart.map(item => (
                                    <div 
                                        key={item.id}
                                        style={{
                                            padding: '10px',
                                            borderBottom: '1px solid #eee',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                                <div style={{ color: '#28a745' }}>{item.price} ج.م</div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    color: '#dc3545',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: '10px'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <button 
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        border: '1px solid #ddd',
                                                        background: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => increaseQuantity(item.id)}
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        borderRadius: '50%',
                                                        border: '1px solid #ddd',
                                                        background: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div style={{ fontWeight: 'bold' }}>
                                                {item.price * item.quantity} ج.م
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* الإجمالي */}
                                <div style={{ 
                                    borderTop: '2px solid #eee',
                                    paddingTop: '15px',
                                    marginTop: '20px'
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: '15px',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem'
                                    }}>
                                        <span>الإجمالي:</span>
                                        <span style={{ color: '#28a745' }}>
                                            {total} ج.م
                                        </span>
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            if (cart.length === 0) {
                                                alert('السلة فارغة!');
                                                return;
                                            }
                                            alert(`✅ تم تأكيد الطلب!\nالإجمالي: ${total} ج.م`);
                                            setIsCartOpen(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        إتمام الشراء
                                    </button>
                                    
                                    <button 
                                        onClick={clearCart}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            background: 'white',
                                            color: '#dc3545',
                                            border: '1px solid #dc3545',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        مسح السلة
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AppCart;