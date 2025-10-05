// Main interactions, accessibility helpers, and form validation
(function(){
  'use strict';

  // Current year in footers
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Contact form validation
  function validateEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
  }
  function setStatus(msg, ok){
    const s = document.getElementById('formStatus');
    if(!s) return;
    s.textContent = msg;
    s.className = ok ? 'text-success' : 'text-danger';
  }
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = /** @type {HTMLInputElement} */(document.getElementById('name'));
      const email = /** @type {HTMLInputElement} */(document.getElementById('email'));
      const message = /** @type {HTMLTextAreaElement} */(document.getElementById('message'));
      const consent = /** @type {HTMLInputElement} */(document.getElementById('consent'));

      let valid = true;
      if(!name || name.value.trim().length < 2){ valid = false; name?.focus(); }
      else if(!email || !validateEmail(email.value)){ valid = false; email?.focus(); }
      else if(!message || message.value.trim().length < 10){ valid = false; message?.focus(); }
      else if(!consent || !consent.checked){ valid = false; consent?.focus(); }

      if(!valid){ setStatus('Veuillez compléter correctement le formulaire.', false); return; }

      setStatus('Envoi en cours…', true);
      // Demo: simulate request
      setTimeout(function(){
        form.reset();
        setStatus('Merci, votre message a été envoyé.', true);
      }, 600);
    });
  }
})();


