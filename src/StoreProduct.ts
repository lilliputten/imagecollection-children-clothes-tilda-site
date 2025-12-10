import { createSvgFromDataUrl } from './helpers/createSvgFromDataUrl';
import { socials } from './shared/socials';

const variantsTitle = 'Варианты';

export function quoteHtmlAttr(str: string, preserveCR?: boolean) {
  const crValue = preserveCR ? '&#13;' : '\n';
  return (
    String(str) // Forces the conversion to string
      // .replace(/&/g, '&amp;') // This MUST be the 1st replacement
      // .replace(/'/g, '&apos;') // The 4 other predefined entities, required
      // .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // You may add other replacements here for HTML only (but it's not
      // necessary). Or for XML, only if the named entities are defined in its
      // DTD.
      .replace(/\r\n/g, crValue) // Must be before the next replacement
      .replace(/[\r\n]/g, crValue)
  );
}

function processVariants(node: HTMLElement) {
  const contentNode = node?.querySelector<HTMLElement>('.t-store__tabs__content');
  if (!contentNode) {
    return node;
  }
  const currentHref = window.location.href;
  const contentText = contentNode.innerHTML.trim();
  const lines = contentText
    .replace(/<br\s*\/>/g, '<br>')
    .split('<br>')
    .map((s) => quoteHtmlAttr(s.trim()))
    .filter(Boolean);
  const variants = document.createElement('div');
  variants.classList.add('Variants');
  try {
    for (let idx = 0; idx < lines.length; idx += 3) {
      const titleStr = lines[idx];
      const imgStr = lines[idx + 1];
      const urlStr = lines[idx + 2].replace(/^http:/, 'https:');
      const isCurrent = currentHref.startsWith(urlStr);
      const img = document.createElement('img');
      img.setAttribute('src', imgStr);
      img.setAttribute('alt', titleStr);
      const container = document.createElement(isCurrent ? 'span' : 'a');
      container.classList.add('Variant');
      if (!isCurrent) {
        container.setAttribute('href', urlStr);
      } else {
        container.classList.add('Current');
      }
      container.setAttribute('title', titleStr);
      container.append(img);
      variants.append(container);
    }
    return variants;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[StoreProduct:processVariants]', err.message, {
      err,
      lines,
      contentText,
      node,
    });
    debugger; // eslint-disable-line no-debugger
    return node;
  }
}

function createDetailsFromTabs(productNode: HTMLElement, rightColumn: HTMLElement) {
  const tabsContainer = productNode.querySelector<HTMLElement>('.js-store-tabs');
  const tabs = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__controls .t-store__tabs__button',
  );
  const nodes = productNode.querySelectorAll<HTMLElement>(
    '.t-store__tabs__list .t-store__tabs__item',
  );
  tabs.forEach((tab, idx) => {
    const title = tab.dataset.tabTitle;
    const isVariants = title === variantsTitle;
    if (!isVariants) {
      return;
    }
    const node = nodes[idx];
    const targetContainer = rightColumn; // isVariants ? tabsContainer : rightColumn;
    const newNode = isVariants ? processVariants(node) : node;
    if (isVariants) {
      // Just add the block to the appropriate column
      const wrapper = document.createElement('div');
      wrapper.classList.add('DetailsWrapper');
      const titleNode = document.createElement('h2');
      titleNode.classList.add('t-descr', 't-descr_sm');
      titleNode.innerText = title;
      wrapper.append(titleNode);
      wrapper.append(newNode);
      targetContainer.append(wrapper);
    } else {
      // Place a variants above the tab headers
      const wrapper = document.createElement('div');
      const parent = tabsContainer.parentNode;
      wrapper.classList.add('DetailsWideWrapper', 't-col', 't-col_12');
      wrapper.append(newNode);
      parent.insertBefore(wrapper, tabsContainer);
    }
    node.remove();
    tab.remove();
    // tab.style.display = 'none';
  });
  // Show initially hidden tabs wrapper (see styles)
  tabsContainer.style.opacity = '1';
  tabsContainer.style.pointerEvents = 'initial';
}

const addToButtons = false;

function prepareSocialLinks(parentNode: HTMLElement) {
  const textContainer = parentNode.querySelector<HTMLElement>('.js-store-prod-all-text');
  if (!textContainer) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct:prepareSocialLinks] Not found text container');
    return;
  }
  const buttonsContainer = parentNode.querySelector<HTMLElement>(
    '.t-store__prod-popup__btn-wrapper',
  );
  if (!buttonsContainer) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct:prepareSocialLinks] Not found buttons container');
    return;
  }
  Object.entries(socials).forEach(([socialId, socialData]) => {
    const { svgData, urlPrefixes, productTitle } = socialData;
    const svgNode = createSvgFromDataUrl(svgData);
    if (!svgNode) {
      // eslint-disable-next-line no-console
      console.error('[StoreProduct:prepareSocialLinks] Cannot create an svg node for', socialId);
      debugger; // eslint-disable-line no-debugger
      return;
    }
    svgNode.dataset.socialId = socialId;
    // Find links in the text...
    const cssSelector = urlPrefixes.map((url) => `a[href^="${url}"]`).join(', ');
    const link = textContainer.querySelector<HTMLLinkElement>(cssSelector);
    if (!link) {
      // eslint-disable-next-line no-console
      console.warn('[StoreProduct:prepareSocialLinks] Not found a target node for', socialId);
      return;
    }
    // Replace the previous icon with the newly created
    link.replaceChildren(svgNode);
    // Set attributes
    link.dataset.socialId = socialId;
    link.setAttribute('target', '_blank');
    if (productTitle) {
      link.setAttribute('title', productTitle);
    }
    // Clone and add to the buttons container
    if (addToButtons) {
      const buttonLink = link.cloneNode(true) as HTMLLinkElement;
      // Replace the previous icon with the newly created
      link.replaceChildren(svgNode);
      // Add to the buttons container
      buttonsContainer.appendChild(buttonLink);
    }
  });
}

export function initStoreProduct() {
  const rootNode = document.querySelector<HTMLElement>('.t-rec > .t-store');
  if (!rootNode) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct] Not found the root node');
    return;
  }
  const productNode = rootNode?.querySelector<HTMLElement>('.js-store-product.js-product');
  if (!productNode) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct] Not found the product node');
    return;
  }
  const rightColumn = productNode.querySelector<HTMLElement>('.t-store__prod-popup__col-right');
  if (!rightColumn) {
    // eslint-disable-next-line no-console
    console.warn('[StoreProduct] Not found the product right column node');
    return;
  }
  // Use a delay to provide a time gap to render the tabs
  setTimeout(() => {
    createDetailsFromTabs(productNode, rightColumn);
    prepareSocialLinks(rightColumn);
  }, 500);
}
