const portfolioData = {
    skills: [
        { name: "HTML", category: "frontend", icon: "fab fa-html5", level: 100, color: "#e34f26", emoji: "🌐" },
        { name: "CSS", category: "frontend", icon: "fab fa-css3-alt", level: 80, color: "#1572b6", emoji: "🎨" },
        { name: "JavaScript", category: "frontend", icon: "fab fa-js-square", level: 85, color: "#f7df1e", emoji: "📜" },
        { name: "React", category: "frontend", icon: "fab fa-react", level: 80, color: "#61dafb", emoji: "⚛️" },
        { name: "Tailwind CSS", category: "frontend", icon: "fas fa-paint-brush", level: 80, color: "#06b6d4", emoji: "🌬️" },
        { name: "Node.js", category: "backend", icon: "fab fa-node-js", level: 80, color: "#339933", emoji: "🟢" },
        { name: "Python", category: "backend", icon: "fab fa-python", level: 80, color: "#3776ab", emoji: "🐍" },
        { name: "MySQL", category: "backend", icon: "fas fa-database", level: 80, color: "#4479a1", emoji: "🐬" },
        { name: "PHP", category: "backend", icon: "fab fa-php", level: 80, color: "#777bb4", emoji: "🐘" },
        { name: "Git", category: "tools", icon: "fab fa-git-alt", level: 80, color: "#f05032", emoji: "🔄" },
        { name: "GitHub", category: "tools", icon: "fab fa-github", level: 80, color: "#181717", emoji: "🐙" },
        { name: "VS Code", category: "tools", icon: "fas fa-code", level: 100, color: "#007acc", emoji: "📝" },
        { name: "Figma", category: "tools", icon: "fab fa-figma", level: 80, color: "#f24e1e", emoji: "🎨" },
        { name: "React Native", category: "mobile", icon: "fab fa-react", level: 80, color: "#61dafb", emoji: "📱" },
        { name: "Flutter", category: "mobile", icon: "fas fa-mobile-alt", level: 80, color: "#0375d1", emoji: "🚀" }
    ],
  projects: [
    {
      id: 1,
      title: "GESTION DE STOCK",
      description:
        "Une application complète de gestion de stock permettant de suivre les inventaires, gérer les entrées/sorties et optimiser la chaîne d'approvisionnement en temps réel.",
      technologies: ["HTML", "CSS", "JS", "Tailwind CSS"],
      image: "assets/images/Gestion de stocks.png",
      featured: true,
    },
    {
      id: 2,
      title: "HealthFinder - Localisation Médicale",
      description:
        "Application mobile intuitive permettant de localiser rapidement les établissements médicaux (hôpitaux, pharmacies) à proximité. Intègre la géolocalisation et les itinéraires.",
      technologies: ["Flutter", "Dart", "Firebase", "Google Maps API"],
      image: "assets/images/interface_hopitaux.png",
      featured: true,
    },
    {
      id: 3,
      title: "Système de Gestion de Présence",
      description:
        "Plateforme web pour la gestion automatisée des présences des employés. Suivi en temps réel, génération de rapports et gestion des absences.",
      technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
      image: "assets/images/gestion des presences.png",
      featured: true,
    },
  ],
};

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove(
      "text-blue-600",
      "dark:text-blue-400",
      "bg-blue-50",
      "dark:bg-slate-800",
    );

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add(
        "text-blue-600",
        "dark:text-blue-400",
        "bg-blue-50",
        "dark:bg-slate-800",
      );
    }
  });
});

const themeToggle = document.getElementById("themeToggle");

if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
});

let allSkills = [];
let allProjects = [];

async function loadData() {
  try {
    allSkills = portfolioData.skills;
    allProjects = portfolioData.projects;

    renderSkills("all");
    renderProjects();
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
}

function renderSkills(filter = "all") {
  const skillsGrid = document.getElementById("skillsGrid");
  skillsGrid.innerHTML = "";

  const filteredSkills =
    filter === "all"
      ? allSkills
      : allSkills.filter((skill) => skill.category === filter);

  filteredSkills.forEach((skill, index) => {
    const skillCard = document.createElement("div");
    skillCard.className =
      "skill-card bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between h-full";

    const activeSegments = Math.round(skill.level / 20);

    let segmentsHTML = "";
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= activeSegments;
            segmentsHTML += `<div class="h-1.5 flex-1 rounded-full ${isActive ? '' : 'bg-slate-200 dark:bg-slate-700'} transition-all duration-500" style="${isActive ? `background-color: ${skill.color}` : ''}; transition-delay: ${index * 50 + i * 100}ms"></div>`;
        }

        skillCard.innerHTML = `
            <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900/50 text-2xl transition-transform group-hover:scale-110" style="color: ${skill.color}">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm md:text-base">${skill.name}</h3>
                    <div class="flex gap-1 mt-2">
                        ${segmentsHTML}
                    </div>
                </div>
            </div>
        `;
    skillsGrid.appendChild(skillCard);
  });
}

const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.classList.add("bg-slate-200", "dark:bg-slate-800");
      b.classList.remove("bg-blue-600", "text-white");
    });

    btn.classList.add("active");
    btn.classList.remove("bg-slate-200", "dark:bg-slate-800");
    btn.classList.add("bg-blue-600", "text-white");

    const filter = btn.getAttribute("data-filter");
    renderSkills(filter);
  });
});

let currentSlide = 0;

function renderProjects() {
  const carousel = document.getElementById("projectsCarousel");
  const dotsContainer = document.getElementById("carouselDots");
  carousel.innerHTML = "";
  dotsContainer.innerHTML = "";

  allProjects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.className =
      "project-card flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group";
    projectCard.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div class="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <span class="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">PROJET</span>
                    </div>
                </div>
                
                <div class="p-6 flex flex-col flex-grow bg-white dark:bg-slate-800">
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${project.technologies
                          .map(
                            (tech) => `
                            <span class="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] font-bold rounded-md border border-blue-100 dark:border-blue-800">
                                ${tech}
                            </span>
                        `,
                          )
                          .join("")}
                    </div>
                    
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">${project.title}</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 flex-grow">${project.description}</p>
                    
                    <div class="h-1 w-0 bg-blue-600 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
            </div>
        `;
    carousel.appendChild(projectCard);

    const dot = document.createElement("button");
    dot.className = `w-2 h-2 rounded-full transition-all ${index === 0 ? "bg-blue-600 w-8" : "bg-slate-300 dark:bg-slate-600"}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("projectsCarousel");
  const dots = document.querySelectorAll("#carouselDots button");
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  let slideWidth = 100;
  if (!isMobile && !isTablet) {
    slideWidth = 33.333;
  } else if (isTablet) {
    slideWidth = 50;
  }

  carousel.style.transform = `translateX(-${currentSlide * slideWidth}%)`;

  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.className = "w-8 h-2 rounded-full bg-blue-600 transition-all";
    } else {
      dot.className =
        "w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 transition-all";
    }
  });
}

function nextSlide() {
  const maxSlide = allProjects.length - 1;
  currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
  updateCarousel();
}

function prevSlide() {
  const maxSlide = allProjects.length - 1;
  currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

window.addEventListener("resize", updateCarousel);

const typingText = document.getElementById("typing-text");
const phrases = [
  "Développeur Fullstack Web",
  "Expert JavaScript & React",
  "Solutions Mobile (Flutter/RN)",
  "Passionné par l'Innovation",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      const progressBar = entry.target.querySelector(".skill-progress");
      if (progressBar) {
        progressBar.style.width = progressBar.getAttribute("data-width");
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".scroll-animate, .skill-card, .project-card, section h2",
  );
  elements.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
});

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  if (!data.name || !data.email || !data.message) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner spinning"></i> Envoi en cours...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert(
      "Merci ! Votre message a été envoyé avec succès. Je vous recontacterai bientôt.",
    );
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

const cvButton = document.querySelector("#cv button");
cvButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "assets/CV Charles Emmanuel CISSE 222.pdf";
  link.download = "CV_Cisse_Sidick_Desire_Charles_Emmanuel.pdf";
  link.click();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

loadData();

window.addEventListener("load", () => {
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("visible");
    }
  });
});
