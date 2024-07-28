function searchProducts() {
    const searchBar = document.getElementById('search-bar');
    const searchTerm = searchBar.value.toLowerCase();
    const offers = document.getElementsByClassName('offer');

    for (let i = 0; i < offers.length; i++) {
        const productName = offers[i].dataset.name.toLowerCase();
        if (productName.includes(searchTerm)) {
            offers[i].style.display = 'block';
        } else {
            offers[i].style.display = 'none';
        }
    }
}

function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' has been added to your cart.');
}
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity || 1;
        quantityInput.min = '1';
        quantityInput.onchange = () => updateQuantity(index, quantityInput.value);
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        const totalCell = document.createElement('td');
        totalCell.textContent = item.price * (item.quantity || 1);
        row.appendChild(totalCell);

        const actionsCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        actionsCell.appendChild(removeButton);
        row.appendChild(actionsCell);

        cartTableBody.appendChild(row);

        total += item.price * (item.quantity || 1);
    });

    document.getElementById('cart-total').textContent = 'Total: GHS ' + total.toFixed(2);
}

function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert('Checkout functionality to be implemented');
}

window.onload = loadCart;
