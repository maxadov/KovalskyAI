document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling()
})

function initSmoothScrolling() {
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

  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".section")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
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

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  const backgroundText = document.querySelector(".background-text")
  if (backgroundText) {
    backgroundText.style.transform = `translate(-50%, ${-50 + scrollY * 0.03}%)`
  }
})
