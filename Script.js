// name=script.js
// Responsive menu, scroll reveal, stat counters, FAQ accordion, and basic form handler

// Mobile Navigation Drawer
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeMenuBtn = document.getElementById('close-menu');
if (menuBtn && mobileNav) {
  menuBtn.onclick = () => mobileNav.classList.remove('hidden');
}
function closeMenu() {
  if (mobileNav) mobileNav.classList.add('hidden');
}
if (closeMenuBtn) closeMenuBtn.onclick = closeMenu;

// Scroll Reveal Animation
// Minimal implementation, uses data-sr attribute on reveal elements
function scrollReveal() {
  const revealEls = document.querySelectorAll('[data-sr]');
  const windowHeight = window.innerHeight;
  for (const el of revealEls) {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100) {
      el.classList.add('animate-fadein', 'opacity-100');
    } else {
      el.classList.remove('animate-fadein', 'opacity-100');
    }
  }
}
window.addEventListener('scroll', scrollReveal);
window.addEventListener('resize', scrollReveal);
document.addEventListener('DOMContentLoaded', () => {
  // Apply fadein animation style
  const style = document.createElement('style');
  style.innerHTML = `
    [data-sr] { opacity: 0; transition: opacity .8s cubic-bezier(.4,0,.2,1);}
    .animate-fadein { opacity: 1 !important;}
  `;
  document.head.appendChild(style);
  scrollReveal();

  // Animated Statistic Counters
  for (const el of document.querySelectorAll('[data-count]')) {
    const target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) continue;
    el.textContent = '0';
    observer.observe(el);
  }

  // FAQ Accordion
  for (const btn of document.querySelectorAll('.faq-toggle')) {
    btn.onclick = () => {
      const panel = btn.parentElement;
      const content = panel.querySelector('.faq-content');
      const arrow = btn.querySelector('.faq-arrow');
      content.classList.toggle('hidden');
      arrow.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    };
  }

  // Contact Form (client only, just demo feedback)
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  if (contactForm && formResponse) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();
      formResponse.textContent = "Thank you! We'll be in touch shortly.";
      contactForm.reset();
      setTimeout(() => formResponse.textContent = '', 7000);
    };
  }
});

// Statistic counter animation when visible
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.5 });

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-count'));
  const duration = 1200;
  let start = 0, startTime = null;
  if (isNaN(target)) return;
  const step = timestamp => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    let value = target * progress;
    if (target > 100) value = Math.floor(value);
    else value = value.toFixed(1);
    el.textContent = `${value}${target > 100 ? '+' : ''}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = `${target}${target > 100 ? '+' : ''}`;
    }
  };
  requestAnimationFrame(step);
}

// Testimonial fader/slider with next/prev & auto-rotate
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll("#testimonial-slider .testimonial-slide");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  let idx = 0, prevIdx = -1, autoSlide;
  if (!slides.length) return;

  function showSlide(newIdx) {
    if (prevIdx >= 0 && slides[prevIdx]) {
      slides[prevIdx].style.opacity = "0";
      slides[prevIdx].classList.add("pointer-events-none");
      slides[prevIdx].style.zIndex = "0";
    }
    slides[newIdx].style.opacity = "1";
    slides[newIdx].classList.remove("pointer-events-none");
    slides[newIdx].style.zIndex = "1";
    prevIdx = newIdx;
  }
  function nextSlide() {
    idx = (idx + 1) % slides.length;
    showSlide(idx);
  }
  function prevSlide() {
    idx = (idx - 1 + slides.length) % slides.length;
    showSlide(idx);
  }
  showSlide(idx);

  // Button navigation
  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => { prevSlide(); resetAuto(); };
    nextBtn.onclick = () => { nextSlide(); resetAuto(); };
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight") { nextSlide(); resetAuto(); }
    if (e.key === "ArrowLeft")  { prevSlide(); resetAuto(); }
  });

  // Auto rotate every 5s, pause/resume on manual interaction
  function startAuto() {
    autoSlide = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    if (autoSlide) clearInterval(autoSlide);
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }
  startAuto();
});
