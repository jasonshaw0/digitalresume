document.addEventListener("DOMContentLoaded", () => {
  // Remove no-js class and add js class for fallback styling
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Simple, fast animations that definitely work
  
  // Logo entrance animation
  gsap.fromTo(".logo-container", 
    { opacity: 0, scale: 0.5, y: -10 },
    { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(0.2)", delay: 0.1 }
  );

  // Continuous subtle pulse animation for JS text
  gsap.to(".js-text", {
    opacity: 0.7,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });

  // Hero cards - quick entrance
  gsap.fromTo(".main-card", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.1, ease: "power2.out", delay: 0.3 }
  );

  gsap.fromTo(".about-card", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.1, ease: "power2.out", delay: 0.5 }
  );

  gsap.fromTo(".contact-card", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.1, ease: "power2.out", delay: 0.7 }
  );

  // Ensure about-section elements are visible on initial load (no hidden state)
  document.querySelectorAll('.about-paragraph, .stack-card, .chips .chip, .experience').forEach(el => {
    el.style.opacity = '1';
  });

  // Logo hover effect
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("mouseenter", () => {
      gsap.to(logoContainer, {
        scale: 1.1,
        rotation: 5,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(".js-text .j", {
        scale: 1.1,
        color: "#ffffff",
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(".js-text .s", {
        scale: 1.1,
        color: "#ffffff",
        duration: 0.2,
        ease: "power2.out"
      });
    });

    logoContainer.addEventListener("mouseleave", () => {
      gsap.to(logoContainer, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(".js-text .j", {
        scale: 1,
        color: "#ffffff",
        duration: 0.2,
        ease: "power2.out"
      });
      gsap.to(".js-text .s", {
        scale: 1,
        color: "var(--accent-primary)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Card hover effects
  document.querySelectorAll(".hero-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Button hover effects (excluding contact button)
  document.querySelectorAll(".btn:not(.contact-btn)").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        y: -2,
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  });

  // Special hover effect for contact button
  const contactBtn = document.querySelector(".contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("mouseenter", () => {
      gsap.to(contactBtn, {
        y: -1,
        scale: 1.01,
        duration: 0.2,
        ease: "power2.out"
      });
    });

    contactBtn.addEventListener("mouseleave", () => {
      gsap.to(contactBtn, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Project cards entrance animation on scroll (scoped to projects only)
  gsap.fromTo(".project-grid .card", 
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power1.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".project-grid",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Projects title animation on scroll
  ScrollTrigger.create({
    trigger: "#projects",
    start: "top 80%",
    onEnter: () => showProjectsTitle(),
  });

  // Set up discrete snap-only scrolling
  setupDiscreteScrolling();

  // Set up sidebar navigation + active states
  setupSidebarNav();

  // Set up button functionality
  setupButtonHandlers();

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Sidebar navigation and active-state logic for 3 sections
function setupSidebarNav() {
  const buttons = Array.from(document.querySelectorAll('.side-dot'));
  if (!buttons.length) return;

  // Click navigation (disable CSS snap during programmatic scroll to avoid bounce)
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target');
      const el = target ? document.querySelector(target) : null;
      if (!el) return;
      const rootEl = document.documentElement;
      const prevSnap = rootEl.style.scrollSnapType;
      rootEl.style.scrollSnapType = 'none';
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: el.offsetTop, autoKill: false },
        ease: 'power2.out',
        onComplete: () => {
          // Restore CSS snap after JS animation completes
          rootEl.style.scrollSnapType = prevSnap || '';
        }
      });
    });
  });

  // Intersection observer to mark active button
  const map = {
    '#home': buttons.find(b => b.getAttribute('data-target') === '#home'),
    '#about': buttons.find(b => b.getAttribute('data-target') === '#about'),
    '#projects': buttons.find(b => b.getAttribute('data-target') === '#projects'),
    '#contact': buttons.find(b => b.getAttribute('data-target') === '#contact')
  };

  const order = ['#home', '#about', '#projects', '#contact'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        // active state highlight
        buttons.forEach(b => b.classList.remove('active'));
        map[id]?.classList.add('active');

        // single-indicator fill: only the current section
        buttons.forEach(b => b.classList.remove('filled'));
        map[id]?.classList.add('filled');
      }
    });
  }, { threshold: 0.6 });

  ['home','about','projects','contact'].forEach(id => {
    const s = document.getElementById(id);
    if (s) observer.observe(s);
  });

  // No vertical line fill; icons alone indicate the active section
}

// Set up button handlers
function setupButtonHandlers() {
  // Logo click handler
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) {
    logoContainer.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
    });
  }

  // View Projects button handler
  const viewProjectsBtn = document.querySelector('.btn-secondary');
  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showProjectsTitle();
      scrollToProjects();
    });
  }

  // Allow the contact form to submit normally to Formspree without JS interception
}

// Show projects title
function showProjectsTitle() {
  const projectsTitle = document.getElementById('projects-title');
  if (projectsTitle) {
    projectsTitle.classList.remove('projects-title-hidden');
    projectsTitle.classList.add('projects-title-visible');
  }
}

// Scroll to top function for logo click
function scrollToTop() {
  gsap.to(window, {
    duration: 0.6,
    scrollTo: { y: 0 },
    ease: "power3.out"
  });
}

// Scroll to projects function for View Projects button
function scrollToProjects() {
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    gsap.to(window, {
      duration: 0.4,
      scrollTo: { y: projectsSection.offsetTop },
      ease: "power3.out"
    });
  }
}

// Discrete snap-only scrolling - no variable scrolling allowed
function setupDiscreteScrolling() {
  // Disable custom snap logic on small screens to keep scrolling smooth
  if (window.matchMedia('(max-width: 768px)').matches) {
    return;
  }
  let isAnimating = false;
  let scrollDirection = 0;
  let scrollAccumulator = 0;
  const SCROLL_THRESHOLD = 110; // slightly higher to avoid boundary jitter
  const SNAP_DURATION = 320; // smooth snap duration
  const SNAP_COOLDOWN_MS = 800; // prevent immediate re-snap
  let lastSnapTime = 0;
  
  // Prevent default scrolling behavior
  function preventScroll(e) {
    const now = Date.now();
    if (isAnimating || (now - lastSnapTime) < SNAP_COOLDOWN_MS) {
      e.preventDefault();
      return false;
    }
    
    // Accumulate scroll delta
    scrollAccumulator += Math.abs(e.deltaY);
    scrollDirection = e.deltaY > 0 ? 1 : -1;
    
    // Prevent actual scrolling
    e.preventDefault();
    
    // Check if we've accumulated enough scroll to trigger snap
    if (scrollAccumulator >= SCROLL_THRESHOLD) {
      scrollAccumulator = 0;
      triggerSnap(scrollDirection);
    }
    
    return false;
  }
  
  function triggerSnap(direction) {
    const now = Date.now();
    if (isAnimating || (now - lastSnapTime) < SNAP_COOLDOWN_MS) return;
    
    const currentScrollY = window.pageYOffset;
    const home = document.getElementById('home');
    const about = document.getElementById('about');
    const projects = document.getElementById('projects');
    const contact = document.getElementById('contact');
    if (!home || !about || !projects || !contact) return;

    const sections = [home, about, projects, contact];
    const tops = sections.map(s => s.offsetTop);
    const centers = sections.map(s => s.offsetTop + (s.offsetHeight / 2));

    // Use viewport center to avoid asymmetric margins when snapping from different directions
    const viewportCenterY = currentScrollY + (window.innerHeight / 2);
    let idx = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(viewportCenterY - centers[i]) < Math.abs(viewportCenterY - centers[idx])) {
        idx = i;
      }
    }

    // Determine target index based on direction
    const nextIdx = direction > 0 ? Math.min(idx + 1, tops.length - 1) : Math.max(idx - 1, 0);
    const targetY = tops[nextIdx];
    
    // Only animate if we're actually changing position
    if (Math.abs(targetY - currentScrollY) > 50) {
      isAnimating = true;
      
      // Temporarily disable native CSS scroll-snap to avoid bounce during JS animation
      const rootEl = document.documentElement;
      const prevSnap = rootEl.style.scrollSnapType;
      rootEl.style.scrollSnapType = 'none';

      gsap.to(window, {
        duration: SNAP_DURATION / 2000,
        scrollTo: { y: targetY },
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
          lastSnapTime = Date.now();
          // Restore scroll-snap after animation
          rootEl.style.scrollSnapType = '';
        }
      });
    }
  }
  
  // Add wheel event listener to prevent default scrolling
  window.addEventListener('wheel', preventScroll, { passive: false });
  
  // Prevent touch scrolling on mobile
  let touchStartY = 0;
  let touchAccumulator = 0;
  const TOUCH_THRESHOLD = 30; // Lower threshold for touch
  
  window.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (isAnimating || (now - lastSnapTime) < SNAP_COOLDOWN_MS) {
      e.preventDefault();
      return;
    }
    touchStartY = e.touches[0].clientY;
    touchAccumulator = 0;
  }, { passive: false });
  
  window.addEventListener('touchmove', (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    touchAccumulator += Math.abs(deltaY);
    
    e.preventDefault();
    
    if (touchAccumulator >= TOUCH_THRESHOLD) {
      touchAccumulator = 0;
      const direction = deltaY > 0 ? 1 : -1;
      triggerSnap(direction);
    }
  }, { passive: false });
  
  // Prevent keyboard scrolling
  window.addEventListener('keydown', (e) => {
    if (isAnimating) {
      e.preventDefault();
      return;
    }
    
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];
    
    if (scrollKeys.includes(e.key)) {
      e.preventDefault();
      
      let direction = 0;
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.key)) {
        direction = 1;
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        direction = -1;
      } else if (e.key === 'Home') {
        // Go to hero
        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: 0 },
          ease: "power3.out"
        });
        return;
      } else if (e.key === 'End') {
        // Go to contact (last section)
        const el = document.getElementById('contact');
        if (el) {
          gsap.to(window, { duration: 0.6, scrollTo: { y: el.offsetTop }, ease: "power3.out" });
        }
        return;
      }
      
      if (direction !== 0) {
        triggerSnap(direction);
      }
    }
  });
}
