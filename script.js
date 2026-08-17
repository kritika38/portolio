// =========================================================================
// MOBILE DOCK LAYER DRAWER
// =========================================================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });
}

// =========================================================================
// GATEWAY LEDGER ENTRY (Dynamic Gmail Email Delivery)
// =========================================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        formData.append("access_key", "3bf980b7-c6d0-4065-9c4b-739705c81d27"); 

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you! Message sent successfully.');
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            alert('Server network error. Please try again later.');
        });
    });
}

// =========================================================================
// INTEGRATED DSA COUNTER ENGINE (Fixed & Synced Layout)
// =========================================================================
const stats = {
    leetcode: 153,
    gfg: 289,
    total: 442
};

const triggerLiveCalculation = (targetCounterElement) => {
    // 1. Check matching data targets dynamically
    let finalTarget = +targetCounterElement.getAttribute('data-target');
    
    if (targetCounterElement.id === 'leetcode-count') finalTarget = stats.leetcode;
    if (targetCounterElement.id === 'gfg-count') finalTarget = stats.gfg;
    if (targetCounterElement.id === 'total-dsa-count') finalTarget = stats.total;

    targetCounterElement.innerText = "0"; 
    const animationSpeed = 60; 
    
    const updateCount = () => {
        const currentDisplay = +targetCounterElement.innerText;
        const stepIncrement = Math.ceil(finalTarget / animationSpeed);

        if (currentDisplay < finalTarget) {
            targetCounterElement.innerText = Math.min(currentDisplay + stepIncrement, finalTarget);
            setTimeout(updateCount, 20);
        } else {
            targetCounterElement.innerText = finalTarget;
        }
    };
    updateCount();
};

// Global scroll controller for layout matrix
const runGlobalProfileCounters = () => {
    const allCounters = document.querySelectorAll('#leetcode-count, #gfg-count, #total-dsa-count, .live-counter');
    allCounters.forEach(counter => triggerLiveCalculation(counter));
};

// Intersection Observer for viewport triggers
const scrollObserverConfig = { threshold: 0.15 };
const viewportIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runGlobalProfileCounters();
        }
    });
}, scrollObserverConfig);

const targetProfileSection = document.getElementById('coding-profiles');
if (targetProfileSection) {
    viewportIntersectionObserver.observe(targetProfileSection);
}

// Click Trigger inside current card frames
const interactiveMetricCards = document.querySelectorAll('.profile-metric-card');
interactiveMetricCards.forEach(card => {
    card.addEventListener('click', () => {
        const countersInsideCard = card.querySelectorAll('#leetcode-count, #gfg-count, #total-dsa-count, .live-counter');
        countersInsideCard.forEach(counter => triggerLiveCalculation(counter));
    });
});

// =========================================================================
// SCROLL SYNC LAYER
// =========================================================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let activeSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            activeSectionId = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === activeSectionId) {
            item.classList.add('active');
        }
    });
});

// =========================================================================
// EYE EYE-COUNTER TRAFFIC HIT LOG
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
    const namespace = "myportfolio_jatin"; 
    const key = "home_views";

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.value) document.getElementById("view-count").innerText = data.value;
        })
        .catch(err => {
            console.log("Counter error, using local simulation");
            let localViews = localStorage.getItem("portfolio_views") || 0;
            localViews = parseInt(localViews) + 1;
            localStorage.setItem("portfolio_views", localViews);
            const viewCountEl = document.getElementById("view-count");
            if (viewCountEl) viewCountEl.innerText = localViews;
        });
        
    // Initial core run
    runGlobalProfileCounters();
});