const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Transparente ↔ Solide
  if (currentScroll <= 50) {
    navbar.classList.add("transparent");
    navbar.classList.remove("solid");
  } else {
    navbar.classList.add("solid");
    navbar.classList.remove("transparent");
  }

  // Animation de disparition / réapparition
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.top = "-80px";
  } else {
    navbar.style.top = "0";
  }

  lastScroll = currentScroll;
});

// Activation du lien actif selon la section visible
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// ===== Défilement automatique des témoignages =====
const testimonialContainer = document.querySelector('.testimonial-container');

if (testimonialContainer) {
  let scrollPosition = 0;
  setInterval(() => {
    scrollPosition += 350;
    if (scrollPosition >= testimonialContainer.scrollWidth - testimonialContainer.clientWidth) {
      scrollPosition = 0;
    }
    testimonialContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, 4000);
}

// ===== MENU HAMBURGER =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links"); // 🔁 renommé ici

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("show");
    });
  });
}
