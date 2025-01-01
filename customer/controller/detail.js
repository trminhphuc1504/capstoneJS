import { qlspServices } from '../services/qlsp.services.js';

let products = []; // Khai báo biến products ở phạm vi toàn cục

const getProductDetails = async (productId) => {
    try {
        const result = await qlspServices.getProductList();
        products = result.data; // Gán dữ liệu sản phẩm vào biến products
        const product = products.find(item => item.id === productId);
        if (product) {
            const detailContent = `
                <div class="card">
                    <div class="imgBox">
                        <img src="${product.img}" alt="${product.name}" class="mouse">
                    </div>
                    <div class="contentBox">
                        <h3>${product.name}</h3>
                        <h2 class="price">${product.price} VNĐ</h2>
                        <button onclick="addToCart('${product.id}')" class="buy">Thêm vào giỏ hàng</button>
                    </div>
                </div>
                <div class="description">
                    <p style="color:white"><strong>Màn hình:</strong> ${product.screen}</p>
                    <p style="color:white"><strong>Camera sau:</strong> ${product.backCamera}</p>
                    <p style="color:white"><strong>Camera trước:</strong> ${product.frontCamera}</p>
                    <p style="color:white"><strong>Loại:</strong> ${product.type}</p>
                    <p style="color:white"><strong>Mô tả:</strong> ${product.desc}</p>
                </div>
            `;
            document.getElementById('product-details').innerHTML = detailContent;
        } else {
            console.error('Product not found.');
        }
    } catch (err) {
        console.log("err:", err);
    }
};

window.addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
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

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Gọi hàm getProductDetails khi DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (productId) {
        getProductDetails(productId);
    }
});