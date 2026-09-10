// Amirul Cyber — nav toggle + code copy buttons (no dependencies)

(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('site-nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle — flips <html data-theme> and remembers the choice.
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  function syncThemeBtn() {
    if (!themeBtn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to day theme' : 'Switch to night theme');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', dark ? 'light' : 'dark');
      try { localStorage.setItem('amirul-theme', dark ? 'light' : 'dark'); } catch (e) { /* noop */ }
      syncThemeBtn();
    });
  }
  syncThemeBtn();

  // Copy button on each fenced code block
  function addCopy(pre) {
    if (pre.querySelector('.btn-copy')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-copy';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.innerText : pre.innerText;
      var done = function () {
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('is-copied');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        // Legacy fallback
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
    pre.appendChild(btn);
  }

  document.querySelectorAll('.prose pre').forEach(addCopy);
})();
