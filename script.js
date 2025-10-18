// ---- Sign Up & Login ----
const users = JSON.parse(localStorage.getItem('users')) || [];

// Sign Up
const signupForm = document?.getElementById('signup-form');
if(signupForm){
  signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const response = document.getElementById('signup-response');

    if(!fullName || !email || !username || !password){
      response.textContent = "Please fill out all fields.";
      response.style.color = "red";
      return;
    }

    users.push({fullName, email, username, password});
    localStorage.setItem('users', JSON.stringify(users));

    response.textContent = `Welcome, ${username}! Your account has been created.`;
    response.style.color = "green";
    signupForm.reset();
  });
}

// Login
const loginForm = document?.getElementById('login-form');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const response = document.getElementById('login-response');

    const user = users.find(u => u.username === username && u.password === password);
    if(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
      response.textContent = `Welcome back, ${user.username}!`;
      response.style.color = "green";
      loginForm.reset();
    } else {
      response.textContent = "Invalid username or password.";
      response.style.color = "red";
    }
  });
}

// Display Username on Home if Logged In
const welcomeText = document.getElementById('welcome-user');
if(welcomeText){
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(currentUser){
    welcomeText.textContent = `Welcome, ${currentUser.username}!`;
  }
}

// ---- Post System ----
function handlePosts(formId, listId){
  const form = document.getElementById(formId);
  const list = document.getElementById(listId);

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('.post-name').value.trim();
      const content = form.querySelector('.post-text').value.trim();

      if(!name || !content){
        alert("Please fill out all fields.");
        return;
      }

      const post = document.createElement('div');
      post.className = 'post-card';
      post.innerHTML = `<h4>${name}</h4><p>${content}</p><small>${new Date().toLocaleString()}</small>`;
      list.prepend(post);
      form.reset();
    });
  }
}

handlePosts('tips-form', 'tips-list');
handlePosts('clubs-form', 'clubs-list');
handlePosts('course-form', 'course-list');
