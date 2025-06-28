
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
  window.addEventListener('load', () => {
    loadingScreen.classList.add('hidden');
  });

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
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
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

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
  });

  // --- STAT COUNTER (Intersection Observer) ---
  const statItems = document.querySelectorAll('.stat-number');
  const aboutSection = document.getElementById('about');

  const countUp = (el) => {
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
        el.innerText = target;
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
        statItems.forEach(item => countUp(item));
        observer.unobserve(entry.target); // Stop observing once animated
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
        observer.unobserve(entry.target);
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


  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText.replace('+', '');
      const increment = Math.ceil(target / 50); // speed tweak

      if (current < target) {
        counter.innerText = `${current + increment}+`;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = `${target}+`;
      }
    };

    // Optional: only animate when in viewport
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateCount();
        observer.disconnect(); // only once
      }
    }, { threshold: 1 });

    observer.observe(counter);
  });


  // Example – track contact button click
document.querySelector('.contact-btn').addEventListener('click', () => {
  gtag('event', 'contact_click', { 'event_category': 'CTA', 'event_label': 'Contact Button Homepage' });
});

document.querySelector('.contact-btn').addEventListener('click', () => {
  gtag('event', 'click', {
    event_category: 'CTA',
    event_label: 'Contact Button'
  });
});

document.querySelector('#contact-form').addEventListener('submit', () => {
  gtag('event', 'submit', {
    event_category: 'Form',
    event_label: 'Contact Form',
    value: 1
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});
