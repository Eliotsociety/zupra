
document.addEventListener('DOMContentLoaded', () => {

  // --- AOS INITIALIZATION ---
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
  });

  // --- LOADING SCREEN ---
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      loadingScreen.classList.add('hidden');
    });
  }

  // --- NAVBAR SCROLL & ACTIVE LINK ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const onScroll = () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop; // Get the top position of the section
      // Adjust offset for fixed navbar height and a small buffer
      // Using navbar.offsetHeight for dynamic height, or a fixed value like 100px
      if (pageYOffset >= sectionTop - navbar.offsetHeight - 50) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', onScroll);
  // Call onScroll once on load to set initial active link and navbar state
  onScroll();

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Optional: re-enable body scroll
    });
  });

  // --- STAT COUNTER (Intersection Observer) ---
  const statItems = document.querySelectorAll('.stat-number');
  const aboutSection = document.getElementById('about');

  const countUp = (el, isPercentage = false) => {
    const target = +el.getAttribute('data-count');
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target + (isPercentage ? '%' : '+');
      }
    };
    requestAnimationFrame(updateCount);
  };
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(item => {
          // Reset text content before animating to avoid issues on re-scroll if not unobserved
          item.textContent = '0' + (item.textContent.includes('%') ? '%' : '+');
          const target = parseInt(item.dataset.target);
          const isPercentage = item.textContent.includes('%');
          countUp(item, isPercentage);
        });
        // If you want to re-animate on every scroll into view, don't unobserve.
        // If you want it to animate only once, uncomment the line below:
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if(aboutSection) {
    statObserver.observe(aboutSection);
  }

  // --- SKILL BARS ANIMATION (Intersection Observer) ---
  const skillProgress = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('skills');

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillProgress.forEach(bar => {
          bar.style.width = bar.getAttribute('data-percentage') + '%';
        });
        // If you want to re-animate on every scroll into view, don't unobserve.
        // If you want it to animate only once, uncomment the line below:
        // observer.unobserve(entry.target);
      } else {
        // Reset skill bars when they leave the viewport
        skillProgress.forEach(bar => {
          bar.style.width = '0%';
        });
      }
    });
  }, { threshold: 0.5 });
  
  if(skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // --- BACK TO TOP BUTTON ---
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
// End of main DOMContentLoaded


// --- CONTACT BUTTON CLICK TRACKING ---
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'contact_click', { 'event_category': 'CTA', 'event_label': 'Contact Button Homepage' });
      gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Contact Button' });
    }
  });
}

// --- CONTACT FORM SUBMISSION ---
// This is a separate DOMContentLoaded, it should be merged into the main one.
document.addEventListener("DOMContentLoaded", function () { // This is a duplicate DOMContentLoaded
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (typeof gtag === 'function') {
        gtag('event', 'submit', { 'event_category': 'Form', 'event_label': 'Contact Form', 'value': 1 });
      }

      const formData = new FormData(contactForm);
      
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          window.location.href = 'thankyou.html';
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      }).catch(error => {
        alert("Oops! There was a problem submitting your form");
      });
    });
  }
}); // This DOMContentLoaded is redundant and should be removed.

// --- TESTIMONIALS SLIDER (from index.html inline script, moved here) ---
// Renamed variables to avoid conflicts with potential pricing slider
document.addEventListener('DOMContentLoaded', function() { // This is another duplicate DOMContentLoaded
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsPrevBtn = document.getElementById('prevBtn');
    const testimonialsNextBtn = document.getElementById('nextBtn');
    const testimonialsDotsContainer = document.getElementById('testimonialsDots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsDots = testimonialsDotsContainer ? testimonialsDotsContainer.querySelectorAll('.dot') : [];

    if (testimonialsTrack && testimonialCards.length > 0 && testimonialsPrevBtn && testimonialsNextBtn) {
        let currentTestimonialSlide = 0;
        const totalTestimonialSlides = testimonialCards.length;
        let autoPlayInterval;

        // Initialize
        updateTestimonialSlider();
        startTestimonialAutoPlay();

        // Navigation functions
        function updateTestimonialSlider() {
            testimonialsTrack.style.transform = `translateX(-${currentTestimonialSlide * 100}%)`;

            testimonialCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentTestimonialSlide);
            });

            testimonialsDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonialSlide);
            });
        }

        function nextTestimonialSlide() {
            currentTestimonialSlide = (currentTestimonialSlide + 1) % totalTestimonialSlides;
            updateTestimonialSlider();
        }

        function prevTestimonialSlide() {
            currentTestimonialSlide = (currentTestimonialSlide - 1 + totalTestimonialSlides) % totalTestimonialSlides;
            updateTestimonialSlider();
        }

        function goToTestimonialSlide(index) {
            currentTestimonialSlide = index;
            updateTestimonialSlider();
        }

        // Auto-play functionality
        function startTestimonialAutoPlay() {
            autoPlayInterval = setInterval(nextTestimonialSlide, 5000);
        }

        function stopTestimonialAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Event listeners
        testimonialsNextBtn.addEventListener('click', () => {
            nextTestimonialSlide();
            stopTestimonialAutoPlay();
            startTestimonialAutoPlay();
        });

        testimonialsPrevBtn.addEventListener('click', () => {
            prevTestimonialSlide();
            stopTestimonialAutoPlay();
            startTestimonialAutoPlay();
        });

        testimonialsDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToTestimonialSlide(index);
                stopTestimonialAutoPlay();
                startTestimonialAutoPlay();
            });
        });

        // Pause on hover
        const testimonialsContainer = document.querySelector('.testimonials-container');
        if (testimonialsContainer) {
            testimonialsContainer.addEventListener('mouseenter', stopTestimonialAutoPlay);
            testimonialsContainer.addEventListener('mouseleave', startTestimonialAutoPlay);

            // Touch/swipe support
            let startX = 0;
            let endX = 0;

            testimonialsContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                stopTestimonialAutoPlay();
            });

            testimonialsContainer.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
            });

            testimonialsContainer.addEventListener('touchend', () => {
                const threshold = 50;
                const diff = startX - endX;

                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        nextTestimonialSlide();
                    } else {
                        prevTestimonialSlide();
                    }
                }
                startTestimonialAutoPlay();
            });
        }
    }

    // Animated counter for stats (already consolidated above, removing this duplicate)
    // Intersection Observer for stats animation (already consolidated above, removing this duplicate)

    // Scroll animation (already consolidated above, removing this duplicate)
}); // This DOMContentLoaded is redundant and should be removed.

// --- PRICING SLIDER CLASS (from index.html inline script, moved here) ---
// This class is defined but not used in index.html as there's no pricing section.
// It also uses generic IDs like 'prevBtn', 'nextBtn', 'dots' which conflict.
// Given it's not used in index.html, and to avoid conflicts, I will remove it.
/*
class PricingSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.slidesContainer = document.getElementById('slidesContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');

        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        this.updateSlider();
        this.startAutoSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
    }

    updateSlider() {
        if (this.slidesContainer) {
            const translateX = -this.currentSlide * 100;
            this.slidesContainer.style.transform = `translateX(${translateX}%)`;
        }

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        if (this.prevBtn) this.prevBtn.disabled = this.currentSlide === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    startAutoSlide() {
        setInterval(() => {
            if (this.currentSlide < this.totalSlides - 1) {
                this.nextSlide();
            }
        }, 5000);
    }
}

// Initialize the slider when the page loads (only if elements exist and it's intended for this page)
document.addEventListener('DOMContentLoaded', () => {
    // If a pricing slider is actually needed on index.html, its elements need unique IDs
    // and this instantiation should be conditional.
    // For now, assuming it's not needed on index.html.
    // new PricingSlider();
});
*/

// --- PRICING SLIDER (from index.html inline script, the second one) ---
// This is also dead code for index.html as there's no pricing section.
// It also uses generic IDs like 'prevBtn', 'nextBtn'.
// I will remove this as well.
/*
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.slides-container');
    const cards = document.querySelectorAll('.pricing-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const cardsPerView = 3;

    const totalSlides = cards.length;
    const totalGroups = Math.ceil(totalSlides / cardsPerView);

    const updateSliderPosition = () => {
        const cardWidth = cards[0].offsetWidth + 32; // 32px = gap (16px each side)
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Disable buttons when at start or end
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - cardsPerView;
    };

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalSlides - cardsPerView) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Responsive reset on window resize
    window.addEventListener("resize", () => {
        updateSliderPosition();
    });

    updateSliderPosition(); // Initial load
});
*/
