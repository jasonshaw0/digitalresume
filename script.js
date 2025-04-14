document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 100;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const greyTones = ['0, 117, 176', '0, 95, 143', '0, 156, 235'];
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = Math.random() * 0.25 - 0.125;
      this.speedY = Math.random() * 0.25 - 0.125;
      this.color = greyTones[Math.floor(Math.random() * greyTones.length)];
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      const twinkle = 0.8 + (Math.sin(Date.now() / 1000 + this.phase) + 1) / 8;
      ctx.fillStyle = `rgba(${this.color}, ${twinkle.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(${this.color}, ${(twinkle / 2).toFixed(2)})`;
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }
  }
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
  const sections = document.querySelectorAll('.content-section');
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message!');
    this.reset();
  });
  const fullText = "Hello, I'm Jason Shaw";
  const typedTextEl = document.getElementById('typedText');
  let index = 0;
  typedTextEl.textContent = "";
  setTimeout(() => {
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        typedTextEl.textContent += fullText.charAt(index);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }, 1500);
});
