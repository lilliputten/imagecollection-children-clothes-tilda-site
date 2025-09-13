export function initStoreProduct() {
  const btnNode = document.querySelector('.uc-StoreHeader .t-btn');
  if (!btnNode) {
    return;
  }
  // Add back button icon
  btnNode.insertAdjacentHTML('afterbegin', '<i class="fa fa-long-arrow-left opacity-50"></i>');
}
