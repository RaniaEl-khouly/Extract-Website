import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/*
// 🔍 كود تتبع localStorage - ضعيه هنا في البداية
console.log('🔍 بدء تتبع localStorage...');

// 1. تتبعي أي مسح لـ localStorage
const originalClear = localStorage.clear;
localStorage.clear = function() {
    console.trace('❌ تم مسح localStorage بالكامل! من هنا:');
    console.log('🚨 Stack trace:', new Error().stack);
    return originalClear.apply(this, arguments);
};

const originalRemove = localStorage.removeItem;
localStorage.removeItem = function(key) {
    if (key === 'extractCart' || key.includes('cart')) {
        console.trace(`❌ تم حذف ${key} من localStorage!`);
        console.log('🚨 Stack trace:', new Error().stack);
    }
    return originalRemove.apply(this, arguments);
};

// 2. احفظي بيانات تجريبية ومتابعتها
localStorage.setItem('testCart', JSON.stringify([{id: 1, name: 'Test'}]));
console.log('✅ تم حفظ testCart في localStorage');

// 3. تحقق كل 2 ثانية
const storageMonitor = setInterval(() => {
    const cart = localStorage.getItem('extractCart');
    const test = localStorage.getItem('testCart');
    const timestamp = new Date().toLocaleTimeString();
    
    console.log(`🕒 ${timestamp} - حالة التخزين:`, {
        extractCart: cart ? `🔥 ${JSON.parse(cart).length} منتجات` : '❌ فارغة',
        testCart: test ? '✅ موجود' : '❌ ممسوحة',
        allKeys: Object.keys(localStorage)
    });
    
    // إذا testCart اتمسحت، نعيد حفظها
    if (!test) {
        console.warn('⚠️ testCart اتمسحت! نعيد حفظها...');
        localStorage.setItem('testCart', JSON.stringify([{id: 1, name: 'Test_Recovered'}]));
    }
}, 2000);

// 4. نسمع لأي تغييرات في localStorage
window.addEventListener('storage', (e) => {
    console.log('📢 حدث تغيير في localStorage:', {
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue,
        url: e.url
    });
});

console.log('🎯 تتبع localStorage مفعل');

// نوقف المونيتور لما نفتح الـ console (اختياري)
if (typeof window !== 'undefined') {
    window.stopStorageMonitor = () => clearInterval(storageMonitor);
}
*/


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


