import { createSvgFromDataUrl } from './helpers/createSvgFromDataUrl';
import { DeferredPromise } from './helpers/DeferredPromise';
import { socials } from './shared/socials';

const deferredFooterInited = new DeferredPromise<boolean>();

export function getFooterInitedPromise() {
  return deferredFooterInited.promise;
}

export function initFooterSocials() {
  const rootSelector = '.uc-FooterSocials';
  const rootNode = document.querySelector<HTMLDivElement>(rootSelector);
  if (!rootNode) {
    // eslint-disable-next-line no-console
    console.warn('[FooterSocials] Not found the root node:', rootSelector);
    return;
  }
  Object.entries(socials).forEach(([socialId, socialData]) => {
    const { svgData, urlPrefixes } = socialData;
    const cssSelector = urlPrefixes.map((url) => `a[href^="${url}"]`).join(', ');
    const link = rootNode.querySelector<HTMLLinkElement>(cssSelector);
    if (!link) {
      // eslint-disable-next-line no-console
      console.warn('[FooterSocials] Not found a target node for', socialId);
      return;
    }
    const svgNode = createSvgFromDataUrl(svgData);
    if (!svgNode) {
      // eslint-disable-next-line no-console
      console.error('[FooterSocials] Cannot create an svg node for', socialId);
      debugger; // eslint-disable-line no-debugger
      return;
    }
    // Add social ids
    svgNode.dataset.socialId = socialId;
    link.dataset.socialId = socialId;
    // Replace the previous icon with the newly created
    link.replaceChildren(svgNode);
  });
  deferredFooterInited.resolve(true);
}
