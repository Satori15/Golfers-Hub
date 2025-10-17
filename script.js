/* js/script.js
   Basic scripts: year injection and contact form validation + fake processing
*/
document.addEventListener('DOMContentLoaded', function(){
  // Update year placeholders
  const ids = ['yearIndex','yearSwing','yearClubs','yearCourse','yearContact'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // Accessible result element for contact form
  const contactResult = document.getElementById('contactResult');

  // If contact form exists, we'll handle its submission (client-side only)
  const form = document.getElementById('contactForm');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!validateForm()) return false;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim() || 'Tip submission';
      const message = form.message.value.trim();

      // Fake processing - no server
      if (contactResult){
        contactResult.hidden = false;
        contactResult.style.background = '#f1fdf6';
        contactResult.textContent = `Thanks ${name}! Your submission ("${subject}") has been received. We will review it and contact you at ${email}.`;
      }
      form.reset();
      return false;
    });
  }
});

// Simple validation used by contact form's onsubmit
function validateForm(){
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const agree = document.getElementById('agree');
  if (!name || !email || !message) {
    alert('Form elements not found.');
    return false;
  }
  if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
    alert('Please complete all required fields (name, email, message).');
    return false;
  }
  // basic email pattern
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email.value.trim())){
    alert('Please enter a valid email address.');
    email.focus();
    return false;
  }
  if (agree && !agree.checked){
    alert('Please agree to have your tip reviewed before submitting.');
    agree.focus();
    return false;
  }
  return true;
}
