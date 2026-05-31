const catalogTitlesByPaths = {
  '/catalog/t-shirts': 'Футболки и свитшоты с джибитсами',
  '/catalog/tactile': 'Одежда с тактильными изображениями',
  '/catalog/prints': 'Одежда с принтами',
  '/catalog/accessories': 'Аксессуары',
  '/catalog/new': 'Новинки',
};

export function initStoreBreadcrumbs() {
  const storeNode = document.querySelector<HTMLElement>('.js-store-product.js-product');
  if (!storeNode) {
    // eslint-disable-next-line no-console
    console.warn('[StoreBreadcrumbs] Not found store node. Do nothing.');
    return;
  }
  const breadcrumbsListNode = document.querySelector<HTMLElement>('.uc-Breadcrumbs .t758__list');
  if (!breadcrumbsListNode) {
    // eslint-disable-next-line no-console
    console.warn('[StoreBreadcrumbs] Not found breadcrumbs list node. Do nothing.');
    return;
  }
  const lastItem = breadcrumbsListNode.lastElementChild as HTMLElement | undefined;
  const lastLink = lastItem?.querySelector('.t-menu__link-item ');
  if (!lastItem || !lastLink) {
    // eslint-disable-next-line no-console
    console.warn('[StoreBreadcrumbs] Not found breadcrumbs list node. Do nothing.');
    return;
  }
  const { pathname } = window.location;
  const { referrer } = document;
  let pathstr = pathname;
  // Try to find a proper catalog path via a referrer (in case of redirect)...
  if (!pathstr.startsWith('/catalog/')) {
    const match = referrer.match('^https://[^/]*(/catalog/.*)$');
    if (!match?.[1]) {
      // eslint-disable-next-line no-console
      console.warn('[StoreBreadcrumbs] Not found proper catalog pathname or referrer', {
        pathname,
        referrer,
      });
      return;
    }
    pathstr = match[1];
  }
  const titlePaths = Object.keys(catalogTitlesByPaths);
  const foundPath = titlePaths.find((path) => pathstr.startsWith(path)) as
    | keyof typeof catalogTitlesByPaths
    | undefined;
  const foundTitle = catalogTitlesByPaths[foundPath];
  // const firstItemContent = firstItem.querySelector('.t-menu__link-item ');
  if (foundPath && foundTitle) {
    lastLink.innerHTML = foundTitle;
    lastLink.setAttribute('href', foundPath);
  }
  if (!foundPath || !foundTitle) {
    // eslint-disable-next-line no-console
    console.warn('[StoreBreadcrumbs] Not found catalog path/title', {
      pathstr,
      pathname,
      referrer,
    });
    // Then remove the last node (rubric template) and the last divider (in the previous node)
    lastItem.remove();
    const prevItemDivider = breadcrumbsListNode.lastElementChild?.querySelector(
      '.t758__breadcrumb-divider',
    ) as HTMLElement | undefined;
    if (prevItemDivider) {
      prevItemDivider.remove();
    }
  }
}
