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

  // Project cards entrance animation on scroll
  gsap.fromTo(".card", 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
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

  // Set up scroll progress indicator
  setupScrollProgress();

  // Set up button functionality
  setupButtonHandlers();

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Setup scroll progress indicator
function setupScrollProgress() {
  const progressFill = document.querySelector('.progress-fill');
  const heroDot = document.querySelector('.hero-dot');
  const projectsDot = document.querySelector('.projects-dot');
  
  // Set initial state
  if (heroDot) {
    heroDot.classList.add('active');
  }
  
  // Listen to scroll events for progress updates
  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    const projectsSection = document.getElementById('projects');
    
    if (heroSection && projectsSection) {
      const heroHeight = heroSection.offsetHeight;
      const projectsTop = projectsSection.offsetTop;
      
      // Calculate progress based on two sections
      let scrollPercent = 0;
      if (scrollTop < heroHeight) {
        // In hero section
        scrollPercent = scrollTop / heroHeight * 0.5; // 0 to 0.5
      } else {
        // In projects section or beyond
        scrollPercent = 0.5 + ((scrollTop - projectsTop) / heroHeight) * 0.5; // 0.5 to 1
        scrollPercent = Math.min(scrollPercent, 1);
      }
      
      // Update progress fill
      if (progressFill) {
        const fillHeight = Math.max(2, scrollPercent * 200);
        progressFill.style.height = `${fillHeight}%`;
      }
      
      // Update dot states based on which section is more visible
      if (scrollTop < heroHeight * 0.5) {
        heroDot?.classList.add('active');
        projectsDot?.classList.remove('active');
      } else {
        heroDot?.classList.remove('active');
        projectsDot?.classList.add('active');
      }
    }
  }
  
  // Update on scroll and during animations
  window.addEventListener('scroll', updateProgress, { passive: true });
  
  // Also update during GSAP scroll animations
  gsap.ticker.add(updateProgress);
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
      duration: 0.6,
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
  const SCROLL_THRESHOLD = 100; // Reduced threshold for more responsive snapping
  const SNAP_DURATION = 400; // Faster snap transition duration
  
  // Prevent default scrolling behavior
  function preventScroll(e) {
    if (isAnimating) {
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
    if (isAnimating) return;
    
    const currentScrollY = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    const projectsSection = document.getElementById('projects');
    
    if (!heroSection || !projectsSection) return;
    
    const heroHeight = heroSection.offsetHeight;
    const projectsTop = projectsSection.offsetTop;
    
    let targetY = currentScrollY;
    
    // Determine which section we're in and where to snap
    if (currentScrollY < heroHeight * 0.5) {
      // In hero section
      if (direction > 0) {
        // Scroll down - snap to projects
        targetY = projectsTop;
      } else {
        // Scroll up - stay in hero (snap to top)
        targetY = 0;
      }
    } else {
      // In projects section or between
      if (direction > 0) {
        // Scroll down - stay in projects (already there)
        targetY = projectsTop;
      } else {
        // Scroll up - snap to hero
        targetY = 0;
      }
    }
    
    // Only animate if we're actually changing position
    if (Math.abs(targetY - currentScrollY) > 50) {
      isAnimating = true;
      
      gsap.to(window, {
        duration: SNAP_DURATION / 1000,
        scrollTo: { y: targetY },
        ease: "power3.out",
        onComplete: () => {
          isAnimating = false;
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
    if (isAnimating) {
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
        // Go to projects
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: projectsSection.offsetTop },
            ease: "power3.out"
          });
        }
        return;
      }
      
      if (direction !== 0) {
        triggerSnap(direction);
      }
    }
  });
}
