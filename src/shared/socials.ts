// import maxSvg from '../assets/socials/max.svg';
import ozonSvg from '../assets/socials/ozon.svg';
import wbSvg from '../assets/socials/wb.svg';

interface TSocial {
  urlPrefixes: string[];
  svgData: string;
  productTitle: string;
  defaultLink?: string;
}

export const socials: Record<string, TSocial> = {
  ozon: {
    svgData: ozonSvg,
    urlPrefixes: ['https://ozon.ru/', 'https://www.ozon.ru/'],
    productTitle: 'Купить на Ozon',
    defaultLink: 'https://ozon.ru/seller/image-c-imidzh-kollekshn-2966076/',
  },
  wb: {
    svgData: wbSvg,
    urlPrefixes: ['https://wildberries.ru/', 'https://www.wildberries.ru/'],
    productTitle: 'Купить на Wildberries',
    defaultLink: 'https://wildberries.ru/seller/250052756',
  },
  /* max: {
   *   svgData: maxSvg,
   *   urlPrefixes: ['https://max.ru/', 'https://www.max.ru/'],
   * },
   */
};
