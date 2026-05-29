export function initNavHeaderNew() {
  const navHeaderNode = document.querySelector('.uc-NavHeaderNew') as HTMLDivElement | undefined;
  const heroNode = document.querySelector('.uc-HeroNew, .uc-Hero') as HTMLDivElement | undefined;

  if (!navHeaderNode) {
    // eslint-disable-next-line no-console
    console.error('[NavHeaderNew] No NavHeaderNew bode found');
    return;
  }

  if (heroNode) {
    /* // Using intersection observer...
     * const heroObserver = new IntersectionObserver(
     *   ([entry]) => {
     *     const isOnHero = entry.isIntersecting;
     *     navHeaderNode.classList.toggle('onHero', isOnHero);
     *   },
     *   { threshold: 0 },
     * );
     * heroObserver.observe(heroNode);
     */
    // Using scroll event...
    const handleScroll = (_event?: Event): void => {
      const scrollY: number = window.scrollY;
      const isOnHero = scrollY <= 100;
      navHeaderNode.classList.toggle('onHero', isOnHero);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  } else {
    navHeaderNode.classList.toggle('onHero', false);
  }
}
