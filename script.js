document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      if (entry.target.parentElement.classList.contains('gallery')) {
        const galleryImages = [...entry.target.parentElement.querySelectorAll('.fade-in')];
        galleryImages.forEach((img, index) => {
          img.style.setProperty('--delay', `${index * 0.2}s`);
          img.classList.add('show');
        });
      } else {
        entry.target.classList.add('show');
      }

      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Smooth scroll for navbar links
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70, // adjust for fixed navbar
        behavior: "smooth"
      });
    });
  });
});
