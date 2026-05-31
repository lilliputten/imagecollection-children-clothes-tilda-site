export function initStoreTitle() {
  const titleContentNode = document.querySelector<HTMLElement>('.uc-PageTitle .t-title');
  const prodNameNode = document.querySelector<HTMLElement>('.js-product-name');
  if (!titleContentNode || !prodNameNode) {
    // eslint-disable-next-line no-console
    console.warn('[StoreTitle] Not found some of required nodes. Do nothing.');
    return;
  }
  console.log('[StoreTitle]', {
    titleContentNode,
    prodNameNode,
  });
  titleContentNode.innerHTML = prodNameNode.innerHTML;
  prodNameNode.remove();
}
