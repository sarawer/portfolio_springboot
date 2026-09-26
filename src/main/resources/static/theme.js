/**
 * theme.js — Light / Dark mode toggle
 *
 * Reads user preference from localStorage (key: "portfolio-theme").
 * Falls back to OS preference via prefers-color-scheme.
 * The initial theme is applied before first paint via an inline <script>
 * in the <head> to prevent flash. This file handles the toggle button.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-theme';
  var DARK  = 'dark';
  var LIGHT = 'light';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  function updateButton(theme) {
    var btn  = document.getElementById('theme-toggle');
    var icon = document.getElementById('theme-icon');
    if (!btn || !icon) return;

    if (theme === DARK) {
      icon.className = 'fa-solid fa-sun';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.className = 'fa-solid fa-moon';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  function init() {
    // Sync button state with whatever theme was set in the inline head script
    updateButton(getTheme());

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var current = getTheme();
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
