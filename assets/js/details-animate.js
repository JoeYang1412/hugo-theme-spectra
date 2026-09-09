// ===== Series Details Animate: smooth expand/collapse for series post list =====

(function () {
  'use strict';
  document.querySelectorAll('.series-list-toggle').forEach(function (det) {
    var content = det.querySelector('.series-list-content');
    if (!content) return;
    var summary = det.querySelector('summary');
    if (!summary) return;
    var animating = false;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (animating) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        det.open = !det.open;
        return;
      }
      animating = true;
      if (det.open) {
        det.classList.add('is-closing');
        content.style.height = content.scrollHeight + 'px';
        void content.offsetHeight; // Force reflow
        content.style.height = '0';
        var closeFired = false;
        var closeHandler = function () {
          if (closeFired) return;
          closeFired = true;
          det.open = false;
          det.classList.remove('is-closing');
          animating = false;
          content.style.height = '';
          content.removeEventListener('transitionend', closeHandler);
        };
        content.addEventListener('transitionend', closeHandler);
        setTimeout(closeHandler, 350);
      } else {
        det.open = true;
        var h = content.scrollHeight;
        content.style.height = '0';
        void content.offsetHeight; // Force reflow
        content.style.height = h + 'px';
        var openFired = false;
        var openHandler = function () {
          if (openFired) return;
          openFired = true;
          animating = false;
          content.style.height = '';
          content.removeEventListener('transitionend', openHandler);
        };
        content.addEventListener('transitionend', openHandler);
        setTimeout(openHandler, 350);
      }
    });
  });
})();
