// import maxSvg from '../assets/socials/max.svg';
import ozonSvg from '../assets/socials/ozon.svg';
import wbSvg from '../assets/socials/wb.svg';

interface TSocial {
  urlPrefixes: string[];
  svgData: string;
  productTitle: string;
}

export const socials: Record<string, TSocial> = {
  ozon: {
    svgData: ozonSvg,
    urlPrefixes: ['https://ozon.ru/', 'https://www.ozon.ru/'],
    productTitle: 'Купить на Ozon',
  },
  wb: {
    svgData: wbSvg,
    urlPrefixes: ['https://wildberries.ru/', 'https://www.wildberries.ru/'],
    productTitle: 'Купить на Wildberries',
  },
  /* max: {
   *   svgData: maxSvg,
   *   urlPrefixes: ['https://max.ru/', 'https://www.max.ru/'],
   * },
   */
};
