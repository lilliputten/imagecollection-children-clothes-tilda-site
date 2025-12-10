// import maxSvg from './assets/socials/max.svg';
import ozonSvg from './assets/socials/ozon.svg';
import wbSvg from './assets/socials/wb.svg';
import { DeferredPromise } from './helpers/DeferredPromise';

const deferredFooterInited = new DeferredPromise<boolean>();

interface TSocial {
  urlPrefixes: string[];
  svgData: string;
}

const socials: Record<string, TSocial> = {
  ozon: {
    svgData: ozonSvg,
    urlPrefixes: ['https://ozon.ru/', 'https://www.ozon.ru/'],
  },
  wb: {
    svgData: wbSvg,
    urlPrefixes: ['https://wildberries.ru/', 'https://www.wildberries.ru/'],
  },
  /* max: {
   *   svgData: maxSvg,
   *   urlPrefixes: ['https://max.ru/', 'https://www.max.ru/'],
   * },
   */
};

export function getFooterInitedPromise() {
  return deferredFooterInited.promise;
}

function createSvgFromDataUrl(dataUrl: string): SVGElement | null {
  // Extract base64 data
  const base64Data = dataUrl.split(',')[1];
  if (!base64Data) return null;

  // Decode base64 string
  const decodedString = atob(base64Data);
  // Parse as XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(decodedString, 'image/svg+xml');
  // Extract the SVG element
  const svgElement = xmlDoc.documentElement as unknown as SVGElement;
  if (!svgElement || svgElement.tagName !== 'svg') return null;

  return svgElement;
}

export function initFooterSocials() {
  const rootNode = document.querySelector<HTMLDivElement>('.uc-FooterSocials');
  const socialIds = Object.keys(socials);
  socialIds.forEach((socialId) => {
    const socialData = socials[socialId];
    if (!socialData) {
      // eslint-disable-next-line no-console
      console.error('[FooterSocials] Cannot find a social data for', socialId);
      debugger; // eslint-disable-line no-debugger
      return;
    }
    const { svgData, urlPrefixes } = socialData;
    const cssSelector = urlPrefixes.map((url) => `a[href^="${url}"]`).join(', ');
    const link = rootNode.querySelector<HTMLLinkElement>(cssSelector);
    if (!link) {
      // Not found a proper link
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
    /* // DEBUG
     * console.log('[FooterSocials:item]', {
     *   svgNode,
     *   svgData,
     *   link,
     *   rootNode,
     * });
     */
    // Add social ids
    svgNode.dataset.socialId = socialId;
    link.dataset.socialId = socialId;
    // Replace the previous icon with the newly created
    link.replaceChildren(svgNode);
  });
  deferredFooterInited.resolve(true);
}
