(function () {
  var cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Only wire up on fine-pointer devices; touch devices never see this element move.
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return;

  var x = 0, y = 0;
  var targetX = 0, targetY = 0;
  var raf = null;

  function loop() {
    // gentle easing so the ring trails the pointer very slightly —
    // reads as considered rather than instant/robotic
    x += (targetX - x) * 0.35;
    y += (targetY - y) * 0.35;
    cursor.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('pointermove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.classList.add('active');
    if (!raf) raf = requestAnimationFrame(loop);

    // detect hover over text elements directly under the pointer —
    // more reliable than CSS :hover here since the cursor mark itself
    // is a pointer-events:none overlay sitting on top of everything
    var el = document.elementFromPoint(e.clientX, e.clientY);
    var overText = !!(el && el.closest && el.closest('[data-hoverable]'));
    cursor.classList.toggle('on-text', overText);
  });

  window.addEventListener('pointerdown', function () {
    cursor.classList.add('down');
  });

  window.addEventListener('pointerup', function () {
    cursor.classList.remove('down');
  });

  window.addEventListener('mouseleave', function () {
    cursor.classList.remove('active');
  });
})();
