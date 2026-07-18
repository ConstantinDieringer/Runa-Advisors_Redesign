const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const progress = document.querySelector(".scroll-progress");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.classList.toggle("open");
    navigation.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuButton.classList.remove("open");
      navigation.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const updateProgress = () => {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
}

document.querySelector(".contact-form")?.addEventListener("submit", event => {
  const form = event.currentTarget;
  const message = form.querySelector(".form-message");

  if (!form.checkValidity()) {
    event.preventDefault();
    form.reportValidity();
    return;
  }

  if (message) {
    message.textContent = "Sending...";
  }
});
