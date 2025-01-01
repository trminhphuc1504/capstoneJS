import { qlspServices } from "../services/qlsp.services.js";

let products = []; // Khai báo biến products ở phạm vi toàn cục
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Khai báo biến cart để lưu trữ các sản phẩm trong giỏ hàng

const renderProducts = (arr) => {
    let htmlContent = "";
    arr.forEach((item) => {
        htmlContent += `
        <div class="card">
            <div class="imgBox">
                <img src="${item.img}" alt="${item.name}" class="mouse">
            </div>

            <div class="contentBox">
                <h3>${item.name}</h3>
                <h2 class="price">${item.price} VNĐ</h2>
                <div class="button-container">
                    <a href="detail.html?id=${item.id}" class="buy">Xem Chi Tiết</a>
                </div>
            </div>
        </div>
        `;
    });
    document.querySelector(".product-container").innerHTML = htmlContent;
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

// Gọi hàm getProducts khi DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    getProducts();
});

// Hàm lọc sản phẩm theo loại
window.filterProductsByType = () => {
    const filterValue = document.getElementById("product-filter").value;
};
