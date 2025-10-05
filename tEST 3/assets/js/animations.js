// Reveal on scroll and animated counters
(function(){
  'use strict';
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(entry.target.querySelector('.stat')){ /* no-op */ }
      }
    });
  },{threshold:0.15});
  reveals.forEach((el)=>io.observe(el));

  // Animated stats
  const stats = document.querySelectorAll('.stat');
  const inc = (el)=>{
    const target = Number(el.getAttribute('data-count')) || 0;
    const duration = 900;
    const start = performance.now();
    const from = 0;
    const step = (t)=>{
      const p = Math.min(1,(t-start)/duration);
      const val = Math.round(from + (target-from)*p);
      el.textContent = String(val);
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsObserver = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{ if(e.isIntersecting){ inc(e.target); statsObserver.unobserve(e.target);} });
  },{threshold:0.4});
  stats.forEach((s)=>statsObserver.observe(s));
})();


