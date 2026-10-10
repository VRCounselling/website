/* VR Counselling, site behaviour: header shadow, mobile menu, hero animation, FAQ accordion, anchor offset. */

(function () {
    'use strict';

    /* ------------------------------------------------------------------
       Header scroll shadow
    ------------------------------------------------------------------ */
    var header = document.getElementById('site-header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    /* ------------------------------------------------------------------
       Mobile menu
    ------------------------------------------------------------------ */
    var mobNav        = document.getElementById('mob-nav');
    var hamburgerBtn  = document.getElementById('hamburger-btn');
    var mobCloseBtn   = document.getElementById('mob-close-btn');

    function openMobNav() {
      mobNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMobNav() {
      mobNav.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    hamburgerBtn.addEventListener('click', openMobNav);
    mobCloseBtn.addEventListener('click', closeMobNav);

    mobNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobNav.classList.contains('is-open')) {
        closeMobNav();
        hamburgerBtn.focus();
      }
    });

    /* ------------------------------------------------------------------
       Hero entrance animation
    ------------------------------------------------------------------ */
    function triggerHeroAnimation() {
      document.querySelectorAll('.anim-fade, .anim-img').forEach(function (el) {
        el.classList.add('is-ready');
      });
    }

    if (document.readyState === 'complete') {
      setTimeout(triggerHeroAnimation, 100);
    } else {
      window.addEventListener('load', function () {
        setTimeout(triggerHeroAnimation, 100);
      });
    }

    /* ------------------------------------------------------------------
       FAQ accordion
    ------------------------------------------------------------------ */
    var faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var answer  = this.nextElementSibling;
        var icon    = this.querySelector('.faq-icon');
        var isOpen  = answer.classList.contains('is-open');

        // Close all panels
        document.querySelectorAll('.faq-answer').forEach(function (a) {
          a.classList.remove('is-open');
        });
        document.querySelectorAll('.faq-icon').forEach(function (i) {
          i.textContent = '+';
        });
        faqBtns.forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked panel open if it was closed
        if (!isOpen) {
          answer.classList.add('is-open');
          icon.textContent = '−';
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });

  }());

(function () {
  function headerH() {
    var h = document.querySelector('.site-header');
    return h && getComputedStyle(h).position === 'fixed' ? h.getBoundingClientRect().height : 0;
  }
  function anchorTop(el) {
    var t = el.getBoundingClientRect().top + window.pageYOffset - headerH() - 12;
    return t < 0 ? 0 : t;
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    var hash = null;
    if (href.charAt(0) === '#') hash = href;
    else if (href.indexOf('#') > 0 && href.split('#')[0] === location.pathname) hash = '#' + href.split('#')[1];
    if (!hash || hash === '#') return;
    var el = document.getElementById(hash.slice(1));
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: anchorTop(el), behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', hash);
  }, false);

  function jumpToHash() {
    if (!location.hash || location.hash.length < 2) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!el) return;
    var de = document.documentElement, prev = de.style.scrollBehavior;
    de.style.scrollBehavior = 'auto';
    window.scrollTo(0, anchorTop(el));
    de.style.scrollBehavior = prev;
  }
  window.addEventListener('load', jumpToHash);
}());
