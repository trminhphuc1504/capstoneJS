let cart = JSON.parse(localStorage.getItem('cart')) || [];

const renderCart = () => {
    let htmlContent = '';
    let totalPrice = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        htmlContent += `
        <tr>
            <td>${item.name}</td>
            <td>
                <button onclick="decreaseQuantity('${item.id}')">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity('${item.id}')">+</button>
            </td>
            <td>${item.price} VND</td>
            <td>${itemTotal} VND</td>
            <td><button onclick="removeFromCart('${item.id}')">Xóa</button></td>
        </tr>
        `;
    });

    document.querySelector('#cart-table tbody').innerHTML = htmlContent;
    document.getElementById('total-price').innerText = totalPrice;
};

window.increaseQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

window.decreaseQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
};

window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});