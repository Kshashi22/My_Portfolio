const floatingElements = document.getElementById('floatingElements');
for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element');
    const size = Math.random() * 200 + 50;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 20;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    element.style.animation = `float ${duration}s infinite ease-in-out`;

    floatingElements.appendChild(element);
}

const style = document.createElement('style');
style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(20px, -20px) rotate(5deg); }
            50% { transform: translate(-15px, 10px) rotate(-5deg); }
            75% { transform: translate(10px, 15px) rotate(3deg); }
        }
    `;
document.head.appendChild(style);

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const scrollDownArrow = document.querySelector('.scroll-down');
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(element => {
    observer.observe(element);
});
const nav = document.getElementById('mainNav');
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    if (scrollTop > 100) {
        scrollDownArrow.style.opacity = '0';
        scrollDownArrow.style.visibility = 'hidden';
        scrollDownArrow.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        scrollDownArrow.style.opacity = '1';
        scrollDownArrow.style.visibility = 'visible';
        scrollDownArrow.style.transform = 'translateX(-50%) translateY(0)';
    }

    lastScrollTop = scrollTop;
});
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            closeMobileMenu();
            const headerHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
function highlightNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = nav.offsetHeight;
        if (window.scrollY >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);
const styleActive = document.createElement('style');
styleActive.textContent = `
        .nav-links a.active,
        .mobile-nav a.active {
            color: var(--primary) !important;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
        
        .mobile-nav a.active {
            background: rgba(99, 102, 241, 0.15) !important;
        }
    `;
document.head.appendChild(styleActive);

function showSecurityPopup(message) {
    const existingPopup = document.getElementById('securityPopup');
    const existingOverlay = document.getElementById('securityPopupOverlay');
    if (existingPopup) existingPopup.remove();
    if (existingOverlay) existingOverlay.remove();
    const overlay = document.createElement('div');
    overlay.id = 'securityPopupOverlay';
    document.body.appendChild(overlay);
    const popup = document.createElement('div');
    popup.id = 'securityPopup';
    popup.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; background: var(--gradient-1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <i class="fas fa-shield-alt" style="font-size: 24px; color: white;"></i>
                    </div>
                    <h3 style="color: white; margin-bottom: 10px;">Security Notice</h3>
                    <p style="color: var(--gray); line-height: 1.5;">${message}</p>
                </div>
                <button id="closePopup" style="
                    background: var(--gradient-1);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">Understood</button>
            `;
    document.body.appendChild(popup);
    document.getElementById('closePopup').addEventListener('click', function () {
        popup.remove();
        overlay.remove();
    });
    overlay.addEventListener('click', function () {
        popup.remove();
        overlay.remove();
    });
    setTimeout(() => {
        if (document.body.contains(popup)) {
            popup.remove();
            overlay.remove();
        }
    }, 5000);
}
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityPopup('Right-click is disabled on this page.');
    return false;
});

document.addEventListener('keydown', function (e) {

    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault();
        showSecurityPopup('Developer tools are disabled.');
        return false;
    }

    if ((e.ctrlKey && e.key === 'u') || (e.metaKey && e.key === 'u')) {
        e.preventDefault();
        showSecurityPopup('Viewing page source is disabled.');
        return false;
    }

    if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.altKey && e.key === 'c')) {
        e.preventDefault();
        showSecurityPopup('Inspect element is disabled.');
        return false;
    }
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
});

document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

let devtoolsOpen = false;
setInterval(() => {
    const start = performance.now();
    console.debug('DevTools Check');
    const end = performance.now();

    if (end - start > 100) {
        if (!devtoolsOpen) {
            devtoolsOpen = true;
            showSecurityPopup('Developer tools detected. Please close them.');
        }
    } else {
        devtoolsOpen = false;
    }
    // Clear console to prevent spam
    console.clear();

}, 1000);
