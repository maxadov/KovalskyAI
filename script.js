// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAnimations()
  initSmoothScrolling()
  initBackgroundAnimation()
})

function initAnimations() {
  // Hero section animations
  const heroTl = gsap.timeline()

  heroTl
    .from(".hero-title", {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out",
    })
    .from(
      ".hero-subtitle",
      {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.6",
    )
    .from(
      ".hero-description",
      {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.5",
    )
    .from(
      ".self-hosted-badge",
      {
        duration: 0.6,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.3",
    )

  // Navbar animation
  gsap.from(".navbar", {
    duration: 0.8,
    y: -20,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3,
  })

  // Feature cards animation
  gsap.from(".feature-card", {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".features-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  // Workflow steps animation
  gsap.from(".workflow-step", {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".workflow",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  // Roadmap items animation
  gsap.from(".roadmap-item", {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".roadmap-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })

  // Section titles animation
  gsap.from(".section-title", {
    duration: 0.8,
    y: 20,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-title",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  })

  // Install card animation
  gsap.from(".install-card", {
    duration: 0.8,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".install-card",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  })
}

function initBackgroundAnimation() {
  // Subtle shimmer effect for background text
  gsap.to(".background-text", {
    duration: 5,
    opacity: 0.03,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  })
}



function initSmoothScrolling() {
  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Active nav link highlighting
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Parallax effect for background elements
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  const backgroundText = document.querySelector(".background-text")

  if (backgroundText) {
    backgroundText.style.transform = `translate(-50%, ${-50 + scrollY * 0.03}%)`
  }
})

// Button hover animations
document.querySelectorAll(".try-button, .install-button, .contribute-btn").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    gsap.to(this, {
      duration: 0.2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      ease: "power2.out",
    })
  })

  button.addEventListener("mouseleave", function () {
    gsap.to(this, {
      duration: 0.2,
      backgroundColor: "transparent",
      ease: "power2.out",
    })
  })
})

// Loading animation
window.addEventListener("load", () => {
  gsap.to(".background-text", {
    duration: 1.5,
    opacity: 0.02,
    ease: "power2.inOut",
  })
})
