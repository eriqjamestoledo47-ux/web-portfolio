(function(html) {

    'use strict';

    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    };

    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#intro');

        if (!(hdr && hero)) return;

        function handleHeader() {

            const scrollY = window.scrollY;

            const triggerHeight = hero.offsetHeight * 0.15;

            if (scrollY > triggerHeight) {

                hdr.classList.add('sticky');
                hdr.classList.add('offset');
                hdr.classList.add('scrolling');

            } else {

                hdr.classList.remove('sticky');
                hdr.classList.remove('offset');
                hdr.classList.remove('scrolling');

            }

        }

        window.addEventListener('scroll', handleHeader);

        handleHeader();

    };

    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    };

    const ssScrollSpy = function() {

        const sections = document.querySelectorAll('.target-section');

        if (!sections.length) return;

        function navHighlight() {

            let currentSection = "";

            sections.forEach((section) => {

                const rect = section.getBoundingClientRect();

                if (
                    rect.top <= window.innerHeight * 0.35 &&
                    rect.bottom >= window.innerHeight * 0.35
                ) {

                    currentSection = section.getAttribute('id');

                }

            });

            document
                .querySelectorAll('.s-header__menu-links li')
                .forEach((li) => {

                    li.classList.remove('current');

                });

            if (currentSection) {

                const activeLink = document.querySelector(
                    '.s-header__menu-links a[href="#' + currentSection + '"]'
                );

                if (activeLink) {

                    activeLink.parentElement.classList.add('current');

                }

            }

        }

        window.addEventListener('scroll', navHighlight);

        navHighlight();

    };

    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    };

    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    };

    "use strict";var MoveTo=function(){var e={tolerance:0,duration:800,easing:"easeOutQuart",container:window,callback:function(){}};function o(t,n,e,o){return t/=o,-e*(--t*t*t*t-1)+n}function v(n,e){var o={};return Object.keys(n).forEach(function(t){o[t]=n[t]}),Object.keys(e).forEach(function(t){o[t]=e[t]}),o}function d(t){return t instanceof HTMLElement?t.scrollTop:t.pageYOffset}function t(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.options=v(e,t),this.easeFunctions=v({easeOutQuart:o},n)}return t.prototype.registerTrigger=function(t,n){var e=this;if(t){var o=t.getAttribute("href")||t.getAttribute("data-target"),r=o&&"#"!==o?document.getElementById(o.substring(1)):document.body,i=v(this.options,function(e,t){var o={};return Object.keys(t).forEach(function(t){var n=e.getAttribute("data-mt-".concat(function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(t)));n&&(o[t]=isNaN(n)?n:parseInt(n,10))}),o}(t,this.options));"function"==typeof n&&(i.callback=n);var a=function(t){t.preventDefault(),e.move(r,i)};return t.addEventListener("click",a,!1),function(){return t.removeEventListener("click",a,!1)}}},t.prototype.move=function(i){var a=this,c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(0===i||i){c=v(this.options,c);var u,s="number"==typeof i?i:i.getBoundingClientRect().top,f=d(c.container),l=null;s-=c.tolerance;window.requestAnimationFrame(function t(n){var e=d(a.options.container);l||(l=n-1);var o=n-l;if(u&&(0<s&&e<u||s<0&&u<e))return c.callback(i);u=e;var r=a.easeFunctions[c.easing](o,f,s,c.duration);c.container.scroll(0,r),o<c.duration?window.requestAnimationFrame(t):(c.container.scroll(0,s+f),c.callback(i))})}},t.prototype.addEaseFunction=function(t,n){this.easeFunctions[t]=n},t}();"undefined"!=typeof module?module.exports=MoveTo:window.MoveTo=MoveTo;

    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssMoveTo();
        ssBackToTop();

    })();

})(document.documentElement);

document.addEventListener('DOMContentLoaded', function () {

    emailjs.init('kfBKw7o7u3CIBx8Jm');

    const form = document.querySelector('.footer-form');
    const popup = document.getElementById('formPopup');
    const popupText = document.getElementById('formPopupText');
    const loader = document.querySelector('.form-loader');

    if (!form) return;

    form.addEventListener('submit', function (e) {

        e.preventDefault();

        popup.classList.add('active');

        popupText.textContent = 'Sending your message...';

        loader.style.display = 'block';

        emailjs.sendForm(
            'service_l1l0cau',
            'template_dauhuzv',
            form
        )

        .then(function () {

            loader.style.display = 'none';

            popupText.textContent =
                'Your message has been sent successfully.';

            emailjs.send(
                'service_l1l0cau',
                'template_1ahwuw7',
                {
                    name: form.name.value,
                    email: form.email.value,
                    contact: form.contact.value,
                    subject: form.subject.value,
                    message: form.message.value
                }
            );

            form.reset();

            setTimeout(() => {
                window.location.reload();
            }, 2500);

        })

        .catch(function (error) {

            loader.style.display = 'none';

            popupText.textContent =
                'Something went wrong. Please try again.';

            console.log(error);

            setTimeout(() => { 
                window.location.reload(); 
            }, 2500);

        });

    });

});

const skillSlides = document.querySelectorAll('.skills-slide');

const prevBtn = document.querySelector('.skills-prev');

const nextBtn = document.querySelector('.skills-next');

let currentSkill = 0;

function showSkill(index) {

    skillSlides.forEach((slide) => {
        slide.classList.remove('active');
    });

    skillSlides[index].classList.add('active');
}

if (nextBtn && prevBtn) {

    nextBtn.addEventListener('click', () => {

        currentSkill++;

        if (currentSkill >= skillSlides.length) {
            currentSkill = 0;
        }

        showSkill(currentSkill);

    });

    prevBtn.addEventListener('click', () => {

        currentSkill--;

        if (currentSkill < 0) {
            currentSkill = skillSlides.length - 1;
        }

        showSkill(currentSkill);

    });

}

const serviceSlides = document.querySelectorAll('.service-editorial-item');

const prevServiceBtn = document.querySelector('.services-prev');
const nextServiceBtn = document.querySelector('.services-next');

let currentService = 0;

function showService(index) {

    serviceSlides.forEach((slide) => {

        slide.classList.remove('active');

    });

    serviceSlides[index].classList.add('active');

}

showService(currentService);

nextServiceBtn.addEventListener('click', () => {

    currentService++;

    if (currentService >= serviceSlides.length) {

        currentService = 0;

    }

    showService(currentService);

});

prevServiceBtn.addEventListener('click', () => {

    currentService--;

    if (currentService < 0) {

        currentService = serviceSlides.length - 1;

    }

    showService(currentService);

});

const heroImages = [

    'images/bg_2.png',
    'images/bg_3.png',
    'images/bg_4.png'

];

const heroImage = document.getElementById('heroSliderImage');

let currentHeroImage = 0;

if (heroImage) {

    heroImage.style.transition =
        'opacity 1.2s ease, transform 6s ease';

    heroImage.style.transform = 'scale(0.96)';

    setInterval(() => {

        heroImage.style.opacity = 0;

        heroImage.style.transform = 'scale(0.99)';

        setTimeout(() => {

            currentHeroImage++;

            if (currentHeroImage >= heroImages.length) {

                currentHeroImage = 0;

            }

            heroImage.src = heroImages[currentHeroImage];

            heroImage.style.opacity = 1;

            heroImage.style.transform = 'scale(0.96)';

        }, 700);

    }, 4500);

}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add('reveal-visible');

            } else {

                entry.target.classList.remove('reveal-visible');

            }

        });

    },

    {
        threshold: 0.12,

        rootMargin: '0px 0px -80px 0px'
    }

);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});