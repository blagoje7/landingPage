function initGallery(id) {
  const vp = document.getElementById(`${id}-vp`);
  const prevBtn = document.getElementById(`${id}-prev`);
  const nextBtn = document.getElementById(`${id}-next`);
  if (!vp || !prevBtn || !nextBtn) {
    console.error("Gallery: missing elements", { vp, prevBtn, nextBtn });
    return;
  }

  // Get the width of the viewport (one slide)
  const scrollAmount = vp.clientWidth;

  function scrollBy(amount) {
    vp.scrollBy({ left: amount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => {
    scrollBy(-scrollAmount);
  });
  nextBtn.addEventListener('click', () => {
    scrollBy(scrollAmount);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollBy(-scrollAmount);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollBy(scrollAmount);
    }
  }, { passive: false });

  // Debugging
  console.log("Gallery initialized", { vp, prevBtn, nextBtn, scrollAmount });
}

window.initGallery = initGallery;