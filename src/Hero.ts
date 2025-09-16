function initHeroCover(node: HTMLDivElement) {
  const { dataset } = node;
  const backgroundImage = node.style.backgroundImage; // Current background image
  const contentCoverBg = dataset.contentCoverBg;
  const bgUrlStr = contentCoverBg && `url("${contentCoverBg}")`;
  // Restore the original background image
  if (bgUrlStr && bgUrlStr !== backgroundImage) {
    requestAnimationFrame(() => (node.style.backgroundImage = bgUrlStr));
  }
}

function checkMutation(mutation: MutationRecord) {
  if (mutation.type === 'attributes') {
    const { attributeName, target } = mutation;
    const node = target as HTMLDivElement;
    if (attributeName === 'class' && node.classList.contains('loaded')) {
      initHeroCover(node);
      return true;
    }
  }
}

export function initHero() {
  const heroBlock = document.querySelector<HTMLDivElement>('.uc-Hero');
  if (!heroBlock) {
    return;
  }
  const covers = heroBlock.querySelectorAll<HTMLDivElement>('.t-cover__carrier');
  covers.forEach((node: HTMLDivElement) => {
    if (node.classList.contains('loaded')) {
      initHeroCover(node);
    } else {
      node.classList.toggle('loaded', true);
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (checkMutation(mutation)) {
            observer.disconnect();
          }
        });
      });
      observer.observe(node, { attributes: true });
    }
  });
}
