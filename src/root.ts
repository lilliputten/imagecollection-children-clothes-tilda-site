/** @module Scripts root module
 *  @since 2026.05.28, 19:41
 *  @changed 2026.05.28, 19:41
 */

import './project-info.scss';
import './variables/variables-expose.scss';
import './styles';

import { initConfirmForms } from './ConfirmForm';
// import { isDebug } from './core/constants/isDebug';
// import { isDev } from './core/constants/isDev';
import { initFooterSocials } from './FooterSocials';
import { initHero } from './Hero';
import { initNavHeaderNew } from './scripts/NavHeaderNew';
import { initStoreProduct } from './StoreProduct';
import { initSubPage } from './SubPage';

/** Print app info */
function printAppInfo() {
  const appVersion = process.env.APP_VERSION;
  // eslint-disable-next-line no-console
  console.warn(appVersion);
}

/** Init all the page */
function initPage() {
  // Start subcomponents...
  initHero();
  initSubPage();
  initStoreProduct();
  initConfirmForms();
  initFooterSocials();
  initNavHeaderNew();
  // Forcibely update components' dimensions
  window.dispatchEvent(new Event('resize'));
}

printAppInfo();

window.addEventListener('load', initPage);
