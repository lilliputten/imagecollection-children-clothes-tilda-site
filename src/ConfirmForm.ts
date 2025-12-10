const initialChecked = false;

export function processForm(formBottomText: HTMLDivElement) {
  const parent = formBottomText.parentNode; // formNode.closest<HTMLDivElement>('.t698__mainwrapper, .t702__wrapper');
  const buttonNode = parent?.querySelector<HTMLButtonElement>('button[type="submit"]');
  // const formBottomText = parent?.querySelector<HTMLDivElement>('[class*="__form-bottom-text"]');
  if (!formBottomText || !buttonNode) {
    // eslint-disable-next-line no-console
    console.error('[ConfirmForm:processForm] Cannot find text and button nodes for a form.', {
      parent,
      buttonNode,
      formBottomText,
    });
    debugger; // eslint-disable-line no-debugger
  }
  const checkboxNode = document.createElement('input');
  checkboxNode.setAttribute('type', 'checkbox');
  if (initialChecked) {
    checkboxNode.setAttribute('checked', 'true');
  } else {
    buttonNode.classList.toggle('disabled', true);
  }
  checkboxNode.addEventListener('change', () => {
    const checked = checkboxNode.checked;
    buttonNode.classList.toggle('disabled', !checked);
  });
  formBottomText.prepend(checkboxNode);
}

export function initConfirmForms() {
  const formBottomTextNodes = document.querySelectorAll<HTMLDivElement>(
    '[class*="__form-bottom-text"]',
  );
  console.log('[ConfirmForm:initConfirmForms]', {
    formBottomTextNodes,
  });
  formBottomTextNodes.forEach(processForm);
}
