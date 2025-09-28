let currentSection = "theory";
let progressValue = 0;
let gridColumns = 3;
let positionIndex = 0;
const positions = [
  { top: "20px", left: "20px" },
  { top: "20px", right: "20px" },
  { bottom: "20px", right: "20px" },
  { bottom: "20px", left: "20px" },
];

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Update navigation tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.target.classList.add("active");

  // Update progress bar
  const sections = [
    "theory",
    "grid",
    "position",
    "transform",
    "animation",
    "bootstrap",
    "media",
    "tasks",
  ];
  const currentIndex = sections.indexOf(sectionId);
  progressValue = ((currentIndex + 1) / sections.length) * 100;
  document.getElementById("progressFill").style.width = progressValue + "%";

  currentSection = sectionId;
}

function changeGridLayout() {
  const grid = document.getElementById("demoGrid");
  gridColumns = gridColumns === 3 ? 2 : gridColumns === 2 ? 4 : 3;
  grid.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
}

function changePosition() {
  const demo = document.getElementById("positionDemo");
  positionIndex = (positionIndex + 1) % positions.length;
  const pos = positions[positionIndex];

  Object.keys(pos).forEach((key) => {
    demo.style[key] = pos[key];
  });

  // Clear other position properties
  const allProps = ["top", "right", "bottom", "left"];
  allProps.forEach((prop) => {
    if (!pos.hasOwnProperty(prop)) {
      demo.style[prop] = "auto";
    }
  });
}

function animateTransform() {
  const box = document.getElementById("transformBox");
  box.classList.toggle("animate");
}

function startAnimation() {
  const box = document.getElementById("animationBox");
  box.style.animation = "none";
  setTimeout(() => {
    box.style.animation = "fadeIn 2s ease-in-out";
  }, 10);
}

function changeTheme() {
  const root = document.documentElement;
  const currentPrimary = getComputedStyle(root)
    .getPropertyValue("--primary-color")
    .trim();

  if (currentPrimary === "#3498db") {
    root.style.setProperty("--primary-color", "#e74c3c");
    root.style.setProperty("--secondary-color", "#9b59b6");
  } else {
    root.style.setProperty("--primary-color", "#3498db");
    root.style.setProperty("--secondary-color", "#2c3e50");
  }
}

// Initialize progress bar
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("progressFill").style.width = "12.5%";

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  const sections = [
    "theory",
    "grid",
    "position",
    "transform",
    "animation",
    "bootstrap",
    "media",
    "tasks",
  ];
  const currentIndex = sections.indexOf(currentSection);

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    showSection(sections[currentIndex - 1]);
    document
      .querySelector(
        `button[onclick="showSection('${sections[currentIndex - 1]}')"]`
      )
      .focus();
  } else if (e.key === "ArrowRight" && currentIndex < sections.length - 1) {
    showSection(sections[currentIndex + 1]);
    document
      .querySelector(
        `button[onclick="showSection('${sections[currentIndex + 1]}')"]`
      )
      .focus();
  }
});
