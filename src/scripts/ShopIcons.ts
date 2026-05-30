class DisplayStateTracker {
  private observer: MutationObserver | null = null;
  private lastDisplayState: boolean;
  private element: HTMLElement;

  constructor(
    element: HTMLElement | string,
    private onDisplayChange: (isHidden: boolean) => void,
  ) {
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('Element not found');
    }

    this.lastDisplayState = this.isDisplayNone();
    this.startTracking();
    onDisplayChange(this.lastDisplayState);
  }

  private isDisplayNone(): boolean {
    return window.getComputedStyle(this.element).display === 'none';
  }

  private startTracking(): void {
    this.observer = new MutationObserver(() => {
      const currentDisplayState = this.isDisplayNone();

      if (this.lastDisplayState !== currentDisplayState) {
        this.lastDisplayState = currentDisplayState;
        this.onDisplayChange(currentDisplayState);
      }
    });

    this.observer.observe(this.element, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: false,
      childList: false,
    });
  }

  getCurrentState(): boolean {
    return this.lastDisplayState;
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export function initShopIcons() {
  // Cart node: #t-footer > .t-rec#rec1338906931:not(.uc-Footer) > .t706 > .t706__carticon
  // Favorites node: #t-footer > .t-rec#rec2330348731:not(.uc-Footer) > .t1002 > .t1002__wishlisticon
  const rootNodeSelector = '#allrecords';
  const rootNode = document.querySelector(rootNodeSelector) as HTMLElement | undefined;
  if (!rootNode) {
    // eslint-disable-next-line no-console
    console.warn('[ShopIcons:initShopIcons] No rootNode node found', {
      rootNodeSelector,
    });
    return;
  }
  // Find cart icon node and create its tracker...
  let cartIconTracker: DisplayStateTracker | undefined;
  const cartIconSelector = `${rootNodeSelector} .t706__carticon`;
  const cartIcon = document.querySelector(cartIconSelector) as HTMLElement | undefined;
  if (!cartIcon) {
    // eslint-disable-next-line no-console
    console.warn('[ShopIcons:initShopIcons] No cartIcon node found', {
      cartIconSelector,
    });
  } else {
    cartIconTracker = new DisplayStateTracker(cartIcon, (isHidden) => {
      // console.log('[ShopIcons:cartIconTracker] cart', isHidden ? 'hidden' : 'visible');
      rootNode.classList.toggle('with-cart', !isHidden);
    });
  }
  // Find wishlist icon node and create its tracker...
  let wishlistIconTracker: DisplayStateTracker | undefined;
  const wishlistIconSelector = `${rootNodeSelector} .t1002__wishlisticon`;
  const wishlistIcon = document.querySelector(wishlistIconSelector) as HTMLElement | undefined;
  if (!wishlistIcon) {
    // eslint-disable-next-line no-console
    console.warn('[ShopIcons:initShopIcons] No wishlistIcon node found', {
      wishlistIconSelector,
    });
  } else {
    wishlistIconTracker = new DisplayStateTracker(wishlistIcon, (isHidden) => {
      // console.log('[ShopIcons:wishlistIconTracker] wishlist', isHidden ? 'hidden' : 'visible');
      rootNode.classList.toggle('with-wishlist', !isHidden);
    });
  }
  // eslint-disable-next-line no-console
  console.log('[ShopIcons:initShopIcons] Created trackers', {
    cartIconTracker,
    wishlistIconTracker,
  });
}
