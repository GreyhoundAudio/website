(function () {
  var cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Feature detection, deliberately layered rather than relying on a
  // single media query match (some browsers report hover/pointer
  // features inconsistently, which previously caused the cursor to fail
  // silently in certain browsers).
  //
  // Primary signal: is this device NOT touch-primary? This is more
  // reliably reported across browsers than requiring an exact
  // "hover:hover AND pointer:fine" match.
  var isTouchPrimary = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var hasPointerEvents = 'PointerEvent' in window;
  var hasRAF = 'requestAnimationFrame' in window;

  if (isTouchPrimary || !hasPointerEvents || !hasRAF) {
    return; // leave native cursor untouched
  }

  var x = 0, y = 0;
  var targetX = 0, targetY = 0;
  var raf = null;
  var started = false;

  function activate() {
    if (started) return;
    started = true;
    // Only now do we hide the native cursor — confirmed the custom one
    // is actually working, so visitors are never left without any
    // visible cursor at all.
    document.documentElement.classList.add('has-custom-cursor');
  }

  function loop() {
    x += (targetX - x) * 0.35;
    y += (targetY - y) * 0.35;
    cursor.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('pointermove', function (e) {
    // Ignore touch input specifically, in case a hybrid device
    // (touchscreen laptop with a mouse attached) fires pointer events
    // from a finger — only activate on mouse/pen input.
    if (e.pointerType === 'touch') return;

    activate();
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.classList.add('active');
    if (!raf) raf = requestAnimationFrame(loop);
  });

  window.addEventListener('mouseleave', function () {
    cursor.classList.remove('active');
  });
})();
