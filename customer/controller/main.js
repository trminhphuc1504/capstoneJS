import { qlspServices } from '../services/qlsp.services.js';

let products = []; // Khai báo biến products ở phạm vi toàn cục
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Khai báo biến cart để lưu trữ các sản phẩm trong giỏ hàng

const renderProducts = (arr) => {
    let htmlContent = '';
    arr.forEach((item) => {
        htmlContent += `
        <div class="item">
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <p>Giá: ${item.price} VND</p>
            <div class="button-container">
                <button onclick="showDetails('${item.id}')">Xem Chi Tiết</button>
                <button onclick="addToCart('${item.id}')">Thêm vào giỏ hàng</button>
            </div>
        </div>
        `;
    });
    document.querySelector('.product-container').innerHTML = htmlContent;
};

const getProducts = async () => {
    try {
        const result = await qlspServices.getProductList();
        console.log("product: ", result.data);
        products = result.data; // Gán dữ liệu sản phẩm vào biến products
        renderProducts(products);
    } catch (err) {
        console.log("err:", err);
    }
};

window.showDetails = (productId) => {
    const product = products.find(item => item.id === productId);
    if (product) {
        const detailContent = `
            <h2>${product.name}</h2>
            <p>Giá: ${product.price} VND</p>
            <p>Màn hình: ${product.screen}</p>
            <p>Camera sau: ${product.backCamera}</p>
            <p>Camera trước: ${product.frontCamera}</p>
            <img src="${product.img}" alt="${product.name}">
            <p>Mô tả: ${product.desc}</p>
            <p>Loại: ${product.type}</p>
        `;
        const productDetailsElement = document.querySelector('.product-details');
        if (productDetailsElement) {
            productDetailsElement.innerHTML = detailContent;
            productDetailsElement.style.display = 'block';
        } else {
            console.error('Element with class "product-details" not found.');
        }
    }
};

window.addToCart = (productId) => {
    const product = products.find(item => item.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart: ", cart);
        alert(`${product.name} has been added to the cart.`);
    }
};

// Gọi hàm getProducts khi DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    getProducts();
});