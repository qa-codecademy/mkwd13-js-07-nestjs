//CONSTANTS
const API_URL = "http://localhost:3000/api";

//SELECTORS
const loginViewEl = document.querySelector(".login-view");
const productsViewEl = document.querySelector(".products-view");
const userControlsEl = document.querySelector(".user-controls");
const logoutBtn = document.querySelector("#logoutBtn");

productsViewEl.style.display = "none";
userControlsEl.style.visibility = "hidden";

const loginFormEl = document.querySelector("#loginForm");
const emailInputEl = document.querySelector("#email");
const passwordInputEl = document.querySelector("#password");

const productsBtn = document.querySelector("#productsBtn");
const productsListEl = document.querySelector(".products-list");

//GLOBAL VARIABLES
let user = null;
let accessToken = "";
let refreshToken = "";

//FUNCTIONS
const loginUser = async (email, password) => {
  console.log(email, password);

  const credentialsJSON = JSON.stringify({ email, password });

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentialsJSON,
  });

  const userData = await response.json();

  if (!userData) return;

  user = userData;
  accessToken = response.headers.get("access-token");
  refreshToken = response.headers.get("refresh-token");

  //Here we are certain that the user is logged in and we can update the view
  productsViewEl.style.display = "block";
  loginViewEl.style.display = "none";
  userControlsEl.style.visibility = "initial";

  userControlsEl.querySelector(
    ".user-display"
  ).innerText = `${user.firstName} ${user.lastName}`;

  saveUserInLocalStorage(user, accessToken, refreshToken);
};

const saveUserInLocalStorage = (user, accessToken, refreshToken) => {
  const userJSONData = JSON.stringify({
    user,
    accessToken,
    refreshToken,
  });

  window.localStorage.setItem("userData", userJSONData);
};

const autoLoginUser = () => {
  const userJSON = window.localStorage.getItem("userData");

  if (!userJSON) return;

  const userData = JSON.parse(userJSON);

  user = userData.user;
  accessToken = userData.accessToken;
  refreshToken = userData.refreshToken;

  //Here we are certain that the user is logged in and we can update the view
  productsViewEl.style.display = "block";
  loginViewEl.style.display = "none";
  userControlsEl.style.visibility = "initial";
};

const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  //1. if status is 403 we try to refresh token
  if (response.status === 403) {
    //Here we do the refresh token logic
    const refreshTokenRes = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "refresh-token": refreshToken,
      },
    });

    console.log(refreshTokenRes);

    //2. if refresh token returns status 403 we return and logout user.
    if (refreshTokenRes.status === 403) {
      return;
    }

    accessToken = refreshTokenRes.headers.get("access-token");

    //3. if refresh token is successful attempt to fetch products again
    fetchProducts();
    return;
  }

  const products = await response.json();

  productsListEl.innerHTML = products
    .map(product => `<li class="product-item">${product.title}</li>`)
    .join("");

  console.log("THESE ARE THE PRODUCTS", products);
};
const logoutUser = async () => {
  const logoutResponse = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "refresh-token": refreshToken,
    },
  });

  console.log(logoutResponse);

  //Reset data and delete storage
  window.localStorage.clear();
  refreshToken = "";
  accessToken = "";
  userData = null;

  loginViewEl.style.display = "block";
  userControlsEl.style.visibility = "hidden";
  productsViewEl.style.display = "none";
};

//LISTENERS
loginFormEl.addEventListener("submit", e => {
  e.preventDefault();

  loginUser(emailInputEl.value, passwordInputEl.value);
});

productsBtn.addEventListener("click", () => {
  fetchProducts();
});

logoutBtn.addEventListener("click", () => {
  logoutUser();
});

//GLOBAL FUNCTION CALLS
autoLoginUser();
