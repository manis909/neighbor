document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    const forms = {
        'contact-form': handleContactForm,
        'login-form': handleLoginForm,
        'register-form': handleRegisterForm
    };

    Object.keys(forms).forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', forms[formId]);
        }
    });

    function handleContactForm(e) {
        e.preventDefault();
        if (validateForm(this)) {
            // Here you would typically send the form data to a server
            const formData = new FormData(this);
            console.log('Contact form submitted:', Object.fromEntries(formData));
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    }

    function handleLoginForm(e) {
        e.preventDefault();
        if (validateForm(this)) {
            // Here you would typically send the login data to a server for authentication
            const formData = new FormData(this);
            console.log('Login attempt:', Object.fromEntries(formData));
            alert('Login successful!');
            // Redirect to user dashboard or home page
            window.location.href = 'index.html';
        }
    }

    function handleRegisterForm(e) {
        e.preventDefault();
        if (validateForm(this)) {
            // Here you would typically send the registration data to a server
            const formData = new FormData(this);
            console.log('Registration submitted:', Object.fromEntries(formData));
            alert('Registration successful! Welcome to Neighbourly!');
            // Redirect to user dashboard or home page
            window.location.href = 'index.html';
        }
    }

    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        // Additional validation for registration form
        if (form.id === 'register-form') {
            const password = form.querySelector('#password');
            const confirmPassword = form.querySelector('#confirm-password');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
                password.classList.add('error');
                confirmPassword.classList.add('error');
                alert('Passwords do not match');
            }
        }

        return isValid;
    }

    // Testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function showNextTestimonial() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }

        if (testimonials.length > 0) {
            testimonials[0].classList.add('active');
            setInterval(showNextTestimonial, 5000);
        }
    }

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Feature hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = currentYear;
    }

    // Scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '&uarr;';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});