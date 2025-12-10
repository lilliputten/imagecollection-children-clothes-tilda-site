/** @module Scripts root module
 *  @since 2025.09.12, 21:09
 *  @changed 2025.12.10, 13:39
 */

import './project-info.scss';
import './variables/variables-expose.scss';
import './styles';

import { initConfirmForms } from './ConfirmForm';
import { isDebug } from './core/constants/isDebug';
import { isDev } from './core/constants/isDev';
import { initFooterSocials } from './FooterSocials';
import { initHero } from './Hero';
import { initStoreProduct } from './StoreProduct';
import { initSubPage } from './SubPage';

/** Print app info */
function printAppInfo() {
  const appVersion = process.env.APP_VERSION;
  // const isDebug = process.env.DEBUG;
  // const isDev = process.env.DEV;
  // eslint-disable-next-line no-console
  const consoleMethod = isDebug || isDev ? console.warn : console.log;
  consoleMethod.call(console, appVersion);
}

/** Init all the page */
function initPage() {
  // Start subcomponents...
  initHero();
  initSubPage();
  initStoreProduct();
  initConfirmForms();
  initFooterSocials();
  // Forcibely update components' dimensions
  window.dispatchEvent(new Event('resize'));
}

printAppInfo();

window.addEventListener('load', initPage);
