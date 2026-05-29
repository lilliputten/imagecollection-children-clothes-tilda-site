export function initNavHeaderNew() {
  const navHeaderNode = document.querySelector('.uc-NavHeaderNew') as HTMLDivElement | undefined;
  const heroNode = document.querySelector('.uc-HeroNew, .uc-Hero') as HTMLDivElement | undefined;

  if (!navHeaderNode) {
    // eslint-disable-next-line no-console
    console.error('[NavHeaderNew] No NavHeaderNew bode found');
    return;
  }

  /*
   * let heroObserver: IntersectionObserver | undefined;
   * if (heroObserver) {
   *   heroObserver.disconnect();
   *   heroObserver = undefined;
   * }
   */

  if (heroNode) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        const isHeroOnScreen = entry.isIntersecting;
        navHeaderNode.classList.toggle('onHero', isHeroOnScreen);
      },
      { threshold: 0 },
    );
    heroObserver.observe(heroNode);
  } else {
    navHeaderNode.classList.toggle('onHero', false);
  }
}
