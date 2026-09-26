/**
 * nav.js — Hamburger menu + active nav link via IntersectionObserver
 */
(function () {
  'use strict';

  /* ── Hamburger / drawer ──────────────────────────────────── */
  var hamburger = document.getElementById('nav-hamburger');
  var drawer    = document.getElementById('nav-drawer');

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close drawer when any link in the drawer is clicked
    drawer.querySelectorAll('.nav__drawer-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeDrawer();
      });
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
        hamburger.focus();
      }
    });

    // Close if clicking outside the drawer and hamburger
    document.addEventListener('click', function (e) {
      if (
        drawer.classList.contains('is-open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeDrawer();
      }
    });
  }

  /* ── Active nav link via IntersectionObserver ────────────── */
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav__link[data-section], .nav__drawer-link[data-section]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var activeSection = null;

    function setActive(id) {
      if (activeSection === id) return;
      activeSection = id;
      navLinks.forEach(function (link) {
        if (link.getAttribute('data-section') === id) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -45% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

})();
