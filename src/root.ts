/** @module Scripts root module
 *  @since 2026.05.28, 19:41
 *  @changed 2026.05.28, 19:41
 */

import './project-info.scss';
import './variables/variables-expose.scss';
import './styles';

import { initConfirmForms } from './scripts/ConfirmForm';
import { initNavHeaderNew } from './scripts/NavHeaderNew';
import { initShopIcons } from './scripts/ShopIcons';
import { initStoreProduct } from './scripts/StoreProduct';

// import { initHero } from './scripts/Hero';
// import { initStoreProduct } from './scripts/StoreProduct';
// import { initSubPage } from './scripts/SubPage';

/** Print app info */
function printAppInfo() {
  const appVersion = process.env.APP_VERSION;
  // eslint-disable-next-line no-console
  console.warn(appVersion);
}

/** Init all the page */
function initPage() {
  // Start subcomponents...
  // initHero();
  // initSubPage();
  initStoreProduct();
  initConfirmForms();
  initNavHeaderNew();
  initShopIcons();
  // Forcibely update components' dimensions
  window.dispatchEvent(new Event('resize'));
}

printAppInfo();

window.addEventListener('load', initPage);
