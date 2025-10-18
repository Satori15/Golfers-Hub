document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const welcomeMessage = document.getElementById("welcome-message");
  const getStartedBtn = document.getElementById("get-started-btn");
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");

  if (username) {
    if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${username}!`;
    if (getStartedBtn) getStartedBtn.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      window.location.href = "index.html";
    });
  }
});

function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Account created! You can now log in.");
    window.location.href = "login.html";
  } else {
    alert("Please fill in all fields.");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (username === savedUser && password === savedPass) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

