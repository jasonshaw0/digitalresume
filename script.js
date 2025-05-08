document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.hamburger')
  const nav = document.querySelector('.nav-links')
  ham.addEventListener('click', () => nav.classList.toggle('show'))

  const backBtn = document.getElementById('backToTop')
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 150)
  })
  backBtn.addEventListener('click', () =>
    window.scrollTo({ top: 1, behavior: 'smooth' })
  )

  const observer = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        o.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })
  document.querySelectorAll('.content-section, .card').forEach(el =>
    observer.observe(el)
  )

  new Swiper('.swiper-container', {
    effect: 'coverflow', grabCursor: true, centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: { rotate: 50, depth: 100, modifier: 1, slideShadows: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  })

  const msg = "Hello, I'm Jason!"
  let idx = 0
  const out = document.getElementById('typedText')
  ;(function type() {
    if (idx < msg.length) {
      out.textContent += msg[idx++]
      setTimeout(type, 100)
    }
  })()

  const cvs = document.getElementById('bgCanvas')
  const ctx = cvs.getContext('2d')
  let W, H
  const N = 100
  const particles = []

  function resize() {
    W = cvs.width = innerWidth
    H = cvs.height = innerHeight
  }
  window.addEventListener('resize', resize)
  resize()

  class P {
    constructor() {
      this.x = Math.random() * W
      this.y = Math.random() * H
      this.s = Math.random() + 0.5
      this.vx = Math.random() * 0.4 - 0.2
      this.vy = Math.random() * 0.4 - 0.2
    }
    update() {
      this.x = (this.x + this.vx + W) % W
      this.y = (this.y + this.vy + H) % H
    }
    draw() {
      ctx.fillStyle = `rgba(200,200,200,${this.s / 2})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.s, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  // worker.js
addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})


fetch('https://api64.ipify.org?format=json')
  .then(res => res.json())
  .then(json => {
    document.querySelector('.contact-ip-placeholder').textContent = json.ip
  })
  .catch(() => {
    document.querySelector('.contact-ip-placeholder').textContent = 'unavailable'
  })


  for (let i = 0; i < N; i++) particles.push(new P())

  ;(function loop() {
    ctx.clearRect(0, 0, W, H)
    particles.forEach(p => { p.update(); p.draw() })
    requestAnimationFrame(loop)
  })()
})
