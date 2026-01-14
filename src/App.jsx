import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import AppHeader from './components/header';
import AppHero from './components/hero';
import AppAbout from './components/about';
import AppProducts from './components/AppProducts';
import AppSkincare from './components/skincare';
import AppReviews from './components/reviews';
import AppHaircare from './components/haircare';
import AppProductList from './components/productlist';
import AppBlog from './components/blog';
import AppContact from './components/contact';
import AppFooter from './components/footer';

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/productDetails'; 




// مكون الصفحة الرئيسية
function HomePage() {
  return (
    <>
      <AppHero/>
      <AppAbout/>
      <AppProducts/>
      <AppSkincare/>
      <AppReviews/>
      <AppHaircare/>
      <AppProductList/>
      <AppBlog/>
      <AppContact/>
    </>
  );
}

function App() {
  useEffect(() => {
    document.cookie = "data_id=abc123; SameSite=None; Secure";
  }, []);

  return (
    <Router>
      <div className='App'>
        <header id='header'>
          <AppHeader/>
        </header>
        
        <main >
          <Routes>
            {/* ⬇️ الصفحة الرئيسية - أضفتها هنا */}
            <Route path="/" element={<HomePage />} />
            
            {/* ⬇️ صفحة المنتجات المنفصلة (إذا عايزة صفحة خاصة بيها) */}
            <Route path="/products" element={<AppProducts />} />
            
            {/* ⬇️ صفحة تفاصيل المنتج */}
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
        
        <footer id='footer'>
          <AppFooter/>
        </footer>
      </div>
    </Router>
  );
}

export default App;