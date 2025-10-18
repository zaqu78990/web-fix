const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".fade-in,.slide-up,.scale-in").forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.2,
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});

let slides = document.querySelectorAll(".slide");
let index = 0;
function showNextSlide() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}
setInterval(showNextSlide, 5000);

const skills = document.querySelectorAll(".skill");
skills.forEach((skill, i) => {
  const circle = skill.querySelector(".progress-ring__progress");
  const val = skill.querySelector(".skill-value");
  const total = 427;
  const percent = [90, 85, 95][i];
  ScrollTrigger.create({
    trigger: skill,
    start: "top 80%",
    onEnter: () => {
      gsap.to(circle, { strokeDashoffset: total - (total * percent / 100), duration: 2 });
      let count = { n: 0 };
      gsap.to(count, {
        n: percent,
        duration: 2,
        onUpdate: () => (val.textContent = Math.round(count.n) + "%")
      });
    }
  });
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    navLinks.classList.remove('active');
  });
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  
  const form = e.target;
  const userData = {
    username: form.username.value,
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    message: form.message.value
  };
  
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  
  alert("Message sent successfully!");
  form.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const counters = document.querySelectorAll('.counter-value');

  function animateCounter(element, target) {
    const duration = 2500;
    let startTime;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const eased = 1 - Math.pow(1 - percentage, 3);
      element.textContent = Math.floor(eased * target);
      if (percentage < 1) window.requestAnimationFrame(step);
      else element.textContent = target;
    }

    window.requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
});

gsap.utils.toArray(".service-icon").forEach(icon => {
  gsap.fromTo(icon, 
    { opacity: 0, y: 20 }, 
    {
      opacity: 1, 
      y: 0, 
      duration: 1, 
      scrollTrigger: { trigger: icon, start: "top 85%" }
    });
});

gsap.utils.toArray(".service-icon").forEach(icon => {
  gsap.to(icon, {
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: icon,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
