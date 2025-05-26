const API_URL = 'http://localhost:3000/api';

async function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;

  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name }),
      credentials: 'include',
    });

    if (response.ok) {
      alert('Registration successful! Please login.');
      document.getElementById('registerUsername').value = '';
      document.getElementById('registerPassword').value = '';
      document.getElementById('registerName').value = '';
    } else {
      const error = await response.json();
      alert(error.message || 'Registration failed');
    }
  } catch (error) {
    alert('Error during registration');
  }
}

async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (response.ok) {
      alert('Login successful!');
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('logoutSection').style.display = 'block';
      document.getElementById('loginUsername').value = '';
      document.getElementById('loginPassword').value = '';
    } else {
      const error = await response.json();
      alert(error.message || 'Login failed');
    }
  } catch (error) {
    alert('Error during login');
  }
}

async function logout() {
  try {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      alert('Logout successful!');
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('logoutSection').style.display = 'none';
      document.getElementById('productsList').innerHTML = '';
    } else {
      alert('Logout failed');
    }
  } catch (error) {
    alert('Error during logout');
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      credentials: 'include',
    });
    const products = await response.json();
    displayProducts(products, false);
  } catch (error) {
    alert('Error loading products');
  }
}

async function loadPremiumProducts() {
  try {
    const response = await fetch(`${API_URL}/products/premium`, {
      credentials: 'include',
    });
    if (response.ok) {
      const products = await response.json();
      displayProducts(products, true);
    } else {
      alert('Please login to view premium products');
    }
  } catch (error) {
    alert('Error loading premium products');
  }
}

function displayProducts(products, isPremium) {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = products
    .map(
      (product) => `
            <div class="product-card ${isPremium ? 'premium' : ''}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>${product.description}</p>
            </div>
        `,
    )
    .join('');
}
