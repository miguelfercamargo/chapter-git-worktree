// ========================================
// GIT WORKTREE PRESENTATION - Navigation
// With sub-step support for chat sequences
// ========================================

(function () {
  const slides = document.querySelectorAll('.slide');
  const progressFill = document.getElementById('progressFill');
  const slideCounter = document.getElementById('slideCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const homeBtn = document.getElementById('homeBtn');
  const transitionNode = document.getElementById('transitionNode');

  let currentSlide = 0;
  let currentStep = 0; // sub-step within a slide
  const totalSlides = slides.length;

  function triggerTransitionNode() {
    if (!transitionNode) return;
    // Reset animation by removing and re-adding the class
    transitionNode.classList.remove('animating');
    // Force reflow so the animation can replay
    void transitionNode.offsetWidth;
    transitionNode.classList.add('animating');
  }

  function getMaxSteps(slide) {
    const steps = slide.getAttribute('data-steps');
    return steps ? parseInt(steps) : 0;
  }

  function updateSteps(slide, step) {
    const msgs = slide.querySelectorAll('.chat-msg');
    msgs.forEach((msg) => {
      const msgStep = parseInt(msg.getAttribute('data-step'));
      if (msgStep <= step) {
        msg.classList.add('visible');
      } else {
        msg.classList.remove('visible');
      }
    });
  }

  function updatePresentation() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'exit-left');
      if (index === currentSlide) {
        slide.classList.add('active');
        // Reset or apply steps
        const maxSteps = getMaxSteps(slide);
        if (maxSteps > 0) {
          updateSteps(slide, currentStep);
        }
      } else if (index < currentSlide) {
        slide.classList.add('exit-left');
        // Show all steps for past slides
        const maxSteps = getMaxSteps(slide);
        if (maxSteps > 0) {
          updateSteps(slide, maxSteps);
        }
      } else {
        // Future slides: hide all steps
        const maxSteps = getMaxSteps(slide);
        if (maxSteps > 0) {
          updateSteps(slide, 0);
        }
      }
    });

    // Update progress bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;

    // Update counter
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

    // Update button states
    prevBtn.style.opacity = currentSlide === 0 && currentStep === 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = currentSlide === 0 && currentStep === 0 ? 'none' : 'all';
    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    nextBtn.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'all';
  }

  function nextSlide() {
    const slide = slides[currentSlide];
    const maxSteps = getMaxSteps(slide);

    // If slide has sub-steps and we haven't shown them all
    if (maxSteps > 0 && currentStep < maxSteps) {
      currentStep++;
      updateSteps(slide, currentStep);
      return;
    }

    // Move to next slide
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      currentStep = 0;
      triggerTransitionNode();
      updatePresentation();
    }
  }

  function prevSlide() {
    const slide = slides[currentSlide];
    const maxSteps = getMaxSteps(slide);

    // If we're in sub-steps, go back one step
    if (maxSteps > 0 && currentStep > 0) {
      currentStep--;
      updateSteps(slide, currentStep);
      return;
    }

    // Move to previous slide
    if (currentSlide > 0) {
      currentSlide--;
      const prevSlideEl = slides[currentSlide];
      const prevMax = getMaxSteps(prevSlideEl);
      currentStep = prevMax; // Show all steps of previous slide
      triggerTransitionNode();
      updatePresentation();
    }
  }

  function goHome() {
    currentSlide = 0;
    currentStep = 0;
    triggerTransitionNode();
    updatePresentation();
  }

  // Button clicks
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  homeBtn.addEventListener('click', goHome);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goHome();
        break;
      case 'End':
        e.preventDefault();
        currentSlide = totalSlides - 1;
        currentStep = 0;
        updatePresentation();
        break;
    }
  });

  // Touch support (swipe)
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });

  // Initialize
  updatePresentation();
})();
